---
title: '6 git commands, you may not know.'
excerpt: 'The article presents six useful Git commands for increasing productivity and saving time, including editing commit messages, creating blank commits.'
date: '2022-01-30'
author: 'Pradumna Saraf'
category: 'github'
tags: ['github', 'opensource', 'git', 'beginners']
thumbnail: 'https://cdn.hashnode.com/res/hashnode/image/upload/v1731592458307/6645cbe6-012f-45c5-8de5-751791bd7f04.png'
draft: false
---


Here are some of the top `git` commands which I handpicked, can be useful to increase your productivity, and also save you some time.

### 1) Updating the last commit message.

If you want to update the message of your last commit, because either it didn't look conventional or meaningful, use this command to edit it:

```bash
git commit --amend -m "Updated message"
```

### 2) Blank Commit.

Sometimes we need a blank commit (no changes added or deleted) maybe we need to initialize our repo or trigger some kind of action, we can use this command:

```bash
git commit --allow-empty -m "blank commit message"
```

### 3) Checking the total number of commits.

If we want to check the total no of the commit on a particular branch we can use this command.

```bash
git rev-list --count <branch-name>
```

Eg:

```bash
git rev-list --count main
```

### 4) Checking files from different a branch.

If we want to view some files from a different branch while working on a different branch, we can use this command:

```bash
git show <branch-name>:<file-name>
```

For Eg: If we are working on the `test` branch and want to see the README.md file of the `main` branch, we can use this command:

```yaml
git show main:README.md
```

### 5) Staging (adding) and committing the changes in a single command.

Instead of doing `git add` and `git commit` separately, we can use this single command to perform this:

```bash
git commit -am "message"
```

### 6) Git tutorial on the terminal.

Yes!,you heard is right, with only single command use can have a whole git tutorial at your fingertips.

```bash
git help tutorial
```

For Support and Reachout: [Twitter](https://twitter.com/intent/follow?screen_name=pradumna_saraf) [LinkedIn](https://linkedin.com/in/pradumnasaraf)