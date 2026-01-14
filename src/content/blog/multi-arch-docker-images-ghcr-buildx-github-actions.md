---
title: 'Publishing Multi-Arch Docker images to GHCR using Buildx and GitHub Actions'
excerpt: 'Learn how to automate Multi-Arch Docker image builds and publishing to GHCR using Docker Buildx and GitHub Actions'
date: '2024-12-21'
author: 'Pradumna Saraf'
category: 'docker'
tags: ['docker', 'github', 'developer', 'devops', 'ci-cd', 'github-actions-1']
thumbnail: '/blog-images/multi-arch-docker-images-ghcr-buildx-github-actions/thumbnail.png'
draft: false
---


The industry has seen a huge shift in machines towards using ARM base CPUs like Apple Silicon to Snapdragon X from X86, and it's become essential to build images that support multiple architectures and run containers that are compatible and aligned with that architecture without facing any bottlenecks.

Using Docker Buildx, we can very easily build multi-platform container images. All builds are executed via `buildx` run with the Moby Buildkit builder engine. You can read more in detail [here](https://www.docker.com/blog/faster-multi-platform-builds-dockerfile-cross-compilation-guide).

In the blog, we will learn how to automate the process of building a Multi-Arch image and pushing it to GitHub Container Registry (GHCR) using a GitHub workflow/Actions when there is a change in the repo. Also, I recently published a similar blog for publishing the image to GHCR. You can read it here:

%[https://blog.pradumnasaraf.dev/how-to-publish-a-golang-package] 

### Prerequisite

* A good understanding of Docker
    
* A decent understanding of GitHub Actions
    

### Getting started

Before starting, I assume you have already Dockerized your project, created a Dockerfile, and pushed that to GitHub. In case, you haven't done one yet and still want to try the process out, you can create a GitHub repo with a minimal `Dockerfile` in the root that prints "Hello World" by running an echo command using Alpine as the base image. Dockerfile syntax for it:

```bash
FROM alpine:3.20
CMD ["echo", "Hello World!"]
```

Once done we are all set to write a workflow. Make sure you are on the root of the project, create a dir name `.github` inside that create a dir called `workflows` and inside that create a YAML file with any name, we will name it `ghcr.yaml`. The complete file path will look like this `.github/workflows/ghcr.yaml`. Now paste the below configuration. Don't commit it yet, first, we break down and understand the below configuration.

```yaml
name: Build and Push Image to GHCR

on:
  release:
    types: [published]

env:
  REGISTRY: ghcr.io
  IMAGE_NAME: ${{ github.repository }}

jobs:
  build-and-push-image:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Log in to the Container registry
        uses: docker/login-action@v3
        with:
          registry: ${{ env.REGISTRY }}
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3

      - name: Build and push Docker image
        uses: docker/build-push-action@v6
        with:
          context: .
          file: ./Dockerfile
          push: true
          tags: | 
            ghcr.io/pradumnasaraf/devops:latest
          platforms: linux/amd64,linux/arm64,linux/arm/v7
```

In this section, we are triggering the workflow when a release is created. We can modify the `on:` trigger according to our release flow, like triggering the workflow when a tag is pushed, etc. Then we created some environment variables `REGISTRY` and `IMAGE_NAME` for reusability in the workflow.

Then we are using Ubuntu as a runner and checking out the repo code. And giving it content **read** to read the content from the repo and give the workflow the **write** permission to publish a package (In GitHub we called it packages). It's a registry for hosting and managing packages, including containers and other dependencies)

```yaml
on:
  release:
    types: [published]

env:
  REGISTRY: ghcr.io
  IMAGE_NAME: ${{ github.repository }}

jobs:
  build-and-push-image:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write
```

In this part, we are checking out the repo code and then log into GHCR so that the workflow has the necessary rights and permission to push the image to the Registry. Then we set up the Docker Buildx. Buildx is the real deal that will help us build the Multi-Arch images from the same Dockerfile.

```yaml
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Log in to the Container registry
        uses: docker/login-action@v3
        with:
          registry: ${{ env.REGISTRY }}
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3
```

This is the final step of the workflow here we are building the image and pushing it to GHCR. We can set a `context` and `file`, where the Dockerfile is in the root with the name Dockerfile.

We can set multiple `tags` apart from the `latest` one, For example, we can automate unique image versioning by pulling the git tag pushed to trigger this workflow. So, if we push a Git tag with `1.2.3`, the image would be something like `pradumnasaraf/devops:1.2.3`.

Lastly, we are we are providing for which platforms we need to build it for. We can give the values for `platforms` by comma separation. Here we are building for `linux/amd64`,`linux/arm64` and `linux/arm/v7`.

```yaml
      - name: Build and push Docker image
        uses: docker/build-push-action@v6
        with:
          context: .
          file: ./Dockerfile
          push: true
          tags: | 
            ghcr.io/pradumnasaraf/devops:latest
          platforms: linux/amd64,linux/arm64,linux/arm/v7
```

That's it, that was all about the explanation workflow. Now commit the changes. Based on the type of trigger you set this workflow will run and push the images to DockerHub.

I have created a release on my DevOps repo with `v2.3.3`. Now, It will push an image with the `latest` as well as `2.3.3`. It gets the version number from the `package.json` using an action to extract it. You can do this kind of workaround to make it more seamless and powerful.

![GitHub Actions bar](/blog-images/multi-arch-docker-images-ghcr-buildx-github-actions/github-actions-bar.png)

Now, go back to your repo and under the **Packages** section you will see your package (image) got published with the name you provided, with a little container icon.

![GitHub repo](/blog-images/multi-arch-docker-images-ghcr-buildx-github-actions/github-repo.png)

If you not now seeing the **Packages** section, turn it on from the **About** setting of the repo. And if it's turned on, the workflow runs successfully and you get a message **No packages published**, head over to your GitHub profile page, click on the **Packages** tab then click on the package name. It will ask you to link with a repo and link it with the repo you use to create the workflow. Sometimes due to mismatching of the repo and image name the package doesn't show automatically on the repo.

![Pradumna's GitHub Packages section](/blog-images/multi-arch-docker-images-ghcr-buildx-github-actions/pradumna-s-github-packages-section.png)

Once you get the package linked to your repo, click on the package name, now you see will the image with all the architecture we provided.

![Pradumna's DevOps repo image](/blog-images/multi-arch-docker-images-ghcr-buildx-github-actions/pradumna-s-devops-repo-image.png)

Now the great part is that if someone pulls an image, for eg `docker pull` [`ghcr.io/pradumnasaraf/devops:2.3.3`](http://ghcr.io/pradumnasaraf/devops:2.3.3) docker will pull the image for that architecture only we don't need to explicitly mention it.

That's come to the end of this blog. As usual, glad you made it to the end—thank you so much for your support. I regularly share Docker tips on [Twitter](https://x.com/pradumna_saraf). You can connect with me there.