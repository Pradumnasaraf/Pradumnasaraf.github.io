---
title: 'What''s New In Docker 2023?'
excerpt: 'Discover Docker 2023''s new features in AI, security, faster builds, hot reloading, and improved debugging at DockerCon'
date: '2023-10-29'
author: 'Pradumna Saraf'
category: 'ai'
tags: ['ai', 'docker', 'security', 'devops', 'containers', 'docker-compose']
thumbnail: '/blog-images/docker-2023/thumbnail.png'
draft: false
---


This year, DockerCon was amazing. There were lots of significant announcements across different domains, such as Open Source, AI, security, supply chain, and more.

Here are some of the highlights:

### Docker AI

![Docker AI Poster](/blog-images/docker-2023/docker-ai-poster.png)

With Docker AI, Docker aims to eliminate repetitive, mundane configuration tasks. It is employed throughout the development lifecycle for fast, easy, and portable application development.

Their focus is on 4 pillars:

* Faster time to code
    
* Hundreds of AI/ML models & images
    
* Reproducibility
    
* Security by default
    

---

### Docker Compose Watch

![Compose Watch Banner](/blog-images/docker-2023/compose-watch-banner.png)

Hot reloading has become feasible in the Docker Compose application. In the past, the process of rebuilding and recreating the container was tedious and disrupted the workflow.

Earlier, developers resorted to creating bind mounts, but this approach wasn't ideal since it functioned differently across diverse operating systems.

The implementation is straightforward. By using the `watch` keyword, one can define necessary actions, such as sync and rebuild.

```yaml
services:
  web:
    build: .
    command: npm start
    develop:
      watch:
        - action: sync
          path: ./web
          target: /src/web
          ignore:
            - node_modules/
```

---

### Docker Debug

![Docker Debug Poster](/blog-images/docker-2023/docker-debug-poster.jpeg)

Docker Debug offers an integrated toolbox to debug containerized apps both locally and remotely. It allows users to view logs, run commands, check files, and so much more. It aids in debugging and quickly resolving problems.

---

### Next-Gen Docker Build

![Docker Next-Gen Docker Build Poster](/blog-images/docker-2023/docker-next-gen-docker-build-poster.jpeg)

Docker images are now being constructed 39x faster with the next-gen Docker Build. The building process takes place in the cloud, and users can share the build cache with their teammates. The primary emphasis is on reducing waiting time and honing in on development.

---

### Docker Scout

Docker Scout offers insights into the security of container images, enabling users to make informed decisions on addressing vulnerabilities and enhancing the overall security of their applications.

The core focus is on bolstering security throughout the entire SDLC.

![Docker Scout Poster](/blog-images/docker-2023/docker-scout-poster.png)

---

### Summary

DockerCon showcased exciting updates this year in areas like AI and security. Some highlighted features include faster Docker image creation, enhanced debugging tools, and improved security measures.