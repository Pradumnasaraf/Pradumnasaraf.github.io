---
title: 'Monitoring Golang Applications with Custom Prometheus Metrics and Grafana'
excerpt: 'Monitor Golang applications using custom Prometheus metrics and Grafana, with step-by-step setup, Docker integration, and visualization instructions'
date: '2025-04-21'
author: 'Pradumna Saraf'
category: 'docker'
tags: ['docker', 'go', 'golang', 'opensource', 'monitoring', 'devops', 'prometheus', 'grafana']
thumbnail: '/blog-images/monitoring-go-app-with-grafana-prometheus/thumbnail.png'
draft: false
---


Monitoring is important for any application. It helps us ensure that our application is running smoothly and allows us to detect any issues before they become critical. Because in real case scenarios, we are running multiple services, and it's hard to test each service and check if it's working. That is why we set up monitoring to make our lives easier.

In the blog, we will create a Golang application that will be monitored using Prometheus and Grafana. We will be using the `go-prometheus` library to expose metrics from our Golang application. Then will visualise the metrics using Grafana. We will be using Docker and Docker Compose to run our application and the monitoring stack, and connect them.

## Prerequisites

* A good understanding of **Golang**
    
* A good understanding of **Docker** and **Docker Compose**
    
* A good knowledge of **Prometheus** and **Grafana**
    

## Getting Started

For better understanding, we will be breaking the blog into multiple sections.

### Create a Golang Application

Let's first create a Golang server. Create a new directory and initialise a new Golang project by `go mod init <project-name>`. Then create a new file `main.go` and add the following code to it:

We will be breaking down and understanding each part of the code. Giving the complete code before is for better understanding and having clear pictures of how different pieces of the code are connected.

```go
package main

import (
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/prometheus/client_golang/prometheus"
	"github.com/prometheus/client_golang/prometheus/promhttp"
)

// Define metrics
var (
	HttpRequestTotal = prometheus.NewCounterVec(prometheus.CounterOpts{
		Name: "api_http_request_total",
		Help: "Total number of requests processed by the API",
	}, []string{"path", "status"})

	HttpRequestErrorTotal = prometheus.NewCounterVec(prometheus.CounterOpts{
		Name: "api_http_request_error_total",
		Help: "Total number of errors returned by the API",
	}, []string{"path", "status"})
)

// Custom registry (without default Go metrics)
var customRegistry = prometheus.NewRegistry()

// Register metrics with custom registry
func init() {
	customRegistry.MustRegister(HttpRequestTotal, HttpRequestErrorTotal)
}

func main() {
	router := gin.Default()

	// Register /metrics before middleware
	router.GET("/metrics", PrometheusHandler())
	
	router.Use(RequestMetricsMiddleware())
	router.GET("/health", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "Up and running!",
		})
	})
	router.GET("/v1/users", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "Hello from /v1/users",
		})
	})

	router.Run(":8000")
}

// Custom metrics handler with custom registry
func PrometheusHandler() gin.HandlerFunc {
	h := promhttp.HandlerFor(customRegistry, promhttp.HandlerOpts{})
	return func(c *gin.Context) {
		h.ServeHTTP(c.Writer, c.Request)
	}
}

// Middleware to record incoming requests metrics
func RequestMetricsMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		path := c.Request.URL.Path
		c.Next()
		status := c.Writer.Status()
		if status < 400 {
			HttpRequestTotal.WithLabelValues(path, strconv.Itoa(status)).Inc()
		} else {
			HttpRequestErrorTotal.WithLabelValues(path, strconv.Itoa(status)).Inc()
		}
	}
}
```

Now, you can execute `go mod tidy` in the terminal to install all the dependencies we mentioned.

```go
package main

import (
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/prometheus/client_golang/prometheus"
	"github.com/prometheus/client_golang/prometheus/promhttp"
)

// Define metrics
var (
	HttpRequestTotal = prometheus.NewCounterVec(prometheus.CounterOpts{
		Name: "api_http_request_total",
		Help: "Total number of requests processed by the API",
	}, []string{"path", "status"})

	HttpRequestErrorTotal = prometheus.NewCounterVec(prometheus.CounterOpts{
		Name: "api_http_request_error_total",
		Help: "Total number of errors returned by the API",
	}, []string{"path", "status"})
)
```

In the above code, we have imported the required packages. For creating the server, we will use the **gin-gonic**, and `prometheus/client_golang` for exposing the metrics. After that, we have created two variables to define the metrics. The first one is `HttpRequestTotal` which will count the total number of requests processed by the API. The second one is `HttpRequestErrorTotal` which will count the total number of errors returned by the API. Both of them are of the type `CounterVec` , which is a type of metric that counts the number of occurrences of an event. We have also defined two labels for both metrics: `path` and `status`. The label `path` will contain the path of the request, and the `status` label will contain the status code of the response.

```go
// Custom registry (without default Go metrics)
var customRegistry = prometheus.NewRegistry()

// Register metrics with custom registry
func init() {
	customRegistry.MustRegister(HttpRequestTotal, HttpRequestErrorTotal)
}

func main() {
	router := gin.Default()

	// Register /metrics before middleware
	router.GET("/metrics", PrometheusHandler())
	
	router.Use(RequestMetricsMiddleware())
	router.GET("/health", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "Up and running!",
		})
	})
	router.GET("/v1/users", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "Hello from /v1/users",
		})
	})

	router.Run(":8000")
}
```

In this section of code, we have created a custom registry to register the metrics with the variable `customRegistry`. The reason we are creating a custom registry is to avoid registering the default Golang metrics. The default Golang metrics are registered with the default registry, which is used by the `promhttp` handler. By creating a custom registry, we can register our metrics and avoid the default Go metrics.

We created a new `gin` router and registered the `/metrics` endpoint before the middleware. The reason we are registering the `/metrics` endpoint before the middleware is to ensure that the metrics are collected before the middleware is executed. After that, we have created two endpoints: `/health` and `/v1/users`. The endpoint `/health` will return a JSON response with the message "Up and running!" and the endpoint `/v1/users` will return a JSON response with the message "Hello from /v1/users". Finally, we have started the server on port **8000**.

```go
// Custom metrics handler with custom registry
func PrometheusHandler() gin.HandlerFunc {
	h := promhttp.HandlerFor(customRegistry, promhttp.HandlerOpts{})
	return func(c *gin.Context) {
		h.ServeHTTP(c.Writer, c.Request)
	}
}

// Middleware to record incoming requests metrics
func RequestMetricsMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		path := c.Request.URL.Path
		c.Next()
		status := c.Writer.Status()
		if status < 400 {
			HttpRequestTotal.WithLabelValues(path, strconv.Itoa(status)).Inc()
		} else {
			HttpRequestErrorTotal.WithLabelValues(path, strconv.Itoa(status)).Inc()
		}
	}
}
```

Lastly, we have created a custom metrics handler with the custom registry. The `PrometheusHandler` function returns a `gin.HandlerFunc` value that is used to serve the metrics. The `RequestMetricsMiddleware` function is a middleware that records the incoming requests’ metrics. It gets the path of the request and the status code of the response and increments the corresponding metric.

The function `c.Next()` is used to call the next middleware in the chain. After that, we get the status code of the response and check if it is less than **400**. If it is, we increment the `HttpRequestTotal` metric. If it is greater than or equal to **400**, we increment the `HttpRequestErrorTotal` metric. The `WithLabelValues` function is used to set the label values for the metric. The `Inc()` function is used to increment the metric by **1**.

#### Run the Application

Now we have created the application. Let's run the application to check if it's registered the metrics correctly. Make sure you are in the root directory of the project and run the following command:

```bash
go run main.go
```

This command will start the server on port **8000**. You can check if the server is running by opening your browser and going to `http://localhost:8000/health`. You should see a JSON response with the message "**Up and running!**". If you can see the message, then the server is running fine. You can also check the `/v1/users` endpoint by going to `http://localhost:8000/v1/users`. You should see a JSON response with the message "**Hello from /v1/users**".

Now, let's check if the metrics are registered correctly. You can do that by going to `http://localhost:8000/metrics`. You will see similar output like this:

```sh
# HELP api_http_request_error_total Total number of errors returned by the API
# TYPE api_http_request_error_total counter
api_http_request_error_total{path="/",status="404"} 1
api_http_request_error_total{path="//v1/users",status="404"} 1
api_http_request_error_total{path="/favicon.ico",status="404"} 1
# HELP api_http_request_total Total number of requests processed by the API
# TYPE api_http_request_total counter
api_http_request_total{path="/health",status="200"} 2
api_http_request_total{path="/v1/users",status="200"} 1
```

You will see the metrics that we have defined in the code. The `api_http_request_total` metric will show the total number of requests processed by the API and the `api_http_request_error_total`. The metric will show the total number of errors returned by the API. You can also see the labels for both metrics: `path` and `status`. The label `path` will contain the path of the request and the label `status` will contain the status code of the response.

This validates that our application is working fine and the metrics are registered correctly. Now we will be creating a Dockerfile to run the application in a Docker container. Later we will also be using Docker Compose to run the application and the monitoring stack together.

### Dockerize the Application

In the root directory of the project, create a new file called `Dockerfile`, and add the following code to it:

```dockerfile
FROM golang:1.24-alpine AS builder
# Set environment variables
ENV CGO_ENABLED=0 \
    GOOS=linux \
    GOARCH=amd64
# Set working directory inside the container
WORKDIR /build
# Copy go.mod and go.sum files for dependency installation
COPY go.mod go.sum ./
# Download dependencies
RUN go mod download
# Copy the entire application source
COPY . .
# Build the Go binary
RUN go build -o /app .
# Final lightweight stage

FROM alpine:3.17 AS final
# Copy the compiled binary from the builder stage
COPY --from=builder /app /bin/app
# Expose the application's port
EXPOSE 8000
# Run the application
CMD ["bin/app"]
```

#### Understanding the Dockerfile

Let's understand the Dockerfile. We will be using a multi-stage build to create a lightweight and secure Docker image. The multi-stage build allows us to separate the build environment from the runtime environment, which results in a smaller final image size. This is especially useful for Go applications, as we can build a static binary and then copy it to a minimal base image.

1. **Build stage**:
    

```dockerfile
FROM golang:1.24-alpine AS builder
# Set environment variables
ENV CGO_ENABLED=0 \
    GOOS=linux \
    GOARCH=amd64
# Set working directory inside the container
WORKDIR /build
# Copy go.mod and go.sum files for dependency installation
COPY go.mod go.sum ./
# Download dependencies
RUN go mod download
# Copy the entire application source
COPY . .
# Build the Go binary
RUN go build -o /app .
```

This stage uses the official Golang Alpine image as the base and sets the necessary environment variables. It also sets the working directory inside the container, copies the `go.mod` and `go.sum` files for dependency installation, downloads the dependencies, copies the entire application source, and builds the Go binary.

We use the `golang:1.24-alpine` image as the base image for the build stage. The `CGO_ENABLED=0` environment variable disables CGO, which is useful for building static binaries. We also set the `GOOS` and `GOARCH` environment variables to `linux` and `amd64`, respectively, to build the binary for the Linux platform.

2. **Final stage**:
    

```dockerfile
# Final lightweight stage
FROM alpine:3.17 AS final
# Copy the compiled binary from the builder stage
COPY --from=builder /app /bin/app
# Expose the application's port
EXPOSE 8000
# Run the application
CMD ["bin/app"]
```

This stage uses the official Alpine image as the base and copies the compiled binary from the build stage. It also exposes the application's port and runs the application.

We use the `alpine:3.17` image as the base image for the final stage. We copy the compiled binary from the build stage to the final image. We expose the application's port using the `EXPOSE` instruction and run the application using the `CMD` instruction.

Apart from the multi-stage build, the Dockerfile also follows best practices such as using the official images, setting the working directory, and copying only the necessary files to the final image. We can further optimise the Dockerfile by other best practices.

#### Build the Docker Image

Let's build and run the Docker image. In the root directory of the project, run the following command:

```bash
docker build -t go-prom-monitor .
```

Now that the image is built, we can run the Docker container. Run the following command to run the Docker container:

```bash
docker run -d -p 8000:8000 --name go-prom-monitor go-prom-monitor
```

Now, like we did before, you can check if the server is running by opening your browser and going to `/health` and `/v1/users`. You should see the same JSON response as before. You can also check the `/metrics` endpoint by going to `http://localhost:8000/metrics`. You should see the same metrics as before.

If you can see the same metrics, then our application inside the Docker container is running as expected. And we are good to go with the next step. Now we will be creating a Docker Compose file to run the application and the monitoring stack together.

### Connecting the Application with Prometheus and Grafana

Before jumping into the Docker Compose file, why even we are bothering to use Docker Compose? We can run Prometheus and Grafana separately and connect them to the application. But it's all manual, and there can be chances of errors. So, using Docker Compose, we can convert all the services into a single command and obtain more Infrastructure as code. This will help us in the future to scale the application and add more services to it.

Let's get into it.

In the root directory of the project, create a new file called `compose.yml` (Yes, the new conversion is **compose.yml**. You are welcome.) and add the following code to it:

```yaml
services:
  api:
    container_name: go-api
    build:
      context: .
      dockerfile: Dockerfile
    image: go-api:latest
    ports:
      - 8000:8000
    networks:
      - go-network
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8080/health"]
      interval: 30s
      timeout: 10s
      retries: 5
    develop:
      watch:
        - path: .
          action: rebuild
      
  prometheus:
    container_name: prometheus
    image: prom/prometheus:v2.55.0
    volumes:
      - ./Docker/prometheus.yml:/etc/prometheus/prometheus.yml
    ports:
      - 9090:9090
    networks:
      - go-network
  
  grafana:
    container_name: grafana
    image: grafana/grafana:11.3.0
    volumes:
      - ./Docker/grafana.yml:/etc/grafana/provisioning/datasources/datasource.yaml
      - grafana-data:/var/lib/grafana
    ports:
      - 3000:3000
    networks:
      - go-network
    environment:
      - GF_SECURITY_ADMIN_USER=admin
      - GF_SECURITY_ADMIN_PASSWORD=password

volumes:
  grafana-data:

networks:
  go-network:
    driver: bridge
```

Also, create a new directory `Docker` in the root directory of the project. Inside the `Docker` directory, create two new files called `prometheus.yml` and `grafana.yml`.

Add the following code to the `prometheus.yml` file:

```yaml
global:
	scrape_interval: 10s
	evaluation_interval: 10s
scrape_configs:
	- job_name: myapp
		static_configs:
			- targets: ["api:8000"]
```

And add the following code to the `grafana.yml` file:

```yaml
apiVersion: 1
datasources:
- name: Prometheus (Main)
	type: prometheus
	url: http://prometheus:9090
	isDefault: true
```

We will understand why we have created the `Docker` directory and the `prometheus.yml` and `grafana.yml` files in the next section. For clarity, the directory structure of the project should look like this:

```bash
├── Docker
│   ├── grafana.yml
│   └── prometheus.yml
├── Dockerfile
├── compose.yml
├── go.mod
├── go.sum
└── main.go
```

#### Understanding the Docker Compose File

The Docker Compose file consists of three services:

* **Golang application service**: This service builds the Golang application using the Dockerfile and runs it in a container. It exposes the application's port `8000` and connects to the `go-network` network. It also defines a health check to monitor the application's health. We have also used `healthcheck` to monitor the health of the application. The health check runs every 30 seconds and retries 5 times if the health check fails. The health check uses the `curl` command to check the `/health` endpoint of the application. Apart from the health check, we have also added a `develop` section to watch the changes in the application's source code and rebuild the application using the Docker Compose Watch feature.
    
* **Prometheus service**: This service runs the Prometheus server in a container. It uses the official Prometheus image `prom/prometheus:v2.55.0`. It exposes the Prometheus server on a port `9090` and connects to the `go-network` network. We have also mounted the `prometheus.yml` file from the `Docker` directory that is present in the root directory of our project. The `prometheus.yml` file contains the Prometheus configuration to scrape the metrics from the Golang application. This is how we connect the Prometheus server to the Golang application.
    

```yaml
global:
  scrape_interval: 10s
  evaluation_interval: 10s

scrape_configs:
  - job_name: myapp
    static_configs:
      - targets: ["api:8000"]
```

In the `prometheus.yml` file, we have defined a job `myapp` to scrape the metrics from the Golang application. The `targets` field specifies the target to scrape the metrics from. In this case, the target is the Golang application running on port `8000`. The `api` is the service name of the Golang application in the Docker Compose file. The Prometheus server will scrape the metrics from the Golang application every 10 seconds.

* **Grafana service**: This service runs the Grafana server in a container. It uses the official Grafana image `grafana/grafana:11.3.0`. It exposes the Grafana server on a port `3000` and connects to the `go-network` network. We have also mounted the `grafana.yml` file from the `Docker` directory that is present in the root directory of your project. The `grafana.yml` file contains the Grafana configuration to add the Prometheus data source. This is how we connect the Grafana server to the Prometheus server. In the environment variables, we have set the Grafana admin user and password, which will be used to log in to the Grafana dashboard.
    

```yaml
apiVersion: 1
datasources:
- name: Prometheus (Main)
  type: prometheus
  url: http://prometheus:9090
  isDefault: true
```

In the `grafana.yml` file, we have defined a Prometheus data source named `Prometheus (Main)`. The `type` field specifies the type of the data source, which is `prometheus`. The `url` field specifies the URL of the Prometheus server to fetch the metrics from. In this case, the URL is `http://prometheus:9090`. `prometheus` is the service name of the Prometheus server in the Docker Compose file. The `isDefault` field specifies whether the data source is the default data source in Grafana.

Apart from the services, the Docker Compose file also defines a volume `grafana-data` to persist the Grafana data and a network `go-network` to connect the services. We have created a custom network `go-network` to connect the services. The `driver: bridge` field specifies the network driver to use for the network.

### Running the services with Docker Compose

Now that we have created the Docker Compose file, we can run the services using Docker Compose. In the root directory of the project, run the following command:

```bash
docker compose up
```

We will see a similar output in the terminal:

```console
 ✔ Network go-prometheus-monitoring_go-network  Created                                                           0.0s 
 ✔ Container grafana                            Created                                                           0.3s 
 ✔ Container go-api                             Created                                                           0.2s 
 ✔ Container prometheus                         Created                                                           0.3s 
Attaching to go-api, grafana, prometheus
go-api      | [GIN-debug] [WARNING] Creating an Engine instance with the Logger and Recovery middleware already attached.
go-api      | 
go-api      | [GIN-debug] [WARNING] Running in "debug" mode. Switch to "release" mode in production.
go-api      |  - using env:     export GIN_MODE=release
go-api      |  - using code:    gin.SetMode(gin.ReleaseMode)
go-api      | 
go-api      | [GIN-debug] GET    /metrics                  --> main.PrometheusHandler.func1 (3 handlers)
go-api      | [GIN-debug] GET    /health                   --> main.main.func1 (4 handlers)
go-api      | [GIN-debug] GET    /v1/users                 --> main.main.func2 (4 handlers)
go-api      | [GIN-debug] [WARNING] You trusted all proxies, this is NOT safe. We recommend you to set a value.
go-api      | Please check https://pkg.go.dev/github.com/gin-gonic/gin#readme-don-t-trust-all-proxies for details.
go-api      | [GIN-debug] Listening and serving HTTP on :8000
prometheus  | ts=2025-03-15T05:57:06.676Z caller=main.go:627 level=info msg="No time or size retention was set so using the default time retention" duration=15d
prometheus  | ts=2025-03-15T05:57:06.678Z caller=main.go:671 level=info msg="Starting Prometheus Server" mode=server version="(version=2.55.0, branch=HEAD, revision=91d80252c3e528728b0f88d254dd720f6be07cb8)"
grafana     | logger=settings t=2025-03-15T05:57:06.865335506Z level=info msg="Config overridden from command line" arg="default.log.mode=console"
grafana     | logger=settings t=2025-03-15T05:57:06.865337131Z level=info msg="Config overridden from Environment variable" var="GF_PATHS_DATA=/var/lib/grafana"
grafana     | logger=ngalert.state.manager t=2025-03-15T05:57:07.088956839Z level=info msg="State
.
.
grafana     | logger=plugin.angulardetectorsprovider.dynamic t=2025-03-15T05:57:07.530317298Z level=info msg="Patterns update finished" duration=440.489125ms
```

The services will start running, and we can access the Golang application at `http://localhost:8000`, Prometheus at `http://localhost:9090/health`, and Grafana at `http://localhost:3000`. We should see the three services running: `go-api`, `prometheus`, and `grafana`.

We can also check the services logs using the `docker compose logs` command. This will show us the logs of all the services running in the Docker Compose file. We can also check the logs of a specific service by using the `docker compose logs <service-name>` command. For example, to check the logs of the Golang application, we can run the following command:

```bash
docker compose logs api
```

That was it for running the services using Docker Compose. Next, we will be looking at how we can develop the application using Docker Compose.

### Developing the Application using Docker Compose

Now, if we make any changes to our Golang application locally, it needs to reflect in the container, right? To do that, one approach is to use the `--build` flag in Docker Compose after making changes in the code. This will rebuild all the services that have the `build` instruction in the `compose.yml` file, in our case, the `api` service (Golang application).

```console
docker compose up --build
```

But this is not the best approach. This is not efficient. Every time we make a change in the code, we need to rebuild manually. This is not a good flow for development.

The better approach is to use Docker Compose Watch. Docker, almost a year back, added a new feature called Docker Compose Watch. This feature allows watching the changes in the application's source code and rebuilding/restarting the application using Docker Compose. More like a hot reload feature. And if you look closely, we have added a `develop` section in the Docker Compose file.

```yaml
services:
  api:
    container_name: go-api
    build:
      context: .
      dockerfile: Dockerfile
    image: go-api:latest
    ports:
      - 8000:8000
    networks:
      - go-network
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8080/health"]
      interval: 30s
      timeout: 10s
      retries: 5
    develop: # This is the develop section
      watch:
        - path: .
          action: rebuild
```

Now, if we modify our `main.go` or any other file in the project, the `api` service will be rebuilt automatically. We will see the following output in the terminal:

```bash
Rebuilding service(s) ["api"] after changes were detected...
[+] Building 8.1s (15/15) FINISHED                                                                                                        docker:desktop-linux
 => [api internal] load build definition from Dockerfile                                                                                                  0.0s
 => => transferring dockerfile: 704B                                                                                                                      0.0s
 => [api internal] load metadata for docker.io/library/alpine:3.17                                                                                        1.1s
  .                             
 => => exporting manifest list sha256:89ebc86fd51e27c1da440dc20858ff55fe42211a1930c2d51bbdce09f430c7f1                                                    0.0s
 => => naming to docker.io/library/go-api:latest                                                                                                          0.0s
 => => unpacking to docker.io/library/go-api:latest                                                                                                       0.0s
 => [api] resolving provenance for metadata file                                                                                                          0.0s
service(s) ["api"] successfully built
```

That's it for the development flow. Next, we will be looking at how to access the Grafana dashboard and visualise the metrics that we are registering in the Golang application.

### Accessing the Grafana Dashboard

Now that we have our application running, head over to the Grafana dashboard to visualise the metrics we are registering. Open your browser and navigate to `http://localhost:3000`. We will be greeted with the Grafana login page. The login credentials are the ones provided in the Compose file.

Once we are logged in, we can create a new dashboard. While creating a dashboard, you will notice that the default data source is `Prometheus`. This is because we have already configured the data source in the `grafana.yml` file.

![](/blog-images/monitoring-go-app-with-grafana-prometheus/image-01.png)

We can use different panels to visualise the metrics. This guide doesn't go into details of Grafana. We can refer to the [Grafana documentation](https://grafana.com/docs/grafana/latest/) for more information. There is a Bar Gauge panel to visualise the total number of requests from different endpoints. We used the `api_http_request_total` and `api_http_request_error_total` metrics to get the data.

![](/blog-images/monitoring-go-app-with-grafana-prometheus/image-02.png)

We created this panel to visualise the total number of requests from different endpoints to compare the successful and failed requests. For all the good requests, the bar will be green, and for all the failed requests, the bar will be red. Plus, it will also show from which endpoint the request is coming, whether it's a successful request or a failed request. If you want to get the dashboard JSON, you can visit this repo [here](https://github.com/Pradumnasaraf/Blog-Demo/tree/main/go-prometheus-monitoring). You will also find the complete code for the Golang application, Dockerfile and Docker Compose file we created in this blog.

That's it! You have successfully created a Golang application that is monitored using Prometheus and Grafana. You have also learned how to Dockerize the application and run it using Docker Compose. You can now use this setup to monitor your Golang applications in production.

That’s it about the Blog. As always, I'm glad you made it to the end—thank you so much for your support. I regularly share tips on [**Twitter**](https://x.com/pradumna_saraf). You can connect with me there.