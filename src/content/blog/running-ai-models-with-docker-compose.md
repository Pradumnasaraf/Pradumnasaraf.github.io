---
title: 'Running AI Models with Docker Compose'
excerpt: 'Learn to run AI models with Docker Compose, including setup, configuration, and application integration using Docker’s new model runner capabilities'
date: '2025-08-19'
author: 'Pradumna Saraf'
category: 'ai'
tags: ['ai', 'docker', 'devops', 'containers', 'docker-compose', 'llm']
thumbnail: 'https://cdn.hashnode.com/res/hashnode/image/upload/v1755068741052/418442a0-f208-4801-ab83-f22d2052567e.png'
draft: false
---


Docker Compose has completely changed the game in how we run and connect a multi-service application. Just execute a single line of command, and everything is up and running, and all the services are well interconnected.

When Docker introduced the [Docker Model Runner](https://docs.docker.com/ai/model-runner/) (Or DMR, we call it internally in Docker), there was a missing piece (at least for me). To use an AI model with a Compose application, we separately need to run the model with DMR and then connect our Compose application service by passing the config of that running model.

But Docker knew this, and it sorted it out by [adding the capability](https://docs.docker.com/ai/compose/models-and-compose/) to describe an AI model in YAML, `compose.yml` to run and destroy the AI model on demand. Like we write and do the configuration for `services`, `networks`, and `volumes`. We can do the same for the AI models with `models`.

## Prerequisite

* Docker and Docker Compose are installed
* Understanding of AI and LLMs
    
## Getting Started

Let’s get started. To have a better understanding of the concept and working, I have created a GitHub project: [Pradumnasaraf/Saraf-AI](https://github.com/Pradumnasaraf/Saraf-AI) (Yes, it’s my last name “**Saraf**” and I added “**AI**” to it :)). It’s a Next.js chat application that communicates with the Docker AI Model with the help of the OpenAI framework. You can clone it down and keep it ready; we will be referencing that many times.

### Docker Compose AI models component

First, let’s have a look at the `compose.yml`. Like we are familiar with the `services`, `volumes`, etc, we have defined `models` as the top-level element. This is the new element for defining AI models.

So what we have done is define a service named `saraf-ai` that utilises the model `llm`. We have defined `models` as an element. And the model definition for `llm` that references the `ai/smollm2` model image.

The complete config can be found in `compose.yml` in the root of the repo.

```yaml
# compose.yml
services:
  saraf-ai:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - 3000:3000
    # Models to run
    models:
      - llm

models:
  # Model Name
  llm:
    # Model Image
    model: ai/smollm2
```

Now we understand how the config looks, but how can our app connect and communicate with this AI model? How are we setting up environment variables like model name, URL and API key, as we will be using the OpenAI specification?

**This is where Docker shines!**

As we add config to use a model in a service, Docker will auto-generate and inject two environment variables into our service application based on the model name (in our case, `llm`). So the two variables will be:

* `LLM_MODEL`: Contains the model name.
    
* `LLM_URL`: Contains the model endpoint to communicate with.
    

Now we can reference these in our application and use them. If that sounds confusing, you can read more about them [here](https://docs.docker.com/ai/compose/models-and-compose/#short-syntax).

Also, if we are using multiple AI models and we want to explicitly define how the variable naming should be. For example, we are defining two models below.

```yaml
services:
  app:
    image: my-app
    models:
      llm:
        endpoint_var: AI_MODEL_URL
        model_var: AI_MODEL_NAME
      embedding-model:
        endpoint_var: EMBEDDING_URL
        model_var: EMBEDDING_NAME

models:
  llm:
    model: ai/smollm2
  embedding-model:
    model: ai/all-minilm
```

Now, instead of the default `LLM_Model` and `LLM_URL`, the application will be injected with `AI_MODEL_URL` and `AI_MODEL_NAME`. And for `embedding-model`, it will inject `EMBEDDING_URL` and `EMBEDDING_NAME`.

Now, let’s look at our Next.js application.

## Application config

We have created a Next.js application and are using the OpenAI framework (which is standard in the industry) to communicate with the Docker AI model. And it will automatically pick up those environment variables that Docker injected into the application.

We don’t need `apiKey`, as it’s not a cloud LLM and quota kind of thing.

Below is the complete code. You will also find the complete code in the `src/app/api/chat/route.ts` file.

```javascript
import OpenAI from 'openai';
import { NextResponse } from 'next/server';

const openai = new OpenAI({
  baseURL: process.env.LLM_URL || '',
  apiKey: "key-not-needed"
});

const model = process.env.LLM_MODEL || '';

export async function POST(req: Request) {
  try {
    const { message, messages } = await req.json();
    
    // Validate input
    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required and must be a string' },
        { status: 400 }
      );
    }

    if (!Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Messages must be an array' },
        { status: 400 }
      );
    }
    
    const stream = await openai.chat.completions.create({
      messages: [...messages, { role: 'user', content: message }],
      model,
      stream: true,
      temperature: 0.7,
      max_tokens: 2000,
    });

    return new Response(
      new ReadableStream({
        async start(controller) {
          try {
            for await (const chunk of stream) {
              const text = chunk.choices[0]?.delta?.content || '';
              if (text) {
                controller.enqueue(new TextEncoder().encode(text));
              }
            }
          } catch (streamError) {
            console.error('Streaming error:', streamError);
            controller.error(streamError);
          } finally {
            controller.close();
          }
        },
      }),
      {
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive',
        },
      }
    );
  } catch (error: unknown) {
    console.error('OpenAI API error:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const errorStatus = (error as { status?: number })?.status || 500;
    
    return NextResponse.json(
      { 
        error: 'Failed to get response from AI',
        details: errorMessage,
      },
      { status: errorStatus }
    );
  }
}
```

## Dockerizing the application

Now, let’s Dockerize our application. For that, we will create a **Dockerfile**.

```dockerfile
# Build stage
FROM node:24-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM node:24-alpine AS runner

WORKDIR /app

# Create a non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy built application from builder stage
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Set ownership to nextjs user
RUN chown -R nextjs:nodejs /app

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```

Above is the complete **Dockerfile** code. We have taken a couple of best practices, like multi-stage builds, a non-root user, to make the container image smaller, faster and secure.

Once we are done with that, now, let’s run the Compose application by executing the `docker compose up` command in the terminal. You will see a similar output in the terminal as shown in the screenshot.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1755015760413/2f67289e-a408-4b91-8600-b791157886d9.png)

Now, we can head over `localhost:3000` in our browser and test out the application. You will have a chat window like ChatGPT, type your prompt and ask questions.

Here is a short demo:

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1755022613140/3f7e7e4a-de76-4f8e-83aa-ed6ad2d87afd.gif)

That was it. That’s how you can run Running AI Models with Docker Compose.

As always, I'm glad you made it to the end. Thank you for your support and reading. I regularly share tips on [**Twitter**](https://x.com/pradumna_saraf) (It will always be Twitter ;)). You can connect with me there.