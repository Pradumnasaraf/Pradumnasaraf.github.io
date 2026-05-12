---
title: 'Using Claude Code with Docker Model Runner'
excerpt: 'Run Claude Code with local LLMs using Docker Model Runner. Keep your code private, work offline, and avoid burning through tokens.'
date: '2026-05-08'
author: 'Pradumna Saraf'
category: 'ai'
tags: ['ai', 'docker']
thumbnail: '/blog-images/using-claude-code-with-docker-model-runner/thumbnail.png'
canonical: 'https://dev.to/pradumnasaraf/run-claude-code-locally-for-free-with-docker-model-runner-3o27'
draft: false
---

We know that the Claude Code is phenomenal for development and code. But we can easily run out of tokens, and it becomes quickly expensive as your project becomes more complex. What if we can keep all the good parts about the Claude Code, but use the local models instead of cloud ones from Anthropic?

Another reason we want to use the local models is that we have something proprietary or private that we don't want to expose to the cloud models, or we are in flight with no internet connection.

This is where Docker Model Runner is really useful; it helps us run the LLMs very easily locally on our machine, and then we will do some configuration to make it work with the Claude Code.

## Prerequisites

Before we begin, make sure you have:

*   Docker Desktop or Docker Engine installed.
*   Docker Model Runner enabled.
*   Claude Code is installed and ready to go.

If you're on Docker Desktop, head over to **Settings > AI** and enable TCP access for Model Runner.

![docker desktop screenshot](/blog-images/using-claude-code-with-docker-model-runner/image-01.png)

Or, if you prefer the terminal:

```bash
docker desktop enable model-runner --tcp 12434
```

## Getting Started

### 1. Choosing and pulling a local model

There are a load of LLMs to choose from. I'll go with `ai/phi4:14B-Q4_K_M`, but you can pick whatever your machine can handle.

You can find all the models here in the [Docker Hub AI catalogue](https://hub.docker.com/u/ai). Make sure that whenever you choose a model that is good on the coding side.

To pull the model, execute the command below. Pull time depends on the size of the model.

```bash
docker model pull ai/phi4:14B-Q4_K_M
```

### 2. Checking the connection

Using `docker model` sub-commands, we can check various things like the status and the model we have pulled. It's very similar to how we work with Docker images and containers.

Run the command below to check the model status and the list of models we have

```bash
docker model status
docker model ls
```

![terminal screenshot](/blog-images/using-claude-code-with-docker-model-runner/image-02.png)

### 3. Testing the endpoint

Before we jump to test and use Claude Code, we should confirm that the API is actually responding. We can `curl` and send the request to the `/v1/messages` endpoint, and check that.

This is how the curl structure will look. Let's execute it in the terminal.

```bash
curl http://localhost:12434/v1/messages \
  -H "Content-Type: application/json" \
  -d '{
    "model": "ai/phi4:14B-Q4_K_M",
    "max_tokens": 100,
    "messages": [{"role": "user", "content": "Hello!"}]
  }'
```

We will get a response like this. I am using `jq` to better format the output.

![terminal screenshot](/blog-images/using-claude-code-with-docker-model-runner/image-03.png)

### 4: Pointing Claude Code at the local endpoint

It is very simple. We just need to tell Claude Code to use the local API instead of Anthropic's. We can do it by setting up a variable and a model name.

Set the `ANTHROPIC_BASE_URL` environment variable to use the Docker Model Runner endpoint and pass the model name we pull with `--model`. Execute the command below to set that:

```bash
ANTHROPIC_BASE_URL=http://localhost:12434 claude --model ai/phi4:14B-Q4_K_M
```

![terminal screenshot](/blog-images/using-claude-code-with-docker-model-runner/image-04.png)

That's about it. Claude Code is now pointing and running against your local model. You can also see the model being used by the Claude Code.

### 5: Adding the Shell config

As we know, the environment variable `ANTHROPIC_BASE_URL` is not persistent, and only lives for that session of the terminal. Setting the env variable every time is annoying.

To make it permanent so that every time you open up a new terminal, you have the same setup, we need to add the below shell config (`~/.zshrc`, `~/.bashrc`, etc):

```bash
export ANTHROPIC_BASE_URL=http://localhost:12434
```

After you've done this. Restart your terminal, now the Claude Code will always use your local endpoint when you pass `--model`.

### 6. Using the Claude Code

Now, everything is set. Let's run Claude Code. To run with the local model, pass the same model flag and name, like this:

```bash
claude --model ai/phi4:14B-Q4_K_M
```

And we can give some simple tasks to check it's working:

![terminal screenshot](/blog-images/using-claude-code-with-docker-model-runner/image-05.png)

### 7. Watching the requests flow

If you are a bit nerdy like me, and want to see what is happening under the hood. You can actually watch every request Claude Code is making to your local model:

To do that, execute the command below:

```bash
docker model requests --model ai/phi4:14B-Q4_K_M
```

![terminal screenshot](/blog-images/using-claude-code-with-docker-model-runner/image-06.png)

Again, we used `jq` for better formatting.


### 8: What next?

The default context size on most models is fine for small tasks, but Claude Code reads a lot of files. For big project work, you'll want more headroom and a bigger context.

For example, to package `gpt-oss` with a 32k context window:

```bash
docker model pull ai/gpt-oss
docker model package --from ai/gpt-oss --context-size 32000 gpt-oss:32k
```

Then run Claude Code with the new variant:

```bash
claude --model gpt-oss:32k
```

And this is the game: we keep trying and experimenting with different models and context sizes until we find a perfect model for a task.

That was it. That's how you can run Claude Code completely locally with Docker Model Runner.

Give it a try, and let me know what model works best for you.

As always, I'm glad you made it to the end. Thank you for your support and reading. I regularly share tips on [Twitter](https://x.com/pradumna_saraf). You can connect with me there.
