# Discord-ChatGPT-AI-BOT v14 03/30/2023
This is my fully built code (my first ever coding project with no prior experiance!) 

## <a> Description=Description </a>

This Bot was designed with the intented functionality of Chat-GPT model 'text-davinci-003'. This bot's functionality mirrors the same text model and reply functions as what you use in the browser version.

I've always wanted to learn how to code, so I decided that I'd start with a Discord Bot as my first project. Originally start by trying to build a Music Bot, but I failed it pretty miserably, so I decided to move on. This project took me about 2 and a half days. This is going to be a template I'll be using to make more complex ChatGPT Discord Bots. End goal is to have it be able to interpret audio into functions, and the functions to extend to Moderation, Music playing, Image fetching, HTTPS fetching, and much more! Come again soon to see the updates!

### Getting Started
I'll list out all of the dependacies below, but two things that I want to highlight. This was designed with a .env file for Token transmission. Second is that this is the latest version of Discords API (v14). A lot of the documentation you're going to run into if you're new will show you out dated code. For the most up to terms reference this [artical](https://discordjs.guide/additional-info/changes-in-v14.html#before-you-start) and **MAKE SURE** if you look at anything from *stackoverflow* that you check the date it was posted. 

### Dependancies
`1` **Console Code Installs**

 - You'll need to download your package.json to get started
  - `npm init -y` 

 - v14 requires Node 16.9 or higher to use, so make sure you're up to date. To check your Node version, use node -v in your terminal or command prompt.
   - install the latest stable version of Node: `npm i -g` 

 - v14 now has all packages needed inside of the discord.js file, so no need to download @discordjs/builders, @discordjs/formatters, @discordjs/rest, or discord-api-types. If you currently have those installed, you will want to remove those before continuing on with the project.
  - Uninstall the above packages: `npm uninstall @discordjs/builders @discordjs/formatters @discordjs/rest discord-api-types`

  -I used .env file to be able to securely house all of my Tokens. There are other ways to do it, but this is the most simple and secure way to do it that I've found.
    - install .env capability: `dotenv`

`2` **OpenAI

- First, you have to register for an account with OpenAI if you don't have one already. This is how you're going to get access to your API Token, and also your Organization Token. Secondly, you are probably going to want to add payment information because you get a preset amount of about 50 tokens per minute if I remember correctly. I saw that when I first started the project, but don't see any documentation at the moment. The problem is that 1000 tokens is roughly 750 English words. So if you set your token limit to 50, or leave it maxed out with the free account, that leaves you with about 13-15 words per minute. If you and your buddies are using this, that won't be enough. With the `text-davinci-003` version I'm using in the code, I've spent roughly $0.12 a day with my 5 buddies abusing it. Not bad.

## Help

You should be able to copy and paste my code verbatum to get the functionality of what it's designed for, which is given in the [Description](#Description). But things to take note of that may cause problems are as follows:

  - Exceeding the Token Amount causing your OpenAI API call to fail
    - If that's the case you will most likely want to add funding to your account.
  
  - OpenAI API call taking longer than 3 seconds 
    - This is the max amount of time that Discord will wait to receive a response. If it doesn't receive it within that time, it believes that the service isn't work, and it kills the process. To counter act this, if you reference my code, **`await interaction.deferReply();`** The Defer keyword delays the execution of a function until the surrounding function returns.
  
  - Up to date version of `Discord.js`
    - **I cannot stress this enough. If you have old packages installed, or are not using upto date Objects that will lead to serious errors.**
  
  - File structure
    - For people who know what they're doing, this is basic stuff. But for learners, the way you're making your calls will be defined in your code. If your files aren't at the right levels, the calls won't be able to find your folders, or files.
  
## Authors
  Just me! If you have questions you can[Email me](mailto:jvantimmeren845@gmail.com)
  
## Version History

* 0.1
  * Inital Release

## Acknowlegements 
  [Joshua Aragon](https://www.youtube.com/watch?v=dttj_p4sUKI&t=151s)
 
  [Adrian Twarog](https://www.youtube.com/watch?v=roMykVsig-A)
  
  And so many other websites, posts, help questions, from all over the place that I would never be able to remember. Thank you!
  

