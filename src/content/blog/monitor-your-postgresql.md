---
title: 'Monitor your PostgreSQL performance with OpenTelemetry and OpenObserve'
excerpt: 'Monitor PostgreSQL with OpenTelemetry and OpenObserve for streamlined data collection and efficient analysis in a user-friendly interface'
date: '2024-09-29'
author: 'Pradumna Saraf'
category: 'postgresql'
tags: ['postgresql', 'opensource', 'databases', 'monitoring', 'devops', 'opentelemetry', 'prometheus', 'grafana']
thumbnail: '/blog-images/monitor-your-postgresql/thumbnail.png'
draft: false
---


Database monitoring is critical as it impacts the performance of the application, website, etc., which is serving it. It also helps us find the nuances and in-depth information about the processes happening so we can optimize and fine-tune it.

In this blog, we will see how, by using OpenTelemetry and OpenObserve, we can easily monitor the Database without having to set up a separate tool for logs, metrics, and traces (thanks to OpenTelemetry). In case you are wondering, what are OpenTelemetry and OpenObserve?

[OpenTelemetry](https://opentelemetry.io/) is a collection of APIs, SDKs, and tools. Use it to instrument, generate, collect, and export telemetry data like metrics, logs, and traces. To make it simpler: In general, when we have to get metrics, we use Prometheus, Elasticsearch for logs, Jaeger for traces, etc. So, OpenTelemetry has streamlined this process by providing a single set of APIs that can handle all these tasks.

Now, what will we do with all of the telemetry data we collected if we can't analyze them? This is where [OpenObserve](https://openobserve.ai/) comes into the picture. I can say it's Grafana on steroids. It provides a user-friendly UI (unlike Grafana) supporting SQL as its primary query language. Additionally, we support PromQL for querying metrics data, extending its versatility. One of the great features of OpenObserve is its built-in alerting mechanism, so you don't have to set it up yourself! Also, OpenObserve significantly lowers storage costs—reducing them to about 140 times less than Elasticsearch.

### Prerequisite

* Some experience with Postgres
    
* Worked with OpenTelemetry before
    
* OpenObserve Account
    

### Getting Started

For this demo, we will perform all the tasks in an Ubuntu environment. You can also do these in a Windows environment.

To get started, make sure you have the Postgres server running and accessible to connect. We are running Postgres on the same Ubuntu machine, so it is reachable at [`localhost:5432`](http://localhost:5432). We will first create a user `myuser` and set a password as `mypassword` in the Postgres DB. You can set whatever you like. Make sure you remember them because we need them in the upcoming steps. To create that, we can enter into the Postgres shell and execute:

```plaintext
CREATE ROLE myuser WITH LOGIN PASSWORD 'mypassword';
```

That was all about the changes in the DB.

Now let's install the Otel Collector. Here is an important point to **NOTE**: the default Otel Collector doesn't have all the receivers, including the Postgres one we are going to use to collect data from the DB. It has support for receivers like Kafka, Prometheus, Jaeger, etc. So, instead of using [opentelemetry-collector](https://github.com/open-telemetry/opentelemetry-collector), we are going to use [opentelemetry-collector-contrib](https://github.com/open-telemetry/opentelemetry-collector-contrib).

Run the command below to install the opentelemetry-collector-contrib for Debian. Make sure you check that you are using the latest version.

```bash
wget https://github.com/open-telemetry/opentelemetry-collector-releases/releases/download/v0.106.1/otelcol-contrib_0.106.1_linux_amd64.deb
sudo dpkg -i otelcol-contrib_0.106.1_linux_amd64.deb
```

After doing that, we can check the status of the Otel Collector (from now on, we will use the short form for opentelemetry-collector / opentelemetry-collector-contrib) by executing the command below:

```bash
sudo systemctl status otelcol-contrib
```

You will get an output similar to the screenshot below:

![terminal screenshot](/blog-images/monitor-your-postgresql/terminal-screenshot.png)

Now, the above logs are for the default configuration, which can be found in `/etc/otelcol-contrib/config.yaml`.

![Image description](/blog-images/monitor-your-postgresql/image-description.png)

We have to change the default configuration accordingly so that we can export all the data to OpenObserve to analyze it. We will use the configuration below. Let's break it down and understand it:

```yaml
receivers:
  postgresql:
    endpoint: localhost:5432
    transport: tcp
    username: myuser
    password: mypassword
    databases:
      - postgres
    connection_pool:
      max_idle_time: 10m
      max_lifetime: 0
      max_idle: 2
      max_open: 5

processors:
  memory_limiter:
    check_interval: 1s
    limit_percentage: 75
    spike_limit_percentage: 15
  batch:
    send_batch_size: 10000
    timeout: 10s

exporters:
  otlphttp/openobserve:
    endpoint: https://api.openobserve.ai/api/pradumna****************NhbsQveI
    headers:
      Authorization: Basic cHJh************************UzgxQjNlMDQ=
      stream-name: default

service:
  pipelines:
    metrics:
      receivers: [postgresql]
      processors: [memory_limiter, batch]
      exporters: [otlphttp/openobserve]
```

If you have worked with OpenTelemetry before, you know in general that you will have four sections in every configuration file—Receivers, Processors, Exporters, and Connectors—and then enable it using the pipelines within the Service section.

Under the **receivers** section, we are using `postgresql`. There can be other receivers too. Make sure you change the `endpoint`, `username`, and `password` accordingly to the ones you created. In the `databases` section, I am using the default one that comes with it—`postgres`. If you have something different or multiple databases, list them. Also, we are hardcoding the credentials, but you can use the security measures you prefer to access them.

The **processors** section is pretty simple. Its role is to take the data collected by receivers and then modify, transform, and process the data according to the rules or settings defined before sending it to the exporters. Data processing happens according to the rules or settings defined for each processor:

```yaml
receivers:
  postgresql:
    endpoint: localhost:5432
    transport: tcp
    username: myuser
    password: mypassword
    databases:
      - postgres
    connection_pool:
      max_idle_time: 10m
      max_lifetime: 0
      max_idle: 2
      max_open: 5

processors:
  memory_limiter:
    check_interval: 1s
    limit_percentage: 75
    spike_limit_percentage: 15
  batch:
    send_batch_size: 10000
    timeout: 10s
```

Under the **exporters** section, we are going to use the `otlphttp/openobserve` exporter. This will send all the telemetry data to OpenObserve. To get the endpoint and the token, head over to OpenObserve. Once you log in and your dashboard is open, click on the Ingestion button from the sidebar and click on Traces (OpenTelemetry).

![Image description](/blog-images/monitor-your-postgresql/image-description-1.png)

The **service** section is pretty standard: it concludes which components are enabled in the Collector based on the configuration found in the receivers, processors, exporters, and extensions sections. If a component is configured but not defined within the service section, then it’s not enabled.

```yaml
exporters:
  otlphttp/openobserve:
    endpoint: https://api.openobserve.ai/api/pradumna****************NhbsQveI
    headers:
      Authorization: Basic cHJh************************UzgxQjNlMDQ=
      stream-name: default

service:
  pipelines:
    metrics:
      receivers: [postgresql]
      processors: [memory_limiter, batch]
      exporters: [otlphttp/openobserve]
```

After you save the above configuration, you need to restart the collector to apply those changes, as it will still be running on the old configuration. To restart, execute the command below:

```bash
sudo systemctl restart otelcol-contrib
```

You can again execute the status command to check if the collector is working as expected and doesn't throw any errors:

```bash
sudo systemctl status otelcol-contrib
```

Now we are done with all the technical setup, and we can head over to the OpenObserve Dashboard to monitor the collected data by creating the dashboard. Once you are on the dashboard, click on the Streams button from the right sidebar. If everything is set up and running, you will get all your streams of collected data on the screen. If you don't see it, click the **Refresh Stats** button. In case you have multiple ingestions, you can search for `postgres` from the search bar.

![Image description](/blog-images/monitor-your-postgresql/image-description-2.png)

To set up a Dashboard, click on the dashboard button just below the Streams button, then click on "New Dashboard" and give it a name and description.

![Image description](/blog-images/monitor-your-postgresql/image-description-3.png)

After this, a new window will open up. Click on **Add Panel** and this page will open. Now you can add a variety of panels to your dashboard depending on the type of data (in the stream we have) and the way you want to plot them.

![Image description](/blog-images/monitor-your-postgresql/image-description-4.png)

This is what my dashboard looks like now after I have added some panels.

![Image description](/blog-images/monitor-your-postgresql/image-description-5.png)

There is a lot more you can do with the dashboard. Check out [this video](https://www.youtube.com/watch?v=kjUvXQdL798) on how to create great OpenObserve dashboards.

That’s about it for this blog. I hope you learned how to monitor your PostgreSQL performance with OpenTelemetry and OpenObserve. Thanks for reading!

### Troubleshooting

If you encounter any error logs in the Otel Collector, make sure you cross-check the YAML config for the collector and verify that the collector can properly authenticate with the PostgreSQL database. You can check that by reviewing the PostgreSQL logs.