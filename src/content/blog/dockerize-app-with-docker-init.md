---
title: 'Dockerize your application in a minute with Docker INIT'
excerpt: 'With docker init, we can quickly generate the Dockerfile, compose.yml, and .dockerignore.'
date: '2023-11-28'
author: 'Pradumna Saraf'
category: 'microservices'
tags: ['microservices', 'docker', 'devops', 'containers', 'docker-compose']
thumbnail: 'https://cdn.hashnode.com/res/hashnode/image/upload/v1701171368269/a080e932-2876-495e-8e71-275e3cc51474.png'
draft: false
---


Docker Init is changing the game in how we Dockerize our application.

With `docker init`, we can quickly generate the `Dockerfile`, `compose.yml`, and `.dockerignore`. In the past, we manually created these files and implemented the best practices.

Now, with just one command and by answering a series of prompts, Docker automatically sets up these necessary files for us. Notably, this new approach ensures that industry best practices are followed.

In today's article, we'll also see a demo of dockerizing a Node application with `Docker init`.

**Prerequisites**:

* Docker Desktop 4.18 or later
    

**Steps**:

1. **Initialize the Project and Install Dependencies**:
    

For this demonstration, we'll set up a basic application using Node and Express. Begin by initializing your project:

```bash
npm init
```

Then install the Express dependency:

```bash
npm i express
```

1. **Add a Start Script**:
    

Add a start script to your `package.json` file:

```json
"scripts": {
    "start": "node index.js"
},
```

1. **Create a Simple API**:
    

Create an `index.js` file and insert the following code:

```javascript
const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
```

1. **Docker INIT**:
    

Run the `docker init` command and select the language of your project. You'll then be prompted with a series of questions tailored to your project and its structure.

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/n6p2qse6w7348el5wj0f.png)

1. **Running the App**:
    

After the setup, execute the command `docker compose up --build` to construct the images and launch the application.

![Terminal Screenshot](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/xqsv215ou5v5w8ck8oyi.png)

That's it. I hope you learned something from this. As the world moves towards containerizing applications, this can be instrumental in accelerating tasks and transitioning from monoliths to microservices.  
  
Thanks for reading. Follow me on [Twitter](https://twitter.com/home) for more cookies :)