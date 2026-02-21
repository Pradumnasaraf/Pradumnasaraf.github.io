---
title: 'Publish a Docker image on DockerHub with GitHub Actions'
excerpt: 'Learn to automate the process of building and pushing a Docker image to DockerHub using GitHub Actions with this tutorial'
date: '2023-03-23'
author: 'Pradumna Saraf'
category: 'docker'
tags: ['docker', 'github', 'opensource', 'github-actions', 'dockerhub']
thumbnail: '/blog-images/dockerhub-githubactions/thumbnail.png'
draft: false
---


Automating Docker image building and pushing to DockerHub can bring significant benefits to your development process, including increased consistency, efficiency, version control, ease of deployment, and scalability.  
  
In this tutorial, we will learn how to automate the process of building and pushing a Docker image to DockerHub using GitHub Actions.

## Prerequisites

* A GitHub account
    
* A Dockerhub account
    
* Basic understanding of YAML (Not mandatory)
    

## Steps

Create a GitHub repository and place a Dockerfile in the root directory. While you can store the file anywhere, it is advisable to keep it in the root directory.

![](/blog-images/dockerhub-githubactions/image-01.png)

For this demo, we will use a very simple `Dockerfile` that prints "Hello World" by running an echo command on an Alpine image. Here is the syntax for it:

```bash
FROM alpine:3.17.2
CMD ["echo", "Hello World!"]
```

To store our Docker image, we need to create a new repository on **DockerHub**. To do this, log into your DockerHub account and click on the "Create Repository" button. Choose a name for your repository and select whether it will be public or private. In this example, we will create a public repository called "hello-world".

![](/blog-images/dockerhub-githubactions/image-02.gif)

Now, let's use a GitHub Workflow (a set of GitHub Actions) to automate the process of building and pushing our Docker image to Docker Hub.

However, before we do that, we need to create two **Actions Repo Secrets** on GitHub with our DockerHub username and password/token so that we can use them in the Workflow to push the built image to Docker Hub.

To do this, go to **Settings** -&gt; **Actions** -&gt; **New repository secret**.

![](/blog-images/dockerhub-githubactions/image-03.png)

Create two secrets with the following names:

* `DOCKERHUB_USERNAME` - Add your Docker Hub username in the secret section.
    
* `DOCKERHUB_PASSWORD` - Add your Docker Hub password or personal access token in the secret section.
    

![](/blog-images/dockerhub-githubactions/image-04.png)

After creating both secrets, your Actions window should look like this. Make sure you have entered the correct credentials.

![](/blog-images/dockerhub-githubactions/image-05.png)

Now let's write the configuration for your GitHub Workflow which will build and push the Dockerfile.

1. Create a `.github` folder in the root of your repository.
    
2. Inside the `.github` folder, create a folder named `workflows`.
    
3. Inside the `workflows` folder, create a file named `docker.yml`.
    
4. Add the following configuration to `docker.yml` file.
    

Do not commit the changes yet. Let's first understand the workflow, and then we can proceed with the commit.

**YAML Config:**

```yaml
name: Build and Publish Docker Image to DockerHub

on:
  push:
    branches: ["main"]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: DockerHub Login
        uses: docker/login-action@v2.1.0
        with:
          username: ${{ secrets.DOCKERHUB_USERNAME }}
          password: ${{ secrets.DOCKERHUB_PASSWORD }}

      - name: Build the Docker image
        run: docker build . --file Dockerfile --tag ${{ secrets.DOCKERHUB_USERNAME }}/hello-world

      - name: Docker Push
        run: docker push ${{ secrets.DOCKERHUB_USERNAME }}/hello-world
```

**Let's understand the YAML config**

If you have worked with GitHub Workflows a little bit, you can understand that every step is self-explanatory.

In the following part, we are triggering the **Workflow** when we push anything to the main branch, and it will run on the latest Ubuntu version. We can modify the `on:` trigger and `runs-on:` runner based on our needs. The `checkout` action will copy the contents of our repository to the runner (Ubuntu).

```yaml
on:
  push:
    branches: ["main"]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3
```

The step will perform a **DockerHub** login using the `DOCKERHUB_USERNAME` and `DOCKERHUB_PASSWORD` secrets stored in the repository's settings. This will allow us to authorize and push our Docker image to the DockerHub account after building it.

```yaml
      - name: DockerHub Login
        uses: docker/login-action@v2.1.0
        with:
              username: ${{ secrets.DOCKERHUB_USERNAME }}
          password: ${{ secrets.DOCKERHUB_PASSWORD }}
```

This step will build a Docker image using the Dockerfile located in the root directory of the repository. The `--tag` option specifies the name of the image, which is `DOCKERHUB_USERNAME/hello-world`. If we have a user named `xyz`, it will build an image with `xyz/hello-world`.

If you have a Dockerfile in a different path, you can specify the path in the `docker build` command using the `-f` option.

```yaml
      - name: Build the Docker image
        run: docker build . --file Dockerfile --tag ${{ secrets.DOCKERHUB_USERNAME }}/hello-world
```

Finally, this step will push the Docker image to Dockerhub with the image name `DOCKERHUB_USERNAME/hello-world`.

```yaml
      - name: Docker Push
        run: docker push ${{ secrets.DOCKERHUB_USERNAME }}/hello-world
```

Now let's commit the changes. As soon as you commit the file, the workflow will be triggered because we have set the `on:` parameter to `push`. This means that every time you push a commit to your repo, it will build and push a fresh Docker image based on the Dockerfile in the repository. Of course, some constraints and conditions can be set to limit this behaviour, but we won't discuss those in this blog post.

To check if the workflow is running, head over to the **Actions** tab. In my case, the workflow ran so fast that it already completed all the steps and pushed our Docker image to DockerHub.

![](/blog-images/dockerhub-githubactions/image-06.png)

Now, go to DockerHub to see your image. Its name will be `{DOCKERHUB_USERNAME}/hello-world`.

![](/blog-images/dockerhub-githubactions/image-07.png)

We can test our Docker image locally by running the following command in the terminal:

Replace `{DOCKERHUB_USERNAME}` with your actual DockerHub username. This command will download the Docker image from DockerHub and run it in a container. You should see the "Hello World" message printed in the terminal.

```bash
docker run {DOCKERHUB_USERNAME}/hello-world
```

![](/blog-images/dockerhub-githubactions/image-08.png)

**Congratulations on successfully building and pushing a Docker image to DockerHub using GitHub Actions!** **🎉**

I hope you learned something from this blog. If you have, don't forget to drop a like, follow me on Hashnode, and subscribe to my Hashnode newsletter so that you don't miss any future posts. If you have any questions or feedback, feel free to leave a comment below. Thanks for reading and have a great day!

%[https://hashnode.com/@Pradumnasaraf] 

%[https://blog.pradumnasaraf.dev/newsletter]