---
title: 'Share your Docker Compose app logs remotely'
excerpt: 'Share your Docker Compose app logs remotely'
date: '2024-01-11'
author: 'Pradumna Saraf'
category: 'docker'
tags: ['docker', 'opensource', 'devops', 'docker-compose']
thumbnail: 'https://cdn.hashnode.com/res/hashnode/image/upload/v1704965574688/98637723-1ab4-4766-8ece-b307896ec331.png'
draft: false
---


Logs are crucial for understanding the inner workings of an application, whether it's to ensure it performs as expected or to help in debugging when encountering errors.

However, consider a scenario where one of your teammates is working and developing locally, experiencing an error with no way to access those logs. The typical approach often involves exchanging screenshots of the terminal or branching stages, right? Unfortunately, this process is time-consuming and doesn't offer a clear picture, especially for complex applications. Furthermore, there's no potential way to debug by executing necessary commands.

It's a pretty common issue causing some friction in the development team collaboration and aiding in debugging. To address this, we at [Livecycle](https://livecycle.io/?utm_source=hashnode&utm_medium=article&utm_campaign=livecycle) came up with our [Livecycle Docker Extension](https://hub.docker.com/extensions/livecycle/docker-extension). With this extension, you can easily share your local work by flipping a toggle and grabbing a shareable URL. Then, share it with the person who is trying to debug you on Google Meet, Slack Huddle, or Zoom (that's all we do, correct? :) ). With that Preview URL, they can access and see the preview of the work you are doing, and it gives them access to the Livecycle Dashboard, which contains all these great collaboration tools like the remote terminal, logging, etc.

Is that too much to digest? Let me show you a quick demo.

Make sure you have Docker Desktop installed. Go to the extension marketplace, search for Livecycle, and install it. Or click [here](https://hub.docker.com/extensions/livecycle/docker-extension)

![Docker Desktop](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/h7guq1p6kuu3ri8o639v.png)

Once the extension is installed, open it, and you'll get the option to log in with GitHub or Google. It creates a profile that helps you add collaborators. After that, you'll see a screen like this.

![Docker Desktop](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/d8827qcn9nmffrv10liu.png)

Now, run a Docker Compose application on your system. As soon as you do, it'll pop up in the extension. Turn on the toggle as shown in the screenshot below to get the preview URL. You can choose between public and private based on your needs.

![Docker Desktop](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/y3g1g0j7vba0nl0hrdzo.png)

Now, once you are done with the above steps and you have the URL, you can invite people to your teammates so that they can access the terminal. You can invite them by clicking on the Invite (visible in point 1). Once you invite the people, you can click the open window button visible in point 2) to access the dashboard where you have all the terminal logs, etc.

![Docker Desktop](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/zrwiwh80axd749playv1.png)

Once you open the Livecycle Dashboard, select your environment (in my case, DevOps), and you will see the "Logs" option. Click on it to access logs for each service. Additionally, next to the logs, you will find a terminal to help in debugging your application. You can invite more people directly from the Dashboard itself.

![Livecycle Dashboard](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/qd7pzj3haf6qoaacmw4e.png)

Now, you can easily debug and collaborate with any number of people around the world. We are also soon adding the commenting feature (like the screen below) so that you can have a conversation in one place to involve non-technical people like designers and marketers, enabling them to provide feedback and bring more transparency. This way, a senior can never blame a junior if they asked for something and it hasn't been done.


![Livecycle Dashboard message feature](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/x6x4azyxhmik747kcp93.png)

Join our [Livecycle community](https://community.livecycle.io/?utm_source=hashnode&utm_medium=article&utm_campaign=livecycle) to stay informed