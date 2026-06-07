---
title: 'Run AI Coding Agents Safely with Docker Sandboxes'
excerpt: 'Run AI coding agents like Claude Code, Codex, and Cursor safely in isolated Docker Sandboxes with network policies and credential controls.'
date: '2026-06-04'
author: 'Pradumna Saraf'
category: 'ai'
tags: ['ai', 'docker', 'security', 'containers', 'cli']
thumbnail: '/blog-images/run-ai-coding-agents-safely-with-docker-sandboxes/thumbnail.png'
canonical: 'https://dev.to/pradumnasaraf/run-ai-coding-agents-safely-with-docker-sandboxes-81g'
draft: false
---


AI agents can run commands, modify files, and download files from untrusted sources directly on a developer machine, which creates a major security risk. There needs to be a way to safely run agents and isolate how they interact with the network, files, host system, etc.

Docker Sandboxes solves this problem by creating isolated microVM environments where AI agents run safely with all the guardrails without affecting the host system. Docker Sandboxes support Claude Code, Codex, Cursor, etc. A complete list of agents can be found [here](https://docs.docker.com/ai/sandboxes/agents/).

## Prerequisites

*   macOS Sonoma (version 14) or later
*   Apple silicon
*   Prior experience with the AI agents

## Getting Started

### Installing the Sandboxes CLI

Sandboxes have their own CLI. To install the `sbx` CLI on the system, execute the following command. We are using Homebrew, as we are on Mac. For other OSes, look at the [documentation](https://docs.docker.com/ai/sandboxes/get-started/#install-and-sign-in).

```shell
brew install docker/tap/sbx
```

Once you have installed the CLI, execute the login command:

```shell
sbx login
```

It will open a browser for the Docker OAuth. It's a one-time thing.

![](/blog-images/run-ai-coding-agents-safely-with-docker-sandboxes/image-01.png)

### Setting the network policy

Since the sandboxes are network-isolated from the host, we can set network policy controls on what a sandbox can access over the network. And this is one of the key things why we are using it.

To set the network policy, we have to execute the following command:

```shell
sbx policy reset
```

You will be prompted to select a default network policy. Depending on how open or strict we are with our agents to have access to the network, we need to choose it.

I will be selecting **Balanced**, as it is a good starting point to have and going forward, we can modify. Balanced by default allows AI provider APIs, package managers, code hosts, container registries, and common cloud services. And we can extend it by command. We will see later in the section.

![](/blog-images/run-ai-coding-agents-safely-with-docker-sandboxes/image-02.png)

If we have chosen **Open**, it would allow all the traffic without any restriction. And **Locked Down** will lock all the outgoing traffic, and we need to explicitly allow everything we need. If we want to be really restrictive, Locked Down is the way.

To list which policies are in effect, we can run the below command:

```shell
sbx policy ls
```

We get the output of all the domains that are allowed.

![](/blog-images/run-ai-coding-agents-safely-with-docker-sandboxes/image-03.png)

### Authenticating the agent

Before we use any agents, agents need to store the credentials for their model provider to communicate. Most agents work with an API key. And for agents like Claude Code, if you have a Claude subscription, we can sign in with OAuth by doing `/login`. It is much more convenient, no API keys passing or any upfront setup needed.

We will use the `/login`, as we have a Claude subscription, but for the providers that have that facility or where an API key is more convenient, we can use a secret set sub-command to do that.

For example, for OpenAI, it will look like this:

```shell
sbx secret set -g openai # Globally
sbx secret set my-sandbox openai # Project Level
```

You can set the secrets on the global level or the project level. The global level will be set for all the projects to have access to the same secret, and if we set it at the project level, only that particular project will have access.

I know we still haven't discussed the project inside the sandbox, which is the next step, because we need to authenticate it first. For now, we can set it globally, and later we can remove and change it depending on our needs.

Once you execute the above command, it will prompt you to enter the secret. Enter the secret, and it will save it.

![](/blog-images/run-ai-coding-agents-safely-with-docker-sandboxes/image-04.png)

Now, to list all the credentials and their scope, execute the command below:

```shell
sbx secret ls
```

And to remove a credential:

```shell
sbx secret rm -g openai
```

![](/blog-images/run-ai-coding-agents-safely-with-docker-sandboxes/image-05.png)

The real credential stays on the host; the sandbox sees only a sentinel value for the security model. You can learn more about how credential injection works and how custom secrets work here.

### Creating a project and running the sandbox

Whenever you start a sandbox, it will create a project. In simple words, projects act as a separation when we are using multiple agents from various or the same providers.

Now we are all set to create our first project. First, we need to create a directory. Let's do that by executing the command:

```shell
mkdir my-project && cd my-project
```

Then let's finally run a sandbox by executing the command below. As I am using Claude, I will provide Claude as a provider. Depending on your provider, you just need to change the provider name.

```shell
sbx run claude
```

As you run, it will start pulling the agent image, which might take a little longer in the first run. Subsequent runs reuse the cached image and start in seconds.

![](/blog-images/run-ai-coding-agents-safely-with-docker-sandboxes/image-06.png)

Now we can give some prompts and see if it's working or not.

![](/blog-images/run-ai-coding-agents-safely-with-docker-sandboxes/image-07.png)

And it's working!

To test if it respects the network policy, let's try to prompt to fetch information from a blocked domain by default and one from the allow list.

![](/blog-images/run-ai-coding-agents-safely-with-docker-sandboxes/image-08.png)

You can see in the above image that it respected the policy. As I requested to fetch the info from my own website domain, `pradumnasaraf.dev`, it gets a 403 forbidden error, and it was able to fetch from `github.com` because it's in the default list.

So, it's working as expected!

To see all the sandboxes that are running, execute the following ls command:

```shell
sbx ls
```

![](/blog-images/run-ai-coding-agents-safely-with-docker-sandboxes/image-09.png)

### Managing the network policy

As we set above, **Balanced** is the default network policy; we can allow other networks to access the scope as we need. In this way, we are only allowing the domain that we want to access.

To allow a policy, we need to use `policy allow` like this:

```shell
sbx policy allow network -g pradumnasaraf.dev
```

And a Policy ID will get printed. The ID can be used for removing the policy completely if we ever want to.

![](/blog-images/run-ai-coding-agents-safely-with-docker-sandboxes/image-10.png)

Now, it's allowed, let's try again to fetch details from our domain.

![](/blog-images/run-ai-coding-agents-safely-with-docker-sandboxes/image-11.png)

And this time it worked. You can see in the above image that it got 200 and gets all the details. And you can verify that it's in the allow list by doing `sbx policy ls`.

Above, we set our domain on a global level, but just like previously, you can choose on a project level!

### Interactive mode

One of my favourite things is that we can also run Sandbox in interactive mode. And we can do similar things. Like managing projects, attaching the agent, opening the shell and managing the network policy.

![](/blog-images/run-ai-coding-agents-safely-with-docker-sandboxes/image-12.png)

That was it. That's how you can run your AI coding agents safely with Docker Sandboxes.

As always, I'm glad you made it to the end. Thank you for your support and reading. I regularly share tips on [Twitter](https://x.com/pradumna_saraf). You can connect with me there.
