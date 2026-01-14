---
title: 'Using ARM-based GitHub Actions Runners for Workflows'
excerpt: 'Use ARM-based GitHub Actions runners for efficient multi-architecture software build, test, and deploy. Discover setup tips and benefits'
date: '2025-01-30'
author: 'Pradumna Saraf'
category: 'github'
tags: ['github', 'opensource', 'devops', 'cicd', 'arm', 'github-actions-1']
thumbnail: '/blog-images/arm-github-actions-runners/thumbnail.png'
draft: false
---


As we have observed a significant transition toward ARM-based CPUs, such as Apple’s M series and Snapdragon's X, it's essential to build, test, and deploy the product and software in a multi-architecture environment to replicate the exact behaviour experienced by an end user.

GitHub recently announced that Linux ARM-based (arm64) GitHub Actions are now available as hosted runners for free in public repositories. You can read the official announcement [here](https://github.blog/changelog/2025-01-16-linux-arm64-hosted-runners-now-available-for-free-in-public-repositories-public-preview). Previously, developers had to rely on virtualization for Actions runs, which was cumbersome. To use it, we have to set the value for `runs-on:` as `ubuntu-24.04-arm` or `ubuntu-22.04-arm` based on which version of Ubuntu we are going to use based on our needs.

### Let's see in Action

We will create a basic workflow to print "Hello World". First, create a GitHub repo and make sure you are at the root. Then create a dir name `.github` inside that, create a dir called `workflows`, and inside that create a YAML file with any name, we will name it `hello.yaml`. The complete file path will look like this `.github/workflows/hello.yaml`. Now paste the below configuration.

```yaml
name: Hello World
on:
  push:
    branches:
      - main

jobs:
  hello:
    runs-on: ubuntu-24.04-arm

    steps:
      - name: Print Hello World
        run: 'echo "Hello World"'
```

Now, let's commit the changes and head to the Actions tab to check the progress.

![github actions tab](/blog-images/arm-github-actions-runners/github-actions-tab.png)

As we can see, our action ran successfully without any issues. For more real-world workflows we can switch the runner label and it will use arm base runners.

On a personal note, I find ARM-based runners much faster, complementing their nature. It may vary depending on the task and the computation power it needs. That's come to the end of this blog. As usual, glad you made it to the end—thank you so much for your support. I regularly share tips on [Twitter](https://x.com/pradumna_saraf). You can connect with me there.