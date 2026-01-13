---
title: 'Getting started with Conventional Commits'
excerpt: 'Learn how to optimize commit messages with Conventional Commits - a lightweight convention for better structured commit history'
date: '2022-07-09'
author: 'Pradumna Saraf'
category: 'github'
tags: ['github', 'opensource', 'git', 'github-actions-1']
thumbnail: 'https://cdn.hashnode.com/res/hashnode/image/upload/v1731590827624/073c5fb9-049a-461e-9d00-39e61aee6a00.png'
draft: false
---


## So, what is a Conventional Commit?

Conventional Commits is a lightweight convention on top of commit messages. In simple, pre-fix the commit messages with some sets of pre-defined rules. It makes commit self-explanatory what type of commit it is.

### Syntax :

The commit message should follow a structure like this:

`<type>[optional scope]: <description>`

**For Eg: If we are improving documentation in the README**

![Commit message (2).png](https://cdn.hashnode.com/res/hashnode/image/upload/v1657076433603/HWkgzToj6.png)

## Use of Conventional Commits

- Automatically generating CHANGELOG files.
- Create auto releases with semantic versioning. 
- Auto trigger builds.
- Get a more structured and understandable commit history.

![Untitled design.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1657080466833/vCo7pc2Qj.png)

Commit history of [EddieHub's LinkFree project](https://github.com/Pradumnasaraf/open-source-with-pradumna)

## Some commonly-used conventions.

- `chore:` Changes that don't change source code or tests.
- `docs:` Changes to the documentation.
- `feat:` Added new feature.
- `ci:` Changes to CI configuration files.
- `fix:` A bug fix
- `build:` Changes that affect the build system or external dependencies.
- `style:` Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc.)
- `test:` Adding missing tests or correcting existing tests

To learn more about it, visit [https://www.conventionalcommits.org](https://www.conventionalcommits.org/en/v1.0.0/)