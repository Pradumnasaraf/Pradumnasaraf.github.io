---
title: 'Publish a Docker Image on GHCR with GitHub Actions'
excerpt: 'Build and publish Docker images on GHCR using GitHub Actions with this tutorial, covering prerequisites, YAML configuration, and instructions'
date: '2023-05-03'
author: 'Pradumna Saraf'
category: 'docker'
tags: ['docker', 'opensource', 'devops', 'github-actions']
thumbnail: '/blog-images/publish-image-on-ghcr/thumbnail.png'
draft: false
---


GitHub provides a registry called GitHub Container Registry (GHCR) to host your Docker images, which is a great alternative to DockerHub. The blog post offers a tutorial on how to build and publish Docker images to the registry using GitHub Actions.

Throughout the blog, GHCR will be used instead of the complete name.

## Prerequisites

* A GitHub account
    
* Basic understanding of YAML (Not mandatory)
    

## Steps

Create a GitHub repository and place a Dockerfile in the root directory. While you can store the file anywhere, it is advisable to keep it in the root directory.

![](/blog-images/publish-image-on-ghcr/image-01.png)

For this demo, we will use a very simple `Dockerfile` that prints "Hello World" by running an echo command on an Alpine image. Here is the syntax for it:

```bash
FROM alpine:3.17.2
CMD ["echo", "Hello World!"]
```

Create a `.github` folder in the root of your repository.

* Inside the `.github` folder, create a folder named `workflows`.
    
* Inside the `workflows` folder, create a file named `ghcr.yml`.
    
* Add the following configuration to `ghcr.yml` file.
    

Do not commit the changes yet. Let's first understand the workflow, and then we can proceed with the commit.

**YAML Config:**

```yaml
name: Create and publish a Docker image to GitHub Container Registry

on:
  push:
    branches: ['main']

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
        uses: actions/checkout@v3

      - name: Log in to the Container registry
        uses: docker/login-action@v2
        with:
          registry: ${{ env.REGISTRY }}
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}

      - name: Extract metadata (tags, labels) for Docker
        id: meta
        uses: docker/metadata-action@v4
        with:
          #images: ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}
          images: ${{ env.REGISTRY }}/pradumnasaraf/hello-world
      - name: Build and push Docker image
        uses: docker/build-push-action@v4
        with:
          context: .
          push: true
          # tags: ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}
          tags: ${{ env.REGISTRY }}/pradumnasaraf/hello-world:latest
          labels: ${{ steps.meta.outputs.labels }}
```

**Let's understand the YAML config**

If you're familiar with GitHub Workflows, you'll know that each step is usually self-explanatory.

In this particular workflow, we're triggering it whenever a new commit is pushed to the main branch, but this can be customized to suit specific needs.

The `env:` defines environment variables that can be used throughout the GitHub Action. In this case, the `REGISTRY` environment variable is set to [`ghcr.io`](http://ghcr.io), which is the GitHub Container Registry where the Docker image will be pushed. The `IMAGE_NAME` environment variable is set to `${{ github.repository }}`, which is a GitHub context variable that provides the repository name in the format of `owner/repo`. This variable can be used to specify the name of the Docker image that will be built and pushed to the registry.

```yaml
on:
  push:
    branches: ['main']

env:
  REGISTRY: ghcr.io
  IMAGE_NAME: ${{ github.repository }}
```

This YAML code block defines a job that will run on a `ubuntu-latest` runner based on our specific requirements. A job can include multiple steps, which are defined in the `steps` field.

The `permissions` field specifies the permissions that the job requires to run. In this case, the job requires read access to the repository contents and write access to packages.

The `actions/checkout` step is used to copy the contents of our repository to the runner environment where the job will be executed. This is necessary to enable subsequent steps to access the repository files and build and push the Docker image.

```yaml
jobs:
  build-and-push-image:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write

    steps:
      - name: Checkout repository
        uses: actions/checkout@v3
```

Next, the action will log in to the GHCR registry using the `GITHUB_TOKEN`. We don't need to create this token because GitHub provides it by default.

```yaml
      - name: Log in to the Container registry
        uses: docker/login-action@v2
        with:
          registry: ${{ env.REGISTRY }}
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}
```

The YAML code block below defines two actions for building and pushing a Docker image. The first action extracts metadata for the image, and the second action builds and pushes the image to a Docker registry. The metadata extracted in the first action is used as input for the second action. The registry, image name, and tags are defined using environment variables.

However, two lines in the code have been commented out because the username in the GitHub Container Registry (GHCR) should have a lowercase first letter, whereas in this case, it starts with a capital letter ("Pradumnasaraf"). To resolve this issue, the image name has been explicitly defined, and a comment has been added. If your username in GHCR does not have a capital letter at the beginning, you can uncomment the relevant lines and remove the comment above them.

```yaml
      - name: Extract metadata (tags, labels) for Docker
        id: meta
        uses: docker/metadata-action@v4
        with:
          #images: ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}
          images: ${{ env.REGISTRY }}/pradumnasaraf/hello-world
      - name: Build and push Docker image
        uses: docker/build-push-action@v4
        with:
          context: .
          push: true
          # tags: ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}
          tags: ${{ env.REGISTRY }}/pradumnasaraf/hello-world:latest
          labels: ${{ steps.meta.outputs.labels }}
```

Now, let's commit the changes. As soon as you commit the file, the workflow will be triggered because we have set the `on:` parameter to `push:`. This means that every time you push a commit to your repository, it will build and push a fresh Docker image based on the Dockerfile in the repository. Of course, you can set some constraints and conditions to limit this behaviour, but we won't discuss those in this blog post.

To check if the workflow is running, go to the "Actions" tab. In my case, the workflow ran so fast that it already completed all the steps to publish an image to GHCR and publish a package.

![](/blog-images/publish-image-on-ghcr/image-02.png)

To check if the package has been released, navigate to the root of your GitHub repository. Under the **Packages** section, you should find a package named **hello-world**. This package indicates that the Docker image has been successfully built and published to the container registry.

![](/blog-images/publish-image-on-ghcr/image-03.png)

Next, click on the `hello-world` package to retrieve the image URL and other relevant details.

![](/blog-images/publish-image-on-ghcr/image-04.png)

To test our Docker image locally, we can run the following command. Instead of using **pull**, we will replace it with the **run** and use the copied URL.

**Note**: that the URL will vary depending on your username and repository name. In my case it will be:

```bash
docker run ghcr.io/pradumnasaraf/hello-world:latest
```

This command will download the Docker image from GHCR and run it in a container. You should see the "Hello World" message printed in the terminal.

![](/blog-images/publish-image-on-ghcr/image-05.png)

**Congratulations on successfully building and pushing a Docker image to GHCR using GitHub Actions!** **🎉**

I hope you learned something from this blog. If you have, don't forget to drop a like, follow me on Hashnode, and subscribe to my Hashnode newsletter so that you don't miss any future posts. If you have any questions or feedback, feel free to leave a comment below. Thanks for reading and have a great day!

%[https://hashnode.com/@Pradumnasaraf] 

%[https://blog.pradumnasaraf.dev/newsletter]