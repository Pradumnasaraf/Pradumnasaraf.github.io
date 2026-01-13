---
title: 'Improving Container Security with Docker Hardened Images'
excerpt: 'Improve security with Docker Hardened Images, reducing vulnerabilities while maintaining workflow, and securing production environments'
date: '2025-12-22'
author: 'Pradumna Saraf'
category: 'docker'
tags: ['docker', 'security', 'devops', 'containers', 'docker-images']
thumbnail: 'https://cdn.hashnode.com/res/hashnode/image/upload/v1766321004211/61177c9a-6faf-4392-a37e-049463ad252d.png'
draft: false
---


Container security remains a significant concern. Base images are bloated and contain unnecessary/or too many tools and packages. Due to this, container images like Node, Ubuntu, etc, have a large attack surface in production. **More packages = more CVEs**, and it’s hard to track which is going inside and which tool is getting hit by vulnerabilities. And we have recently heard a lot of attacks on various companies and tools.

Yes, security scanners do their job and report these issues, but they don’t reduce the attack surface by themselves. That issue still falls on the image you choose. We need to **STOP the habit of “Scan and fix later”**, and reduce the risk and make things secure at the image level. To deal with that, Docker made **Docker Harden Image (DHI)** **FREE for everyone** (here is a [blog](https://www.docker.com/blog/docker-hardened-images-for-every-developer/) release for this). Back when it was released, it was under the paywall, and the Docker team thought security should be available to everyone, and everyone should have access to it and make their application secure.

In this blog, we will look at what DHI is, the problem it solves. Then I will walk you through a demo application to show how to use DHI with your current Dockerfile and workflow. Finally, we will compare in standard image with DHI to get a clear picture of its potential and necessity.

## What is a Docker Hardened Image (DHI)?

Docker Hardened Image or DHI (we will be calling “DHI” throughout the blog) is a base image which is **Open Source**, ultra-minimal, with near-zero CVEs, full transparency (SBOMs and Provenance), and built on top of distros like Alpine and Debian with **SLSA Build L3.** So, using the DHI will reduce the attack surface, making the production secure by default, and Less noise on the scanning side, and fewer things to manage.

To make the discovery, usability, and transparency simpler. Docker built a dedicated [DHI catalogue](https://hub.docker.com/hardened-images/catalog). There are thousands of Hardened images with various versions for the tool or language. You can visit [dhi.io](https://dhi.io) (yes, they went ahead and got this domain ^^, how cool is that).

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1766251431307/1444989f-9166-4224-822e-f27fd097cbb0.png)

One of my favourites feature in the whole DHI catalogue thing is the “**Tool Included**” section on the website. In many images, you will find a dedicated column on the right with a list of tools included in that image. This brings a lot of transparency and ease.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1766251470758/1fcdd7d7-cca4-40b2-a8db-105f8f1d9d6b.png)

There are a lot of Hardened images in the market, and calling an image “Hardened” actually does not make it hardened. Here is a really nice comparison of **DHI vs Others**:

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1766249576984/a0313633-593b-479f-bf92-64e065cd38d5.png)

Source: Docker.com

## Using the Docker Hardened Image

Using the DHI is the same as using the Docker official images. There is no change in how we used to specify the base image in the Dockerfile, and the command to build and run images. It’s the same workflow that we use every day. The only thing that has changed is the base image naming, **which now points to a new dhi.io registry**.

We will see all in detail in this demo. For that, I have created a simple [Node-Express demo](https://github.com/Pradumnasaraf/node-dhi-demo) repo. You can clone and keep it handy if you want to follow along and test it out. Once you are done with that, first, we need to sign in to the DHI registry.

To do that, execute the command below, and you will be prompted to enter your DockerHub username and password. Use your personal access as your password.

```bash
docker login dhi.io
```

Once you successfully log in. Then we can pull the **DHI for Node.js**, as our project is using Node. We will be pulling the Node 22 DHI, and the image for that will be **dhi.io/node:22.** The `22` here refers to the latest version **22.x** of Node. If you are using a different version of Node, you can check the catalogue [here](https://hub.docker.com/hardened-images/catalog/dhi/node) and chnage accordingly.

To pull, we use the same Docker pull command to pull the image:

```bash
 docker pull dhi.io/node:22
```

Now, let’s modify our Dockerfile to make use of DHI instead of the standard official image. You will find the Dockerfile in the clone report as well.

We have to make a couple of changes to make the application work with DHI and be secure. The current Dockerfile looks like below, it’s a simple and typical Docker file we used:

```dockerfile
# Use the official Node.js image
FROM node:22

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install --production

# Copy application code
COPY . .

EXPOSE 3000

ENV PORT=3000
ENV NODE_ENV=production

CMD ["npm", "start"]
```

The modifications are changing the base image in the **FROM** statement and using **Multi-stage Docker Build** (For this particular case, not mandatory while using DHI; we will see why we did that).

After modification, the Dockerfile will have below structure. Let’s understand the modifications in more detail below.

```dockerfile
# Build stage - use regular node image for building
FROM node:22 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY . .

# Production stage - use DHI
FROM dhi.io/node:22

WORKDIR /app

# Copy node_modules and app files from builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/server.js ./

EXPOSE 3000

ENV PORT=3000
ENV NODE_ENV=production

CMD ["node", "server.js"]
```

First, coming to why we use **Multi-stage builds**, yes, using it makes the image minimal and more secure, and that’s the biggest advantage of using that, but in this case, it becomes mandatory because in Node DHI shell is not installed by default, for security, and the **RUN** will not work when we try to install the npm dependencies.

Which is why in the Builder stage. We used the **node:22** image and used **RUN** to install all the dependencies, and then in the Production stage, in the base image (FROM), we used Node DHI for the 22.x version. Docker made it simple to use the DHI, just by prefixing the base image name with `dhi.io/`, and it will use DHI instead of the Docker official image (Make sure you first check the availability).

Then, finally, we simply copied the artefacts like node\_modules, package.json, and server.js from the builder to production and exposed the port and ran the server. The gist is that nothing has changed. Only the naming convention for the base image has changed.

## Comparing and scanning the images

Of course, we can’t end the blog with comparing and getting those numbers. We, developers, love numbers :) So, I built two images. The first image `pradumnasaraf/node-without-dhi` is built with the first Dockerfile above, and uses `node:22`. And then we built the `pradumnasaraf/node-with-dhi` image with the other Dockerfile, which uses the `dhi.io/node:22` DHI.

Then I used **Docker Scout** and ran `docker scout quickview` for both images to check how vulnerable each image is, and the result is expected, but still shocking. In the screenshot below, the number of High and Medium vulnerabilities the first image contains is magnificent. And DHI has just had 8 Low, that’s a huge leap in overall security!

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1766307603381/3d224ab6-c721-4f42-9c55-25b3aa1db1e8.png)

Note: This is not the end of the security/vulnerability optimisation :) This was just to demo what and how to use DHI. The Dockerfile can be improved further by introducing best practices, such as running containers as a non-root user, tightening permissions, etc.

That was it. That’s how you use Docker Hardened Images to make your container secure. Remember, most of the container security issues start with the base image, and fixing them later is like never fixing them. Docker is here again, with their Hardened image, saving the developers and keeping the experience and the workflow simpler. Again, thanks, team Docker, for making this available to everyone :).

As always, I'm glad and super thankful that you made it to the end. Thank you for your support and reading. I regularly share tips on [Twitter](https://x.com/pradumna_saraf). You can connect with me there.