---
title: 'STOP versioning your Docker Compose file'
excerpt: 'Avoid versioning Docker Compose files to enhance compatibility, follow best practices, and streamline Docker development'
date: '2024-08-09'
author: 'Pradumna Saraf'
category: 'docker'
tags: ['docker', 'development', 'devops', 'containers', 'docker-compose']
thumbnail: 'https://cdn.hashnode.com/res/hashnode/image/upload/v1723108982416/e16b250e-e946-455a-a978-a7f8cb0e6af1.png'
draft: false
---


Docker Compose is one of the best inventions, it makes local development so easy and friction-free. If you are a long-term Docker Compose fanatic like me, you know we have come a long way. Currently, we are using version 2 of Compose, which is written in Golang. Version 1 of Compose was written in Python and has been deprecated. The last update was on **May 10, 2021**. Since then, the packages haven't received any security updates and it's not recommended to use it due to security reasons. You can read more about Compose history [here](https://docs.docker.com/compose/intro/history/).

![v1 vs v2 comparison](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/n95zze02y3ikvzd2g8uw.png)

> Image credit: Docker docs

This was not just a change in the programming language from Python to Golang. A lot of things changed during this transition, from the command to run it to how we structure our compose files.

For instance, to trigger the binary for Compose v1, we used \`docker-compose up\` or \`docker-compose down\`, etc., because previously, we had installed the binary separately. Now, it's \`docker compose up\` with no dash \`-\` between 'docker' and 'compose' because Compose now comes pre-installed with Docker as a subcommand (if you are using Docker for Desktop). This was the most visually different change anyone could notice.

But, there is one more big change: **no further need to version the compose file** like we used to do. Interestingly, a lot of people didn't pay attention to this (including me), as the compose file with a version was still compatible. Also, I think the messaging was not strong enough to remove the version when people were migrating from v1 to v2, and is the whole purpose of this blog to make people aware.

![sample compose file](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/ih17jsvy5s2twycxyzny.png)

Now, Docker is more active in getting this version form out of compose files by giving you a warning in the terminal.

![terminal warring screenshot](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/030bban7gt7o2jse8xy8.png)

At this point, it's just a warning, not an error, because the majority of people are still using versions, and changing this at once by throwing an error can lead to breaking a lot of apps.

If you don't believe me, I searched on GitHub and found around a MILLION projects (usually it's one compose file per project) still use versions in their compose files.

![github search result screenshot](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/qlwtrx8kziu0pkdqhdnp.png)

Btw, here is one more tip, if you still using the old convention of naming a compose file - `docker-compose.yaml`, start using `compose.yaml`.

That's it for this blog. I hope you enjoyed this style of writing, which is more like short storytelling and freestyle. I'm glad you're still reading and made it to the end—thank you so much for your support. Before you go, I want to share that I was recently recognized as a Docker Captain. You can check out the announcement post [here](https://x.com/pradumna_saraf/status/1820286128299163993).