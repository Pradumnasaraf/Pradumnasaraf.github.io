---
title: 'Building an AI-powered CLI with Golang and Google Gemini'
excerpt: 'Learn to build an AI-powered CLI with Golang and Google''s Gemini API from scratch in this comprehensive guide'
date: '2024-08-27'
author: 'Pradumna Saraf'
category: 'ai'
tags: ['ai', 'go', 'golang', 'google-gemini']
thumbnail: 'https://cdn.hashnode.com/res/hashnode/image/upload/v1724687461679/9fe91573-1626-4de9-a4e4-2d0dad7f2a9a.png'
draft: false
---


I recently built an AI-powered CLI with Golang named GenCLI, from which you can ask questions in text format or give it an image and ask for details about it from the terminal. If that is something that sounds interesting to you, this blog is for you. In this, we build a CLI completely from scratch and give it AI power using Google's Gemini API. In case you want to check out my GenCLI here is the [link](https://github.com/Pradumnasaraf/gencli) Yes, it's open source.

### Prerequisite

* Familiarity with Golang
    
* Tried [Cobra](https://pkg.go.dev/github.com/spf13/cobra) Package
    

### Getting started

Let's go step by step and understand each process.

Create a folder and open it in your favourite IDE/Editor. I am using VS Code and named the folder `go-ai`. Now initialize the project by running the command `go mod init <path>` command. The path here is the module path. If we publish a module (the project), this must be a path from which our module can be downloaded by Go tools. This will be our GitHub repo link. We can create a GitHub repo later but we can give a link now. For me, it will look like this:

```sh
  go mod init github.com/Pradumnasaraf/go-ai
```

Once you are done with that a `go.mod` will be created.

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/r5lf3rwm8nz4yz32rsig.png)

Although we can create and do everything manually for building CLI. But the great thing about Cobra Package is that it has its CLI that generates structure, generates files and installs packages for the CLI. This will help us speed up the process and less errors. To install the Cobra CLI tool use the below command:

```sh
 go install github.com/spf13/cobra-cli@latest
```

Once you have done that, you can check if the tool is installed by tying `cobra-cli` in the terminal and you will get a list of available. Now run `cobra-cli init` to set up the project. After running it will automatically create a `cmd` folder, `go.sum`, and `main.go` file. To test if it's working or not run `go run main.go`. You will see an output in the terminal about the CLI (like the screenshot below)

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/j7d603r0n6i8zfpzz8vh.png)

To communicate and use Google's Gemini API first we need to install the Gemini Golang SKD package, to do that execute the below command.

```sh
go get github.com/google/generative-ai-go
```

Now like other APIs, we need an API Key. To get that head over here [https://aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey) and get that. It's FREE and you get that in 30 Seconds. Once you get the API key set is an environment variable by executing the following command:

```sh
export GEMINI_API_KEY=<YOUR_API_KEY>
```

The issue with this method is that the environment variable will only exist for the current session as you close the terminal it's gone. To avoid this issue add the **export** command to a shell configuration file, such as .bashrc, .bash\_profile, or .zshrc (depending on your shell). In this way, you can access the CLI from anywhere in the system.

Now, it's time to create a sub-command for the CLI instead of writing logic directly to `root.go`. The reason to do that is if in future we want to include more functionality and more sub-commands, we can simply add by adding more sub-commands and not blocking the root command. If you don't understand this, don't worry follow along, things will get clear.

To create a sub-command Cobra CLI provides an `add` command to create it. To do that, execute the below command. Here `search` will become a sub-command. You can choose whatever you like.

```sh
cobra-cli add search
```

Once you execute it, a new file will be created under the `cmd` directory with all of these pre-populated codes. In the code, we are initializing a variable `searchCmd` to a pointer to a `cobra.Command` struct and providing value for the fields like, sub-command name, use, etc. The function in `Run:` will get triggered whenever we execute the sub-command. Also if you see we are adding a command (sub-command) for the root command in the init function. This is what the complete code should be like.

```go
package cmd

import (
	"fmt"

	"github.com/spf13/cobra"
)

// searchCmd represents the search command
var searchCmd = &cobra.Command{
	Use:   "search",
	Short: "A brief description of your command",
	Long: `A longer description that spans multiple lines and likely contains examples`,
	Run: func(cmd *cobra.Command, args []string) {
		fmt.Println("search called")
	},
}

func init() {
	rootCmd.AddCommand(searchCmd)
}
```

To check if the sub-command "search is working as expected now run the CLI with the "search" command, and you will see "search called" printed in your terminal.

```sh
go run main.go search
```

Now, let's work on the API side of things. Let's Import packages for Google Gemini API as well as other necessary for logging and os level tasks. Here is a complete list.

```go
import (
	"context"
	"log"
	"os"

	"github.com/google/generative-ai-go/genai"
	"github.com/spf13/cobra"
	"google.golang.org/api/option"
)
```

Then let's add a function called `getResponse`. This function will help us communicate with the Gemini API, get the response and print it. Also, if you see we have hardcoded the Prompt text - "Write a story about a AI and magic", don't worry, we will change that but let's first make it work :). This is a complete function code add it below your init function. You will find the same started code on the Gemini website.

```go

func getResponse() {

	ctx := context.Background()
	client, err := genai.NewClient(ctx, option.WithAPIKey(os.Getenv("GEMINI_API_KEY")))
	if err != nil {
		log.Fatal(err)
	}
	defer client.Close()

	model := client.GenerativeModel("gemini-1.5-flash")
	resp, err := model.GenerateContent(ctx, genai.Text("Write a story about a AI and magic"))
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println(resp.Candidates[0].Content.Parts[0])
}
```

Now let's add `getResponse` function to the in the field `Run:` function. So that when we run the sun command it will call `getResponse` function. Now the code will look like this.

```go

package cmd

import (
	"context"
	"fmt"
	"log"
	"os"

	"github.com/google/generative-ai-go/genai"
	"github.com/spf13/cobra"
	"google.golang.org/api/option"
)

// searchCmd represents the search command
var searchCmd = &cobra.Command{
	Use:   "search",
	Short: "A brief description of your command",
// Added the getResponse() function
	Run: func(cmd *cobra.Command, args []string) {
		getResponse()
	},
}

func init() {
	rootCmd.AddCommand(searchCmd)
}

func getResponse() {

	ctx := context.Background()
	client, err := genai.NewClient(ctx, option.WithAPIKey(os.Getenv("GEMINI_API_KEY")))
	if err != nil {
		log.Fatal(err)
	}
	defer client.Close()

	model := client.GenerativeModel("gemini-1.5-flash")
	resp, err := model.GenerateContent(ctx, genai.Text("Write a story about a AI and magic"))
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println(resp.Candidates[0].Content.Parts[0])
}
```

If you getting a red squiggly line under the imported package names run `go mod tidy`. It will install the missing package and do a cleanup. Now, again execute the `go run main.go search`. This time you will get a response from the API for the Prompt we hardcoded, i.e, "Write a story about a AI and magic"

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/3zec813988mnmcuxkrhx.png)

In case you are encountering the below error check if your environment variable is set properly with the right name. You can check by executing the `printenv` command in your terminal and see if it's present there or not.

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/zqp61ccwtkvbmm1baj09.png)

Once everything is working, let’s make the prompt dynamic so that we don’t have to hardcode the prompt directly into the code and we provide it via the terminal.

To do that, add an `ARG:` field to the `searchCmd` struct so that the user at least needs to enter an argument after the sub-command. Also, we will modify the `getResponse` function to accept a slice of data because args will be in the slice format, and we will use the strings package to convert it into a sentence.

Lastly, replace the hardcoded text in `genai.Text()` with the `userArgs` variable we created to convert the slice into a sentence. This is how the complete code will look like; I have commented above on the changes we have to make for better understanding.

```go
package cmd

import (
	"context"
	"fmt"
	"log"
	"os"
	"strings" // import strings package

	"github.com/google/generative-ai-go/genai"
	"github.com/spf13/cobra"
	"google.golang.org/api/option"
)

var searchCmd = &cobra.Command{
	Use:   "search",
	Short: "A brief description of your command",
	Args:  cobra.MinimumNArgs(1), // Minimum 1 arg required
	Run: func(cmd *cobra.Command, args []string) {
		getResponse(args)
	},
}

func init() {
	rootCmd.AddCommand(searchCmd)
}

// Function can now accept slice parameter 
func getResponse(args []string) {
        // Creating a sentence out of a slice
	userArgs := strings.Join(args[0:], " ") 

	ctx := context.Background()
	client, err := genai.NewClient(ctx, option.WithAPIKey(os.Getenv("GEMINI_API_KEY")))
	if err != nil {
		log.Fatal(err)
	}
	defer client.Close()

	model := client.GenerativeModel("gemini-1.5-flash")
        // change the hardcoded text to userArgs variable
	resp, err := model.GenerateContent(ctx, genai.Text(userArgs))
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println(resp.Candidates[0].Content.Parts[0])
}
```

If you execute the `go run main search` now, it will give you an error message in the terminal saying at least one arg is required. This means our code is working perfectly.

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/ynpemexdoy4mgk79ljxw.png)

Now let's execute the command the right way giving it an argument - a prompt/question.

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/pxtvo82sifu6qrscnk5g.png)

As you can see, it provided us with the answer. We pass the prompt in quotes so that we can add special characters like "?", ".", etc. So here it is, a fully functional AI-powered CLI.

Now, if you want to publish the package so that your CLI can directly execute commands and be used from anywhere in the system, it’s very simple to do that. First, push your changes to GitHub and then head over to the URL [`https://pkg.go.dev/github.com/<repo-url>`](https://pkg.go.dev/github.com/<repo-url>). In my case, it would be [`https://pkg.go.dev/github.com/Pradumnasaraf/go-ai`](https://pkg.go.dev/github.com/Pradumnasaraf/go-ai). When you visit, you will see a request button; click on that to request adding the package to [`pkg.go.dev`](http://pkg.go.dev). Once you’re done, after a few hours, it will be on the website.

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/ph7rye15fgyttehdxv77.png)

Once it’s live, you can simply download the CLI by using the `go install` command:

```bash
go install <repo-url>
go install github.com/Pradumnasaraf/go-ai@latest
```

And directly use the CLI with commands like `go-ai`, `go-ai search`, etc. If you encounter the error saying `command not found: go-ai` after running it, you need to add `$GOPATH/bin` to your `$PATH` environment variable. Refer to [this guide](https://gist.github.com/Pradumnasaraf/ca6f9a0507089a4c44881446cdda4aa3) for that.

That's it for this blog. This was a little longer than the blogs I usually write. I'm glad you're still reading and made it to the end—thank you so much for your support. I sometimes share tips on [Twitter](https://x.com/pradumna_saraf). You can connect with me there.