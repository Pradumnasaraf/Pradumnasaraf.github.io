---
title: 'Docker Can Run LLMs Locally—Wait, What!?'
excerpt: 'Run Large Language Models (LLMs) locally with Docker Model Runner. Explore benefits, setup, and usage for AI development using Docker Desktop'
date: '2025-04-07'
author: 'Pradumna Saraf'
category: 'ai'
tags: ['ai', 'software-development', 'docker', 'devops', 'gpu', 'llms']
thumbnail: 'https://cdn.hashnode.com/res/hashnode/image/upload/v1744966825193/33858590-e1bd-4e0f-9dc1-d0c0471617b0.png'
draft: false
---


Using Docker to run Large Language Models (LLMs) locally? Yes, you heard that right. Docker is now much more than just running a container image. With **Docker Model Runner**, you can run and interact with LLMs locally.

It’s a no-brainer that we’ve seen a huge shift in development towards AI and GenAI. And it’s not easy to develop a GenAI-powered application, considering all the hassle—from cost to setup. As always, Docker steps in and does what it’s known for: making GenAI development easier so developers can build and ship products and projects faster. We can run AI models on our machines natively! Yes, it runs models outside of containers. Right now, Docker Model Runner is in Beta and available for Docker Desktop for Mac with Apple Silicon, requiring Docker Desktop version 4.40 or later.

In this blog, we will explore the benefits of the Docker Model Runner and how to use it in various forms. Let’s get straight in!

## Benefits of Docker Model Runner

* **Developer Flow**: One of the most important aspects as a developer that we don’t like is the context switching and using 100 different tools, and Docker, used by almost every other developer, make things easy and reduces the learning curve.
    
* **GPU Acceleration**: Docker Desktop runs **llama.cpp** directly on your host machine. The inference server can access Apple's Metal AP, which allows direct access to the hardware GPU acceleration on Apple Silicon.
    
* **OCI Artifcats**: Store AI models as OCI artifcats instead of storing them as Docker Images. This saves disk space and reduces the extraction of everything. Also, this will improve compatibility and adaptability as it’s an industry-standard format.
    
* **Everything Local**: You don’t need to face the hassle of Cloud LLMs API Key, rate limiting, latency, etc, while binding products locally and paying those expensive bills. Another big aspect is data privacy and security comes on top of it. Models are dynamically loaded into memory by llama.cpp when needed.
    

## In Action

Make sure you have Docker Desktop v4.40 or above installed in your system. Once you have that, make sure you have enabled the **Enable Docker Model Runner** by going to **settings &gt; Features in development**. You can also check **Enable host-side TCP support** to communicate form your localhost (we will see a demo below for that).

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1743494733916/142a9f06-5536-4fa7-ad61-3672311f9bb7.png)

Once you are done. Click on **Apply & restart,** and we are all set. To test it’s working, open any terminal any type `docker model`, you will see the output of all the available commands and this verifies everything is working as expected.

So, to intrext with the LLMs, we have two methods (as of now, stay tuned) from the CLI or the API (OpenAI-compatible). The CLI is pretty straightforward on the API front. We can interact with API either from inside a running container or from the localhost. Let’s look at these in much more detail.

### From the CLI

If you have used docker cli (which almost every developer has who ever worked with the container) and used the commands, like `docker pull`, `docker run`, etc, the docker model uses the same pattern, only there is sub command addition which is the **model** keyword, so to pull a model we will do `docker model pull <model name>` or to run a pulled model `docker model run <model name>`. It makes things so much easier because we don’t need to learn whole new wording for a new tool.

Here are all the commands that are currently supported. Some more are coming soon (some are my favourites, too). Stay tuned!

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1743495822560/3e35287b-89eb-4422-9f9d-08f004d8d341.png)

Now, to run a mode, we first need to pull it. So, for example, we will run `llama3.2`. You will find all available models on the [Docker Hub’s GenAI Catalog](https://hub.docker.com/catalogs/gen-ai). So, open the terminal and run `docker model pull ai/llama3.2`. It will take some time to pull it depending on the Model size and your internet bandwidth. Once you pull it, run the `docker model run ai/llama3.2`, and it will start an inactive chat like you have a normal chatbot or ChatGPT, and once you are done, you can use `/bye` it to exit the interactive chat mode. Here is a screenshot:

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1743503292122/310827b4-246b-49c7-9c2c-0ef4a9884aca.png)

### From the API (OpenAI)

One of the fantastic things about Model Runner is that it implements OpenAI-compatible endpoints. We can interact with the API in many ways, like inside a running container or from the host machine using TCP or Unix Sockets.

We will see examples of different ways, but before that, here are the available endpoints. The endpoints will remain the same whether we interact with the API from inside a container or from the host. Only the host will change.

```text
# OpenAI endpoints
    GET /engines/llama.cpp/v1/models
    GET /engines/llama.cpp/v1/models/{namespace}/{name}
    POST /engines/llama.cpp/v1/chat/completions
    POST /engines/llama.cpp/v1/completions
    POST /engines/llama.cpp/v1/embeddings
    Note: You can also omit llama.cpp.
```

**From Inside the Container**

From inside the container, we will use [`http://model-runner.docker.internal`](http://model-runner.docker.internal/) it as the base URL, and we can hit any endpoint mentioned above. For example, we will hit `/engines/llama.cpp/v1/chat/completions` the endpoint to do a chat.

We will be using the `curl`. You can see it uses the same schema structure as OpenAI API. Make sure you have already pulled the model that you are trying to use.

```bash
	curl http://model-runner.docker.internal/engines/llama.cpp/v1/chat/completions \
    -H "Content-Type: application/json" \
    -d '{
        "model": "ai/llama3.2",
        "messages": [
            {
                "role": "system",
                "content": "You are a helpful assistant."
            },
            {
                "role": "user",
                "content": "Please write 100 words about the docker compose."
            }
        ]
    }'
```

So, to test it out, that it works from inside the running container, I am running the `jonlabelle/network-tools` image in an interactive mode and then using the above curl command to talk to the API. And it worked.

As you can see, below is the response I got. The response is in JSON format, including the generated message, token usage, model details, and response timing. Just like the standard.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1743505495381/8939f656-db9a-4673-af6a-bc6872bee6d4.png)

**From the Host**

As I mentioned previously, to interact with the A, you must be sure you have enabled the TCP. You can verify it’s working by visiting the `localhost:12434`. You will see a message saying **Docker Model Runner. The service is running.**

In this, we will have `http://localhost:12434` as the base URL and the same endpoints will be followed. The same goes for the curl command; we will just replace the base URL, and everything will remain the same.

```bash
	curl http://localhost:12434/engines/llama.cpp/v1/chat/completions \
    -H "Content-Type: application/json" \
    -d '{
        "model": "ai/llama3.2",
        "messages": [
            {
                "role": "system",
                "content": "You are a helpful assistant."
            },
            {
                "role": "user",
                "content": "Please write 100 words about the docker compose."
            }
        ]
    }'
```

Let’s try it out by running it in our terminal:

It will return the same JSON format response as the other one, including the generated message, token usage, model details, and response timing.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1743504929534/0501a324-7c34-4dd7-aed3-9e6979b6eded.png)

With this TCP support, we are not just limited to interacting with the applications that are running inside our container but anywhere.

That’s it about the Blog. You can learn more about the Docker Model Runner from the official docs [here](https://docs.docker.com/desktop/features/model-runner/). And keep an eye out for the Docker announcements; there will be a lot more coming. As always, I'm glad you made it to the end—thank you so much for your support. I regularly share tips on [**Twitter**](https://x.com/pradumna_saraf) (It will always be Twitter ;)). You can connect with me there.