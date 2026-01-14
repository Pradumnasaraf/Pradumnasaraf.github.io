---
title: 'Publishing Multi-Arch Docker image to DockerHub using Buildx GitHub Actions'
excerpt: 'Learn how to automate Multi-Arch Docker image builds and publishing to DockerHub using Docker Buildx and GitHub Actions'
date: '2024-10-24'
author: 'Pradumna Saraf'
category: 'docker'
tags: ['docker', 'github', 'developer', 'devops', 'github-actions-1']
thumbnail: '/blog-images/multi-arch-docker-image-dockerhub-buildx-github-actions/thumbnail.png'
draft: false
---


As you know, we have seen a huge shift in machines towards using ARM base CPUs like **Apple Silicon** to **Snapdragon X** from **X86**, and it's become essential to build Docker Images that support multiple architectures and run containers that are compatible and aligned with that architecture without facing any bottlenecks.

Using Docker **Buildx** we can very easily build multi-platform images. All builds are executed via `buildx` run with the Moby Buildkit builder engine. You can read more in detail [here](https://www.docker.com/blog/faster-multi-platform-builds-dockerfile-cross-compilation-guide).

In the blog, we will leverage the functionality of Buildx to build a Multi-Arch Image, pushing it to DockerHub by automating all the tasks using a GitHub workflow/Actions.

### Prerequisite

* A DockerHub account
    
* A good understanding of Docker
    
* A decent understanding of GitHub Actions
    

### Getting started

Before starting, I assume you have already Dockerized your project, created a Dockerfile, and pushed it to GitHub. In case, you haven't done one yet and still want to try the process out, you can create a GitHub repo with just a minimal `Dockerfile` in the root that prints "Hello World" by running an echo command using Alpine as the base image. Dockerfile syntax for it:

```bash
FROM alpine:3.20
CMD ["echo", "Hello World!"]
```

For the GitHub Workflow to have the privilege to push the Docker image to DockerHub we need to add a Docker username and Personal Access Token to GitHub Secrets. For that go into the repo settings then **Secrets and Variables**, and select the secret type **Actions** (as shown in the image below). Now create a secret name `DOCKERHUB_USERNAME` and the secret value as your DockerHub username.

![Image description](/blog-images/multi-arch-docker-image-dockerhub-buildx-github-actions/image-description.png)

Now, we need to generate a DockerHub Personal Access Token, for that head over to your DockerHub Account, go to settings, then click on **Personal Access Token** and then click on the **Generate new Token** button. A new window will open (as shown in the image below. Give a token name and **Access permissions** to **Read & Write** (It may vary according to your use case). Copy the generated token and create a GitHub Secret (like we did above) with the name `DOCKERHUB_TOKEN`, and paste the copied token value into the secret value.

![Image description](/blog-images/multi-arch-docker-image-dockerhub-buildx-github-actions/image-description-1.png)

Once done we are all set to create a workflow. Make sure you are on the root of the project, create a dir name `.github` inside that create a dir called `workflows` and inside that create a YAML file with any name, we will name it `dockerhub.yaml`. The complete file path will look like this `.github/workflows/dockerhub.yaml`. Now paste the below configuration. Don't commit it yet, first, we break down and understand the below configuration.

```yaml
name: Build and Push Image to DockerHub

on:
  release:
    types: [published]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: DockerHub Login
        uses: docker/login-action@v3
        with:
          username: ${{ secrets.DOCKERHUB_USERNAME }}
          password: ${{ secrets.DOCKERHUB_TOKEN }}

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3
        
      - name: Build and push Docker image
        uses: docker/build-push-action@v6
        with:
          context: .
          file: ./Dockerfile
          push: true
          tags: |
            ${{ secrets.DOCKERHUB_USERNAME }}/devops:latest
          platforms: linux/amd64,linux/arm64,linux/arm/v7
```

In this section, we are triggering the workflow when a release is created. We can modify the `on:` trigger according to our release flow, like triggering the workflow when a tag is pushed, etc. Then we are using Ubuntu as a runner and then checking out the repo code so that the workflow has access to our repo code.

```yaml
on:
  release:
    types: [published]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4
```

Now in this part, we are logging into the DockerHub with the credentials we provided via GitHub Secrets so that the workflow has the necessary permission to push the image to our DockerHub Account. Then we set up the Docker Buildx. Buildx is the real deal that will help us build the Multi-Arch images from the same Dockerfile.

```yaml
 - name: DockerHub Login
        uses: docker/login-action@v3
        with:
          username: ${{ secrets.DOCKERHUB_USERNAME }}
          password: ${{ secrets.DOCKERHUB_TOKEN }}

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3
```

This is the final step of the workflow here we are building the image and pushing it to DockerHub. We can set a `context` and `file`, where the Dockerfile is in the root with the name Dockerfile. `tags` helps in tagging the Docker image as we do locally. We can set multiple `tags` apart from the `latest` one, For example, we can automate unique image versioning by pulling the git tag pushed to trigger this workflow. So, if we push a Git tag with `1.2.3`, the image would be something like `pradumnasaraf/devops:1.2.3`. Make sure you change the image name from `devops`. Instead of hardcoding you can also set the repo name and get that value from the `github` variable.

Lastly, we are we are providing for which platforms we need to build it for. We can give the values for `platforms` by comma separation. Here we are building for `linux/amd64`,`linux/arm64` and `linux/arm/v7`.

```yaml
      - name: Build and push Docker image
        uses: docker/build-push-action@v6
        with:
          context: .
          file: ./Dockerfile
          push: true
          tags: |
            ${{ secrets.DOCKERHUB_USERNAME }}/devops:latest
          platforms: linux/amd64,linux/arm64,linux/arm/v7
```

That's it, that was all about the explanation workflow. Now commit the changes. Based on the type of trigger you set this workflow will run and push the images to DockerHub.

I have created a release on my DevOps repo with `v2.3.3`. Now, It will push an image with the `latest` as well as `2.3.3`. It gets the version number from the `package.json` using an action to extract it. You can do this kind of workaround to make it more seamless and powerful.

![GitHub Action section](/blog-images/multi-arch-docker-image-dockerhub-buildx-github-actions/github-action-section.png)

Now, let's head over to DockerHub to check the pushed image. We can see it we have our image published on DockerHub with the `OS/ARCH` we have provided.

![DockerHub Images](/blog-images/multi-arch-docker-image-dockerhub-buildx-github-actions/dockerhub-images.png)

Now the great part is that if someone pulls an image, for eg `docker pull pradumnasaraf/devops` docker will pull the image for that architecture only we don't need to explicitly mention it.

That's come to the end of this blog. As usual, glad you made it to the end—thank you so much for your support. I regularly share Docker tips on [Twitter](https://x.com/pradumna_saraf). You can connect with me there.