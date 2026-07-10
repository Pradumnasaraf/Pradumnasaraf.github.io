---
title: 'How to Run a Dockerfile on Vercel'
excerpt: 'Vercel now supports Dockerfile deployments. Learn how to build a simple Golang server and deploy it to Vercel using a Dockerfile.'
date: '2026-07-10'
author: 'Pradumna Saraf'
category: 'docker'
tags: ['docker', 'go', 'golang', 'containers', 'devops']
thumbnail: '/blog-images/dockerfile-on-vercel/thumbnail.png'
canonical: 'https://dev.to/pradumnasaraf/deploy-a-dockerfile-on-vercel-5abn'
draft: false
---

Yes, you heard it right, you can now run a [Dockerfile on Vercel](https://vercel.com/blog/dockerfile-on-vercel). Vercel was the go-to place where people went to ship and host their frontend and serverless functions without worrying about the infrastructure, but things have changed now.

With the Dockerfile support, you can deploy any stack on it: GO, Rails, Spring Boot, Laravel, etc. And it's very easy to deploy as well, and it has the same experience as deploying a frontend application. Will see in this blog by creating a simple [Golang](https://go.dev) server and deploying to Vercel.

## Prerequisite

- Familiarity with Golang
- A good understanding of Docker
- Vercel Account (Free one)

## Getting Started

### Initialising the project

Create a new directory and initialise the Golang project with the command `go mod init <GitHub path>`, for example:

```sh
go mod init github.com/Pradumnasaraf/Dockerfile-On-Vercel
```

Once you execute it, a `go.mod` file will get created.

### Creating a Golang server

Now, let's create a very simple HTTP server with two endpoints.
 

Create a file named `main.go` and paste the code below. We will understand the code in the next paragraph.

```golang
package main

import (
    "fmt"
    "log"
    "net/http"
    "os"
)

func main() {
    port := os.Getenv("PORT")
    if port == "" {
        port = "8080"
    }

    http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
        _, _ = fmt.Fprintln(w, "Hello from a Go app running as a container on Vercel!")
    })

    http.HandleFunc("/health", func(w http.ResponseWriter, r *http.Request) {
        _, _ = fmt.Fprint(w, "ok")
    })

    log.Printf("listening on :%s", port)
    if err := http.ListenAndServe(":"+port, nil); err != nil {
        log.Fatal(err)
    }
}
```

The above example is very self-explanatory. We have used `http.HandleFunc()` to register two endpoints. The `/` endpoint with the root returns a plain greeting message, and the `/health` endpoint returns an `ok` message, so we have an easy way to check if the server is up and healthy.

The PORT falls back to 8080 for local runs, since binding to 80 on the machine needs root. On Vercel, the value comes in as 80.

### The Dockerfile

To make Vercel pick the Dockerfile, we should use the [`Dockerfile.vercel` naming convention](https://vercel.com/docs/functions/container-images).

Let's create a `Dockerfile.vercel` and paste the code below:

```dockerfile
FROM golang:1.26-alpine AS build
WORKDIR /src
COPY go.mod ./
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 go build -o /app .

FROM gcr.io/distroless/static-debian12:latest
EXPOSE 80
COPY --from=build /app /app
ENTRYPOINT ["/app"]
```

We have taken a [multi-stage Docker build](https://docs.docker.com/build/building/multi-stage/) approach to make the final image simple and small. 

The first stage compiles the binary with the Go toolchain on a Golang Alpine image. And in the second stage, the runtime, we have used a [distroless](https://github.com/GoogleContainerTools/distroless) image. The reason we used the distroless images is that they have no shell and no package manager, so there is almost nothing to attack. Good for security.

To test you can build the image locally and run the container from the image. We will straight away go to deployment as it's pretty simple app.

### Deploying the App

Now everything is done. We have all the files and app in place; we can deploy our app on Vercel. We can use the [Vercel CLI](https://vercel.com/docs/cli) (which only needs a single command: `vercel deploy` to deploy) or the UI to deploy the app. We will intentionally take the UI route to see what the new Dockerfile Deployment experience looks like. 

Before that, we need to push the code to a repo on GitHub. Before pushing, you can add all the supporting files like CI checks, LICENCE, etc. I will name my repo **Dockerfile-On-Vercel**. This is how mine looks: [Pradumnasaraf/Dockerfile-On-Vercel](https://github.com/Pradumnasaraf/Dockerfile-On-Vercel).

![The Dockerfile-On-Vercel repository on GitHub, showing main.go, Dockerfile.vercel, and go.mod](/blog-images/dockerfile-on-vercel/github-repo.png)

Now, our repo is created. Let's head over to Vercel. Once you are logged in, connect your GitHub (to see all your repos). You will see an option "Add New Project". Click on that.

![The Vercel dashboard with the "Add New..." dropdown open, showing the Project option](/blog-images/dockerfile-on-vercel/vercel-add-new-project.png)

Then you will see your most recent projects on GitHub, and for this project, you will see a small Container icon (Dockerfile-On-Vercel in my case), which is a good sign; it is a Dockerfile Deployment-related project.

Then click on import to import the project from GitHub to Vercel.

![Vercel's Import Git Repository list with the Dockerfile-On-Vercel repo and its Import button](/blog-images/dockerfile-on-vercel/vercel-import-repository.png)

After the you will see a follow-up screen where it asks you to modify the build and outputs, or if you want to set any environment variables. As we don't want to change anything, we will skip it.

Plus, you can see in the application preset that it automatically detected it's a container. Click on Deploy to continue


![The New Project screen with the Application Preset automatically set to Container and the Deploy button highlighted](/blog-images/dockerfile-on-vercel/vercel-new-project-deploy.png)

While the application is getting deployed, you can actually see how, like, real container deployment works by unfolding the Dockerfile layer by layer. 

If everything goes well. It will take around 30 sec to deploy this application, and of course, depending on the application size.

![Vercel build logs streaming the Docker image build step by step](/blog-images/dockerfile-on-vercel/vercel-deployment-logs.png)

Once it's deployed, you will see the screen. You can click on Go to dashboard.

![The deployment success screen with a Go to dashboard button](/blog-images/dockerfile-on-vercel/vercel-deployment-success.png)

On the dashboard, you will see all the details related to your deployment, like Vercel domain, sources, etc.

![The Vercel project dashboard showing the deployment domain, source, and a Ready status](/blog-images/dockerfile-on-vercel/vercel-dashboard.png)

Click and visit the Domain to verify if the app is working or not. In my case, it is [dockerfile-on-vercel.vercel.app](https://dockerfile-on-vercel.vercel.app). You can see the greeting message. You can also check the health endpoint by visiting [dockerfile-on-vercel.vercel.app/health](https://dockerfile-on-vercel.vercel.app/health).

![The deployed app in a browser showing "Hello from a Go app running as a container on Vercel!"](/blog-images/dockerfile-on-vercel/app-running.png)


And it's working as expected. 

You can go deep into the Vercel settings and modify them accordingly, like adding an observatory, new domains and integration, etc. 

That's it, that is how you deploy your Dockerfile on Vercel.

As always, I'm glad you made it to the end. Thank you for your support and reading. I regularly share tips on [Twitter](https://x.com/pradumna_saraf). You can connect with me there.
