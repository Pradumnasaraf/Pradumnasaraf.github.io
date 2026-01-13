---
title: 'Dockerizing a Golang API with MySQL and adding Docker Compose Support'
excerpt: 'Learn how to dockerize a Golang API with MySQL, and add Docker Compose support for streamlined development and deployment'
date: '2024-09-05'
author: 'Pradumna Saraf'
category: 'docker'
tags: ['docker', 'go', 'mysql', 'golang', 'docker-compose']
thumbnail: 'https://cdn.hashnode.com/res/hashnode/image/upload/v1724572635234/6f583c9d-84b9-4679-88b6-97c5136a92a9.png'
draft: false
---


Developing and testing APIs locally connected to a database is no joke. The database often becomes a pain point. However, using Docker, the process becomes easier and much simpler, making replication easy. In this blog, we will see how we can Dockerize a Golang API with a MySQL Database, also making it Docker Compose ready

For the demo, I created [this](https://github.com/Pradumnasaraf/Blog-Demo/tree/main/go-api-mysql) RESTful Golang API. We can perform CRUD operations like, create, delete, and edit **schedules** to MySQL Database. We can learn more about the endpoints, methods, etc., in the project [README](https://github.com/Pradumnasaraf/Blog-Demo/tree/main/go-api-mysql#readme). We will not go too deep into how the API works, as our primary goal is to focus on the Dockerization part.

For Dockerzing an app we need to create a **Dockerfile**. Let me tell you there are 100s of ways to write a Dockerfile, and there is nothing wrong or right, every individual/company has its own set of practices and way of writing. In our case, we will follow four of the best practices in our Dockerfile to get a better and optimized image that is smaller and more secure. Let's understand all 4 practices and why we implement them before jumping into writing a Dockerfile.

* **Using lighter base images**: For almost every language there is a lighter version of the image. By lighter I don't mean a couple of Megabytes smaller, it can be 10x smaller, the reason is lighter is that it doesn't contain unnecessary dependencies which makes it smaller and more secure. Yes, more dependencies come with more security risk. we will have a `bullseye` and `alpine` version for the node, Golang, etc.
    
* **Multi-Stage Builds:** They are one of the superpowers of Docker, they allow us to run the build steps in parallel and also let us create a final image by copying necessary files and things from other steps and having only items that are needed to run our program.
    
* **Create a Binary:** Many languages support creating binary out of source code, making it small and much easier to run because we don't need to handle complete source code. Also, we can run in any environment irrespective of language barrier.
    
* **Breaking down layers:** As we know every instruction in a Dockerfile is a layer, and breaking down layers is a good way to make our build faster. For example, if we are copying all the files (along with the dependencies file to install) from the source and then installing the dependencies, even if we didn’t make any changes to the dependencies, every time we rebuild an image, it will copy all the files and install dependencies. To overcome this, we break them into several layers and can copy the dependency file in one step and install it. And in the next step, we can copy all the files. Now, when we make a change to the code, and rebuild this time only the layer where we are copying all the files will be rebuilt, leaving the dependency step (which is cached as there are no changes). We can see an example in the below Dockerfile as well. We write Dockerfile in such a way that things that step that change less, like base image, dependencies, etc., will be on the top-to-bottom approach.
    

So, here is the Dockerfile we created for our Go API.

```Dockerfile
# Build Stage
FROM golang:alpine3.20 AS builder

WORKDIR /build

COPY go.mod go.sum ./
RUN go mod download

COPY . .
RUN go build -o /app .

# Final Stage
FROM alpine:3.20

COPY --from=builder /app /app
CMD ["/app"]
```

In the `FROM` we can see we used a `golang:alpine` version as the base image instead of using a full-blown golang one and naming the steps `builder`, the name/label will help us in copying the files from one stage to another. After that, we created a work directory. Then instead of copying all the files together we just copied the `go.mod` and `go.sum` and install dependencies (I have explained the reason for that above in the **Breaking down layers** point).

Now once the dependencies are installed we copy the remaining files. Then we create a binary from our source code by running `go build` and naming the binary with the `-o` output flag to the current location.

Now, here things get interesting, in the final stage we don't need a golang image or such, we can use an Alpine base image because we now have a binary, and we can run on any Linux system irrespective of programming language specifics. In the next step, we can copy the binary from the builder step to the final stage and run the binary.

That's it. That's how Dockerzie our app and we can further improve the Dockerfile by introducing the best practices like, creating a user and running as a non-root, etc. Now we can build an image with the Dockerfile and run and then connect to the remote or local MySQL server by providing the credentials it needs and then hit those API endpoints.

But, we will not stop here we will take a step further, and we will also run a MySQL server in a container and connect with our app. But, one point to note here is we can run a spin of a MySQL container and connect our API container to that, but there is so much manual work and long commands to type in the terminal, and things can go wrong. To overcome this we will use Docker Compose instead to make our life easier.

Let's create a file called `compose.yml` and use the blow config.

```yaml
services:
  app:
    container_name: go-api
    build:
      context: .
      dockerfile: Dockerfile
    image: go-api
    ports:
      - 8080:8080
    environment:
      - DB_HOST=mysql
      - DB_PORT=3306
      - DB_USER=user
      - DB_PASSWORD=password
      - DB_NAME=my-database
    depends_on:
      mysql:
        condition: service_healthy
    networks:
      - go-network

  mysql:
    container_name: go-mysql
    image: mysql:9.0
    environment:
      - MYSQL_ROOT_PASSWORD=password
      - MYSQL_USER=user
      - MYSQL_PASSWORD=password
    volumes:
      - dbdata:/var/lib/mysql
    networks:
      - go-network
    healthcheck:
      test: ["CMD", "mysqladmin", "ping", "-h", "localhost"]
      interval: 10s
      timeout: 5s
      retries: 3

volumes:
  dbdata:

networks:
  go-network:
    driver: bridge
```

It's a pretty basic configuration, but a couple of key things I want to mention is that if we see `DB_HOST` is `mysql`, there is no [localhost](http://localhost) or ip because in compose services communicate with other services by the service name. This is out-of-the-box networking provided by Docker Compose.

Another point, it often happens when working with Docker Compose where we have two services: an app and a database, and the app service starts first and crashes because the database isn't ready when the app tries to connect. To overcome this, we set up a `healthcheck` for the database to confirm its readiness. Then, in our app service, we can use `depends_on` with a `condition` to ensure the app only starts when the database service is healthy.

Now when we do Docker compose for 1st time, we might encounter an error saying permission denied because it doesn't have permission as well as a database with the name `my_database`, so we need to both by execing into the container.

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/f4ty68bfiuz6nkgviy3i.png)

Even though our app has crashed the DB is still up and running. We can check by doing `docker ps`.

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/k5jn38wmb9oxdhafafjr.png)

Now exec into the container by doing `docker exec -it <container-id> sh`. Container ID can be copied from the output after executing `docker ps`. Once we exec into the container, now log into the `mysql` by the below command:

```sh
mysql -u root -p
```

It will ask for the password, enter the password you mentioned in the `compose.yml` file. Once we log in, we can create a database. Create a database with the same name specified in the compose file. In my case, it's `my_database`. Execute the below command:

```sh
CREATE DATABASE my_database;
```

Now to give the right privileges and flush it execute the below command.

```go
GRANT ALL PRIVILEGES ON my_database.* TO 'user'@'%';
FLUSH PRIVILEGES;
```

Once we are done, we need to stop the running compose service and restart again by doing `docker compose up`

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/yhy1fhckjcmdbb4b0vx2.png)

That's it for this blog. I'm glad you're still reading and made it to the end—thank you so much for your support and reading. I sometimes share tips on Golang on [Twitter](https://x.com/pradumna_saraf). You can connect with me there.