---
title: 'Automate your releases on GitHub.'
excerpt: 'Automate GitHub releases for software packaging and distribution with a few lines of YAML code. Follow Conventional Commits for versioning'
date: '2022-08-18'
author: 'Pradumna Saraf'
category: 'github'
tags: ['github', 'git', 'github-actions-1', 'semantic-versioning', 'conventional-commits']
thumbnail: 'https://cdn.hashnode.com/res/hashnode/image/upload/v1731590966520/06228645-3e61-4d18-a9dd-a906d59ed56c.png'
draft: false
---


### So, what are releases?

Packaging/bundling software and making it available for a broader audience for download and use.

### Why use them?

* To distribute the software (Binary distribution).
    
* To keep track of type and amount of changes.
    
* To follow Semantic versioning practices.
    
* To go back in time and use the previous version.
    
* It looks professional.
    

### Why automate releases?

Creating a release manually can be a little tricky and challenging at the same time. Using a GitHub workflow with a few lines of the YAML, we can automate that task and focus more on development. Alongside, it also generates a changelog file (`CHANGELOG.md`) and tags.

![linkfree.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1660733593553/T04BNIovm.png)

Picture - [EddieHubCommunity/LinkFree](https://github.com/EddieHubCommunity/LinkFree) repo.

### Using the workflow.

Create a `.github` folder inside the root of the repo. Create a folder name `workflows` inside the `.github` folder. Then create a `releases.yml` file by adding the YAML config provided below inside the `workflows` folder.

* Complete path will be `.github/workflows/releases.yml`
    

**YAML Config:**

```yaml
name: Releases
on:
  push:
    branches:
      - main

jobs:
  changelog:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3
      - name: conventional Changelog Action
        id: changelog
        uses: TriPSs/conventional-changelog-action@v3
        with:
          github-token: ${{ secrets.github_token }}

      - name: create release
        uses: actions/create-release@v1
        if: ${{ steps.changelog.outputs.skipped == 'false' }}
        env:
          GITHUB_TOKEN: ${{ secrets.github_token }}
        with:
          tag_name: ${{ steps.changelog.outputs.tag }}
          release_name: ${{ steps.changelog.outputs.tag }}
          body: ${{ steps.changelog.outputs.clean_changelog }}
```

#### Understanding the config

* To automatically trigger a workflow on some events, we use the `on:` property. In this case, action will get triggered when the changes are pushed to the `main` branch. We can also modify the branch according to our preferences
    

```yaml
on:
  push:
    branches:
      - main
```

* We will be running the workflow on Ubuntu OS. We can also change that
    

```yaml
jobs:
  changelog:
    runs-on: ubuntu-latest
```

* Here we are using two Actions. The `checkout` action will be used to checkout and go inside the repo, and the `conventional-changelog-action` will look for conventional commits. It will also create a changelog file.
    

By default, GitHub provides a default token `github_token`. We can also use a Personal access token.

```yaml
    steps:
      - uses: actions/checkout@v2
      - name: conventional Changelog Action
        id: changelog
        uses: TriPSs/conventional-changelog-action@v3
        with:
          github-token: ${{ secrets.github_token }}
```

* Here, we are using the `create-release` action, which will create an auto release for us depending on the convention of the commit used
    

It will auto-set the body and the release commit naming.

```yaml
      - name: create release
        uses: actions/create-release@v1
        if: ${{ steps.changelog.outputs.skipped == 'false' }}
        env:
          GITHUB_TOKEN: ${{ secrets.github_token }}
        with:
          tag_name: ${{ steps.changelog.outputs.tag }}
          release_name: ${{ steps.changelog.outputs.tag }}
          body: ${{ steps.changelog.outputs.clean_changelog }}
```

### Working

To make the workflow create the automated releases. We need to follow some commit conventions - [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/). Depending upon the convention used, it will version the new release.

![semanticversioning-vZLYjPBL.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1660731677868/Xw7NChXOT.png)

* `fix:` Will bump the last digit - patch.
    
* `feat` - Will bump the middle digit - minor
    
* `BREAKING CHANGE:` - It will bump the first digit by - major
    

I have also written a blog on Conventional Commits. You can check out that - [Getting started with Conventional Commits](https://blog.pradumnasaraf.co/getting-started-with-conventional-commits)

**We are now all set. Now, when we create a commit with the proper convention, it will do all the magic for us.**

That's the end of the blog. Thank you for reading it.

Follow Pradumna on [Twitter](https://twitter.com/pradumna_saraf) [Hashnode](https://hashnode.com/@Pradumnasaraf)