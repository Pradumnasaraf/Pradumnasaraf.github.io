---
title: 'Using Profiles with Docker Compose'
excerpt: 'Learn how to use profiles with Docker Compose to manage different environments and configurations.'
date: '2026-01-30'
author: 'Pradumna Saraf'
category: 'docker'
tags: ['docker', 'docker-compose']
thumbnail: '/blog-images/using-profiles-with-docker-compose/thumbnail.png'
canonical: 'https://dev.to/pradumnasaraf/using-profiles-with-docker-compose-238l'
draft: false
---

Most applications don’t need all Docker Compose services running all the time with the core application, such as development tools, like monitoring and debugging. For example, in a full-stack application, we want the backend, database, and maybe a frontend running by default, and keep monitoring and debugging tools turned off until we need them.  

Docker Compose profiles make this easy. It saves us from creating multiple compose files with different configurations and managing them. With this approach, we can achievea single source file as a single source of truth.

## Monitoring with Compose profiles

Let's look at an example to understand how we can use profiles with Docker Compose with a real-world example. Let's say we have a full-stack application with a backend, database, and a frontend. We want to run the backend, database, and frontend by default, and keep monitoring and debugging tools turned off until we need them.

```yaml
services:
  backend:
    image: node:20-alpine
    command: npm run start

  frontend:
    image: node:20-alpine
    command: npm run dev

  db:
    image: mysql:8

  prometheus:
    image: prom/prometheus
    profiles: [monitoring]

  grafana:
    image: grafana/grafana
    profiles: [monitoring]

  phpmyadmin:
    image: phpmyadmin
    depends_on: [db]
    profiles: [debug]
```

In this setup, the backend, frontend, and database form the core of the application and are started by default because we didn't assign any profiles to them.

**Prometheus** and **Grafana** are grouped under the `monitoring` profile, as we only need them if we want to look at the metrics or performance. About **phpMyAdmin**, it is grouped under the `debug` profile, and it’s only necessary when we need to debug database issues.

So, by default, only the core services start, and the monitoring and debugging tools are turned off.

```bash
docker compose up
```

When we need monitoring and debugging, we can start the services by using the `--profile` flag.

```bash
docker compose --profile monitoring up # to start monitoring tools
docker compose --profile debug up # to start debugging tools
```

We can also combine the profiles to start multiple services at once:

```bash
docker compose --profile monitoring --profile debug up
```

That’s it. This approach keeps your Compose file clean and avoids running unnecessary services.

As always, I'm glad you made it to the end. Thank you for your support and reading. I regularly share tips on [**Twitter**](https://x.com/pradumna_saraf) (It will always be Twitter ;)). You can connect with me there.
