---
title: 'How to Publish a Golang Package'
excerpt: 'Learn how to easily publish a Golang package and share your tool with the community'
date: '2024-09-20'
author: 'Pradumna Saraf'
category: 'golang'
tags: ['golang', 'opensource', 'package', 'cli']
thumbnail: 'https://cdn.hashnode.com/res/hashnode/image/upload/v1724571994026/5271d331-cceb-4a2e-933f-6f785e0f1d3f.png'
draft: false
---


Publishing a package is a good way to share your tool with the world. Someone can import the package and use it in their project, and achieve the functionality you have built. It's quite easy to publish a Golang package compared to other languages. We will do that in this blog. I recently published my GenCLI package you can check it out [here](https://pkg.go.dev/github.com/Pradumnasaraf/gencli).

For demo purposes, I have this [CLI project](https://github.com/Pradumnasaraf/Blog-Demo/tree/main/Go-AI). This AI-powered CLI. It provides you with the answers to your questions via the terminal, built with Cobra and Google Gemini API. Now this project is local, and the only way to run it is to go to the Root of the project and do `go run main.go` and then use sub-commands. It will work fine, but the issue here is that this is not reliable, every time, we need to go to the project root and run it, ideally, it should run from anywhere on the computer, just like other CLI tools. Plus, not everyone will do this much hassle to use it. So, this is why it's necessary, as well as important to publish the tools.

There can be multiple ways to name your package, but as we will host it on GitHub we will use the GitHub way. Make sure in your `go.mod` file your module name is the following convention - [`github.com/<username>/<repo-name`](http://github.com/<username>/<repo-name) `module-name>`, just like below.

One thing to note is that the module is a collection of Packages. We generally say Publishing a Module Not Packages, but to keep it simple we kept it that way.

```golang

module github.com/Pradumnasaraf/go-ai

go 1.22

require (
....
....
....

)
```

Now once everything is set push your code to GitHub. Make sure, you push the code to the same GitHub username and repo name you mentioned in the module.

Once you push the code to GitHub now it's time to publish your package, but before you do, here are a couple of best practices you should follow

* **License:** Have a license and try to place a minimal restriction on it so that it can easily be used, modified, and redistributed.
    
* **Documentation:** We can comment on the top of the package file to explain the functionality and golang takes this as general package documentation and shows it under the Package documentation section.
    
* **Tags:** Tagging is good when a person has a particular version of the package also tagged versions give predictable outcomes during builds. Tags should follow Semver. Also, try to release stable versions with `1.0.0` and above, this gives developers confidence.
    

Now to publish the package head over to the URL [`https://pkg.go.dev/github.com/<repo-url>`](https://pkg.go.dev/github.com/<repo-url>). In my case, it would be [`https://pkg.go.dev/github.com/Pradumnasaraf/go-ai`](https://pkg.go.dev/github.com/Pradumnasaraf/go-ai). When you visit, you will see a request button; click on that to request adding the package to [`pkg.go.dev`](http://pkg.go.dev). I will not because I don't want to publish this tool as it was just for a demo.

![Screenshot of go dev package website](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/i2jpp776zoudsy1wf6vh.png)

Once you’re done, after a few hours, it will be on the website. Once it’s live, you can download the CLI by using the `go install` command:

```bash
go install <repo-url>
go install github.com/Pradumnasaraf/go-ai@latest
```

That's it for this blog. I'm glad you're still reading and made it too. Thank you! I sometimes share tips on Golang on [Twitter](https://x.com/pradumna_saraf). You can connect with me there.