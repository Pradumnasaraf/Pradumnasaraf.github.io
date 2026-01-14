---
title: 'Rate Limiting a Golang API using Redis'
excerpt: 'Learn how to implement rate limiting on a Golang API using Redis and the Gin framework'
date: '2024-11-13'
author: 'Pradumna Saraf'
category: 'docker'
tags: ['docker', 'redis', 'golang', 'apis', 'developer']
thumbnail: '/blog-images/rate-limit-go-app-redis/thumbnail.png'
draft: false
---


To put **Rate Limiting** in simpler words, it is a technique in which we limit the number of requests a user or client can make to an API within a given time frame. You might have encountered in the past getting a "rate limit exceeded" message when you tried to access a weather or a joke API. The are a lot of arguments around why to rate limit an API, but some important ones are to make fair use of it, make it secure, safeguard resources from overload, etc.

In this blog, we will create an HTTP server with Golang using the Gin framework apply a rate limit functionality to an endpoint using Redis and store the total count of the requests made by an IP made to the server in a timeframe. And if it exceeds the limit, we set, we will give an error message.

In case you have no idea what Gin and Redis are. [Gin](https://github.com/gin-gonic/gin) is a web framework written in Golang. It helps to create a simple and fast server without writing a lot of code. [Redis](https://github.com/redis/redis) it's an in-memory and key-value data store that can be used as a database or for caching capabilities.

### Prerequisite

* Familiarity with Golang, Gin and Redis
    
* A Redis instance (We can use Docker or a remote machine)
    

### Getting Started

To Initialize the project run `go mod init <github path>` for eg, `go mod init` [`github.com/Pradumnasaraf/go-redis`](http://github.com/Pradumnasaraf/go-redis).

Then let's create a simple HTTP server with Gin Framework then we apply the logic for rate limiting it. You can copy the code below. It's very basic. The server will reply with a message when we hit the `/message` endpoint.

After you copy the below code, run `go mod tidy` to automatically install the packages we have imported.

```golang
package main

import (
	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()
	r.GET("/message", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "You can make more requests",
		})
	})
	r.Run(":8081") //listen and serve on localhost:8081
}
```

We can run the server by executing `go run main.go` in the terminal and see this message in the terminal.

![VS code screenshot](/blog-images/rate-limit-go-app-redis/vs-code-screenshot.png)

To test it, we can go to [`localhost:8081/message`](http://localhost:8081/message) we will see this message in the browser.

![browser screenshot](/blog-images/rate-limit-go-app-redis/browser-screenshot.png)

Now our server is running, let's set up a rate limit functionality for the `/message` route. We will use the `go-redis/redis_rate` package. Thanks to the creator of this package, we don't need to write the logic for handling and checking the limit from scratch. It will do all the heavy lifting for us.

Below is the complete code after implementing the rate-limiting functionality. We will understand each bit of it. Just gave the complete code early to avoid any confusion and to understand how different pieces work together.

Once you copy the code run `go mod tidy` to install all the imported packages. Let's now jump and understand the code (Below the code snippet).

```golang
package main

import (
    "context"
    "errors"
    "net/http"
    "github.com/gin-gonic/gin"
    "github.com/go-redis/redis_rate/v10"
    "github.com/redis/go-redis/v9"
)

var (
    rdb     *redis.Client
    limiter *redis_rate.Limiter
)

func initRedis() {
    rdb = redis.NewClient(&redis.Options{
        Addr: "localhost:6379",
    })
    limiter = redis_rate.NewLimiter(rdb)
}

func main() {
    // Initialize Redis client and rate limiter once
    initRedis()
    defer rdb.Close()

    r := gin.Default()
    r.GET("/message", func(c *gin.Context) {
        err := rateLimiter(c.ClientIP())
        if err != nil {
            c.JSON(http.StatusTooManyRequests, gin.H{
                "message": "you have hit the limit",
            })
            return
        }
        c.JSON(http.StatusOK, gin.H{
            "message": "You can make more requests",
        })
    })
    r.Run(":8081")
}

func rateLimiter(clientIP string) error {
    ctx := context.Background()

    res, err := limiter.Allow(ctx, clientIP, redis_rate.PerMinute(10))
    if err != nil {
        return err
    }
    if res.Remaining == 0 {
        return errors.New("Rate limit exceeded")
    }

    return nil
}
```

Let's first directly jump to the `initRedis()` function. This will create an instance of a Redis client and rate limiter once when the application starts. This way, we don't need to create a new instance every time. We created global variables, `rdb` to store the redis instance and `limiter` to store the limter instance.

Now let's understand the `rateLimiter()` function. This function asks for an argument that is the request's IP address, which we can obtain via `c.ClientIP()` in the `main` function. And we return an error if the limit is hit otherwise keep it `nil`. Most of the code is boilerplate we took from the official GitHub [repo](https://github.com/go-redis/redis_rate). The key functionality to look closer into here is the `limiter. Allow()` function. `Addr:` takes the URL path value for the Redis instance. I am using Docker to run it locally. You can use anything, make sure you replace the URL accordingly.

```golang
res, err := limiter.Allow(ctx, clientIP, redis_rate.PerMinute(10))
```

It takes three arguments, the first is `ctx`, the second one is Key, Key (key for a value) for the Redis Database, and the third one is the the limit. So, the function stores the **clientIP** address as a key and the default limit as the value and reduces it when a request is made. The reason for this structure is that the Redis database needs unique identification and a unique key for storing key-value pairs kind of data, and every IP address is unique in its way, this is why we are using IP addresses instead of usernames, etc. The 3rd argument `redis_rate.PerMinute(10)` can be modified as per our need, we can set limit **PerSecond**, **PerHour**, etc, and set the value inside parentheses for how many requests can be made per minute/second/hour. In our case, it's **10 per minute**. Yes, it's that simple to set.

At last, we are checking if there is a remaining quota of not by `res.Remaining`. If it's zero we will return an error with the message otherwise we'll return nil. For eg, you can also do `res.Limit.Rate` to check the limit rate, etc. You can play around and dig deeper into that. One thing to note here is, that this is just an example of how to bring these two pieces together, as we have a single route we are not using any middleware, what if when we have 10s or 100s of routes?

Now coming the `main()` function:

```golang
func main() {
    // Initialize Redis client and rate limiter once
    initRedis()
    defer rdb.Close()

    r := gin.Default()
    r.GET("/message", func(c *gin.Context) {
        err := rateLimiter(c.ClientIP())
        if err != nil {
            c.JSON(http.StatusTooManyRequests, gin.H{
                "message": "you have hit the limit",
            })
            return
        }
        c.JSON(http.StatusOK, gin.H{
            "message": "You can make more requests",
        })
    })
    r.Run(":8081")
}
```

Everything is almost the same in the `main()` function. We called the `initRedis()` function to initialize the Redis client and rate limiter and then close the redis client using `defer` once the application exits. In the `/message` route, every time the route gets hit, we call the `rateLimit()` function and pass it a **ClientIP** address and store the return value (error) value in the `err` variable. If there is an error we will return a **429**, that is, `http.StatusTooManyRequests`, and a message `"message": "You have hit the limit"`. If the person has a remaining limit and the `rateLimit()` returns no error it will work normally, as it did earlier and serve the request.

That was all the explanation. Let's now test the working. Re-run the server by executing the same command. For the 1st time, we will see the same message we got earlier. Now refresh your browser 10 times (As we set a limit of 10 per minute), and you will see the error message in the browser.

![browser screenshot](/blog-images/rate-limit-go-app-redis/browser-screenshot-1.png)

We can also verify this by seeing the logs in the terminal. Gin offers great logging out of the box. After a minute it will restore our limit quota.

![terminal logs](/blog-images/rate-limit-go-app-redis/terminal-logs.png)

That's come to the end of this blog, I hope you enjoy reading as much as I enjoy writing. I am glad you made it to the end—thank you so much for your support. I also talk regularly about Golang and other stuff like Open Source and Docker on [X (Twitter)](https://x.com/pradumna_saraf). You can connect me over there.