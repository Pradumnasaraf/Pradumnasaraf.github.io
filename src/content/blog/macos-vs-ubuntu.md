---
title: 'macOS vs Ubuntu: GitHub Actions Runners'
excerpt: 'macOS vs Ubuntu: GitHub Actions Runners'
date: '2024-04-05'
author: 'Pradumna Saraf'
category: 'operating-system'
tags: ['operating-system', 'github', 'opensource', 'git', 'github-actions']
thumbnail: '/blog-images/macos-vs-ubuntu/thumbnail.png'
draft: false
---


In case you missed it, GitHub has made macOS Runner available for open source! This means we can now use macOS Runner for free in public repositories. You can read more about it [here](https://github.blog/changelog/2024-01-30-github-actions-introducing-the-new-m1-macos-runner-available-to-open-source/).

I thought it would be a great opportunity to compare the most commonly used runners - Ubuntu and macOS - and see if it's worth switching all my workflows to macOS runner.

So, the best way to test this is to run the same task on both runners and see the differences. Thus, I wrote a simple GitHub workflow to test the total time duration for a workflow using different runners. Here's the workflow I came up with:

```yaml
name: macOS Runner Test

on:
  workflow_dispatch:

jobs:
  test:
    runs-on: macos-latest

    steps:
    - name: Print OS Information
      run: |
        echo "Operating System: $(uname -a)"
        echo "Current Directory: $(pwd)"
        echo "List of files: $(ls -l)"

    - name: Execute Script
      run: |
        echo "Running script..."
        # Add your script commands here
        echo "Script execution completed."
```

The results were as I expected: Ubuntu took the lead. For this workflow to run (for the first time), Ubuntu took **13 seconds** to complete it, whereas macOS took **43 seconds**, which is more than 3 times longer than Ubuntu. Refer to the screenshots below for reference:

macOS Runner:

![macos workflow result](/blog-images/macos-vs-ubuntu/macos-workflow-result.png)

Ubuntu Runner:

![Ubuntu workflow result](/blog-images/macos-vs-ubuntu/ubuntu-workflow-result.png)

I tested multiple workflows, and not once did the macOS runner take the lead. So, the point I am trying to make is not that macOS is slow and not useful, but rather, going back to my original point and why I performed this test: Is it worth switching all my workflows to macOS, now that we have two runner options? The answer is NO.

However, this doesn't diminish the power of the macOS runner. There can be a lot of use cases, such as running Swift code or developing an Apple Silicon app and doing specific automation testing, etc., which perform way better on macOS compared to other operating systems.

Thanks for reading, and have a great day! You can also follow me on [Twitter](https://twitter.com/pradumna_saraf).