---
title: 'Automate JavaScript Code Formatting Using GitHub Actions and Prettier'
excerpt: 'Automate JavaScript code formatting with GitHub Workflows. Learn how to set up workflows to format code using Prettier after each change.'
date: '2023-05-24'
author: 'Pradumna Saraf'
category: 'javascript'
tags: ['javascript', 'automation', 'prettier', 'github-actions']
thumbnail: 'https://cdn.hashnode.com/res/hashnode/image/upload/v1684651944128/e4c5da57-d579-4f11-9137-6d99878f7430.png'
draft: false
---


Checking the format manually can be a tedious task, so automating this process can be highly beneficial. In this blog post, we will explore how to use GitHub Actions to automatically format your JavaScript code after every change.

This will work for projects with a simple `index.js` file, and there is no requirement for a Node.js application with a package.json file.

This becomes way more convenient when you have a project on the scale of [EddieHubCommunity/LinkFree](https://github.com/EddieHubCommunity/LinkFree) and receive a good number of pull requests on a daily basis. This way, you can focus more on the code and valuable parts.

### Prerequisites

* A GitHub account
    
* Basic understanding of YAML (Not mandatory)
    

### Steps

To begin, ensure that you are at the root of the repository. Next, create a folder called `.github`, and within that folder, create another folder named `workflows`. Inside the `workflows` folder, create a file called `prettier.yml`. You can choose any name for this file. The path to the file should be `.github/workflows/prettier.yml`.

After creating the file, you can copy and paste the configuration provided below into the YAML file. However, please refrain from committing to the changes at this point. First, let's understand the configuration, and also that it requires certain permissions to execute.

```yaml
name: Format the code

on:
  push:
  pull_request:

jobs:
  format:
    runs-on: ubuntu-latest
    name: Format Files
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: "16"
      - name: Prettier
        run: npx prettier --write **/*.js
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}

      - uses: stefanzweifel/git-auto-commit-action@v4
        if: ${{ github.event_name == 'push' || github.event_name == 'workflow_dispatch' }}
        with:
          commit_message: "style: format files"
```

### Understanding the YAML config

```yaml
      - uses: actions/setup-node@v3
        with:
          node-version: "16"
      - name: Prettier
        run: npx prettier --write **/*.js
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

If you carefully examine the configuration, you'll notice that we are doing a very simple task: setting up the node and running `Prettier` with `npx`. Additionally, this implies that you can use this setup with a simple JavaScript project without requiring a `package.json`.

Also, there is no need to explicitly set the `GITHUB_TOKEN` as it is provided by default.

```yaml
      - uses: stefanzweifel/git-auto-commit-action@v4
        if: ${{ github.event_name == 'push' || github.event_name == 'workflow_dispatch' }}
        with:
          commit_message: "style: format files"
```

In the final step, we automatically commit the formatted changes in the JavaScript files.

To enable the Auto-commit Action for creating a commit with formatted changes, we need to have the appropriate write permissions. By default, it is set to read-only. To verify this, navigate to `Settings` -&gt; `Actions` -&gt; `General` and ensure that the workflow has both read and write permissions enabled.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1677262680057/74f1f50b-d9fe-4934-acd3-deafc5e0ab21.png)

### Working

Now, whenever there is a push (either through commit or direct push) or a pull request, the workflow will automatically execute. You can also modify these behaviours by adjusting the `on:` property in the YAML config.

### Demo

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1684649713169/cdd255fa-3304-4e76-9417-82af276fcabb.gif)

Congratulations on successfully automating JavaScript Code Formatting Using GitHub Actions and Prettier**🎉**

I hope you learned something from this blog. If you have, don't forget to drop a like, follow me on Hashnode, and subscribe to my Hashnode newsletter so that you don't miss any future posts. If you have any questions or feedback, feel free to leave a comment below. Thanks for reading and have a great day!

%[https://hashnode.com/@Pradumnasaraf] 

%[https://blog.pradumnasaraf.dev/newsletter]