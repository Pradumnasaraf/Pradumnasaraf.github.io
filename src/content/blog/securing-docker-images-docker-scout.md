---
title: 'Securing Docker Images: A Comprehensive Guide to Integrating Docker Scout in GitHub Workflow'
excerpt: 'In this blog post, we''ll guide you to integrate Docker Scout into our GitHub Workflow to scan Docker image vulnerabilities in every pull request.'
date: '2025-01-08'
author: 'Pradumna Saraf'
category: 'docker'
tags: ['docker', 'security', 'ci-cd', 'docker-images', 'github-actions-1']
thumbnail: '/blog-images/securing-docker-images-docker-scout/thumbnail.png'
draft: false
---


"Docker Images are SECURE by default" - That's a misconception!

In today's software development landscape, where speed and efficiency are most important, securing your Docker images and applications is a critical aspect of ensuring the integrity and safety of your software. As organizations increasingly adopt containerization, the need to build a secure image for the supply chain becomes more evident.

In this blog post, we'll explore how to integrate Docker Scout into our GitHub Workflow to scan Docker image vulnerabilities in every pull request. Currently, there isn't a very convenient way to address this concern, and Docker Scout offers a solution to overcome this challenge. It not only provides detailed information about the vulnerabilities in the incoming Docker image compared to our current state but also comments below the pull request. This eliminates the need to manually check logs or access a separate dashboard.

**Let's see how we can do that:**

Make sure you have a Dockerfile in the root of the directory. To keep the demo super simple I have created a basic Dockerfile with this config:

```Dockerfile
FROM nginx:1.23.3-alpine
EXPOSE 80
```

Also, this is **really important**. In Docker Scout, we perform comparisons to check how vulnerable the image version is compared to another version of the same image coming in the PR, etc. For that purpose, we need an already existing image to make comparisons. Therefore, we need build and push an image to DockerHub beforehand via CLI or other methods so that it is available when GitHub Actions run. In this case, I have pushed an image called `pradumnasaraf/demo:main`. It follows the format {github repo name}:{tag}. The tag is crucial as it helps identify the version, and we will add this tag in the Github Workflow as well.

![DockerHub Image Dashboard](/blog-images/securing-docker-images-docker-scout/dockerhub-image-dashboard.png)

Now, let's create a GitHub Actions workflow. Create a `.github` folder, and inside that, create a `workflows` folder. Inside the `workflows` folder, create a `docker.yml` file and paste the configuration below. I will explain the entire configuration below.

```yaml
name: Docker

on:
  push:
    tags: [ "*" ]
    branches:
      - 'main'
  pull_request:
    branches: [ "**" ]
    
env:
  REGISTRY: docker.io
  IMAGE_NAME: ${{ github.repository }}
  SHA: ${{ github.event.pull_request.head.sha || github.event.after }}
  # Using `main` as the tag to compare assuming that it's already pushed
  COMPARE_TAG: main

jobs:
  build:

    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write
      pull-requests: write

    steps:
      - name: Checkout repository
        uses: actions/checkout@v3
        with:
          ref: ${{ env.SHA }}
          
      - name: Setup Docker buildx
        uses: docker/setup-buildx-action@v2.5.0
        with:
          driver-opts: |
            image=moby/buildkit:v0.10.6

      # Login against a Docker registry except on PR
      - name: Log into registry ${{ env.REGISTRY }}
        uses: docker/login-action@v2.1.0
        with:
          registry: ${{ env.REGISTRY }}
          username: ${{ secrets.DOCKER_USER }}
          password: ${{ secrets.DOCKER_PAT }}

      - name: Extract Docker metadata
        id: meta
        uses: docker/metadata-action@v4.4.0
        with:
          images: ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}
          labels: |
            org.opencontainers.image.revision=${{ env.SHA }}
          tags: |
            type=edge,branch=$repo.default_branch
            type=semver,pattern=v{{version}}
            type=sha,prefix=,suffix=,format=short
      
      # Build and push Docker image with Buildx (don't push on PR)
      - name: Build and push Docker image
        id: build-and-push
        uses: docker/build-push-action@v4.0.0
        with:
          context: .
          push: true
          tags: ${{ steps.meta.outputs.tags }}
          labels: ${{ steps.meta.outputs.labels }}
          cache-from: type=gha
          cache-to: type=gha,mode=max
      
      - name: Docker Scout
        id: docker-scout
        if: ${{ github.event_name == 'pull_request' }}
        uses: docker/scout-action@v1
        with:
          command: compare
          image: ${{ steps.meta.outputs.tags }}
          to: ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}:${{ env.COMPARE_TAG }}
          ignore-unchanged: true
          only-severities: critical,high
          write-comment: true
          github-token: ${{ secrets.GITHUB_TOKEN }} # to be able to write the comment
```

In the section below, we are setting up some environment variables for the workflows so that we can use them multiple times. Also, this is where the `COMPARE_TAG` that I mentioned above comes into play. We need an image version to compare to in Scouct to determine how much less or more vulnerable it is.

Following that, we have the runner, and `permissions:` is used to set the scope for the `GITHUB_TOKEN` that we are going to use later. Alternatively, you can generate a Personal Access Token with the required permissions and remove this part. The `checkout` will copy code to the runner and grant access.

We also included build to build the image in coming steps

```yaml
env:
  REGISTRY: docker.io
  IMAGE_NAME: ${{ github.repository }}
  SHA: ${{ github.event.pull_request.head.sha || github.event.after }}
  # Using `main` as the tag to compare assuming that it's already pushed
  COMPARE_TAG: main

jobs:
  build:

    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write
      pull-requests: write

    steps:
      - name: Checkout repository
        uses: actions/checkout@v3
        with:
          ref: ${{ env.SHA }}

      - name: Setup Docker buildx
        uses: docker/setup-buildx-action@v2.5.0
        with:
          driver-opts: |
            image=moby/buildkit:v0.10.6
```

In this part, we are authenticating so that we have pull and push access to DockerHub. In the following step, we are extracting metadata about our image from DockerHub.

```yaml
      - name: Log into registry ${{ env.REGISTRY }}
        uses: docker/login-action@v2.1.0
        with:
          registry: ${{ env.REGISTRY }}
          username: ${{ secrets.DOCKER_USER }}
          password: ${{ secrets.DOCKER_PAT }}

      - name: Extract Docker metadata
        id: meta
        uses: docker/metadata-action@v4.4.0
        with:
          images: ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}
          labels: |
            org.opencontainers.image.revision=${{ env.SHA }}
          tags: |
            type=edge,branch=$repo.default_branch
            type=semver,pattern=v{{version}}
            type=sha,prefix=,suffix=,format=short
```

In this part, we are building and pushing the image to DockerHub using the data obtained from the job with the ID `meta`. In the next job, we are performing the actual comparison of the image with the `main` to the images built from the incoming changes via PR. As you can observe, we have a conditional stage set to run only if the workflow is triggered due to a PR. Additionally, we can configure `only-severities` to check for specific severities. In this case, we are looking for critical and high severities. Furthermore, you can see it has a property to `write-comment` that will write a comprehensive summary with all the details in the PR comment.

```yaml
- name: Build and push Docker image
        id: build-and-push
        uses: docker/build-push-action@v4.0.0
        with:
          context: .
          push: true
          tags: ${{ steps.meta.outputs.tags }}
          labels: ${{ steps.meta.outputs.labels }}
          cache-from: type=gha
          cache-to: type=gha,mode=max
      
      - name: Docker Scout
        id: docker-scout
        if: ${{ github.event_name == 'pull_request' }}
        uses: docker/scout-action@v1
        with:
          command: compare
          image: ${{ steps.meta.outputs.tags }}
          to: ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}:${{ env.COMPARE_TAG }}
          ignore-unchanged: true
          only-severities: critical,high
          write-comment: true
          github-token: ${{ secrets.GITHUB_TOKEN }} # to be able to write the comment
```

That was the whole gist of the workflow. Before committing and pushing it to the repo, we need to add some GitHub Actions so that it has the required permissions to perform tasks. If you noticed, we added two secrets with the keys `DOCKER_USER` and `DOCKER_PAT`.

`DOCKER_PAT` is the DockerHub Access token. To get that, head over to [DockerHub.com](http://DockerHub.com) and generate a Personal Access Token with read and write permissions. The window will look something like this:

![DockerHub Personal Dashboard](/blog-images/securing-docker-images-docker-scout/dockerhub-personal-dashboard.png)

Now, go to the repository on GitHub on which you want to run this action. Go to settings and add two repository secrets under **Actions secrets and variables**. Add `DOCKER_USER` with the value as your DockerHub username, and add `DOCKER_PAT` with the value as the personal token generated from DockerHub. After adding, it will look something like this:

![Github Settings](/blog-images/securing-docker-images-docker-scout/github-settings.png)

Once you have added both secrets, commit and push the workflow you have written. Once you push it to GitHub, the workflow will run, and it should pass all the tests. You can check this by going to the Actions tab.

Now, let's test if this workflow is working as intended by comparing the vulnerabilities of the incoming image to our image. For that, create a branch and modify the image version in the Dockerfile from `nginx:1.23.3-alpine` to `nginx:1.25.3-alpine`, then create a PR to the main branch. It will look something like this:

![GitHub](/blog-images/securing-docker-images-docker-scout/github.png)

As soon as you create a PR, the workflow will get triggered and start running those steps. When the workflow completes, a GitHub bot will drop a comment with a comparison, something like shown in the image below:

![GitHub](/blog-images/securing-docker-images-docker-scout/github-1.png)

As you can see, our image with the main tag on the left has some serious issues, such as 1 serious and 14 high vulnerabilities. In contrast, the image built with the incoming changes from the PR on the right has no vulnerabilities. Thus, this PR is good to merge, as it has identified and resolved those issues.

That's the end of the blog. Hope you learn something from it. Follow me on [Twitter](https://twitter.com/pradumna_saraf). Thanks for reading and have a great day!