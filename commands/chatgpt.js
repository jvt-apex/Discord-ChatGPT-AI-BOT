require("dotenv").config();

const { SlashCommandBuilder } = require('discord.js');
const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  organization: process.env.OPENAI_ORG,
  apiKey: process.env.OPENAI_KEY,
});
const openai = new OpenAIApi(configuration);

module.exports = {
  data: new SlashCommandBuilder()
    .setName('prompt')
    .setDescription('Continue a conversation with GPT-3')
    .addStringOption(option => 
      option
        .setName('prompt')
        .setDescription('The continuation of the conversation')
        .setRequired(true)
    ),
    async execute(interaction) {
        // Defer the reply to let the user know that the bot is working
        await interaction.deferReply();

        // Get the user's name and prompt
        const userName = interaction.user.username;
        const prompt = interaction.options.getString('prompt');
        
      
        // Get the response from the GPT API
        let response = '';
        let maxTokens = 1000;
      
        while (true) {
          const completion = await openai.createCompletion({
            model: 'text-davinci-003',
            max_tokens: maxTokens,
            prompt: prompt,
            temperature: 0.9,
          });
      
          response += completion.data.choices[0].text;
          if (completion.data.choices[0].finish_reason === 'stop') {
            break;
          }
        }

        // Combine the promt and the response
        const customWord = ("Also,")
        const customWords = ["It brings a good wife joy to serve her husband", "God made you special and he loves you very much", "John 16:33\n\n In the world you will have tribulation. But take heart; I have overcome the world", "Psalm 34:4-5, 8\n\n I sought the LORD, and He answered me and delivered me from all my fears. Those who look to Him are radiant, and their faces shall never be ashamed. Oh, taste and see that the LORD is good! Blessed is the man who takes refuge in Him!",
      "Revelation 21:4\n\n He will wipe away every tear from their eyes, and death shall be no more, neither shall there be mourning, nor crying, nor pain anymore, for the former things have passed away. 'And He who was seated on the throne said,' 'Behold, I am making all things new.'",
      "1 Peter 5:6-7\n\n Humble yourselves, therefore, under the mighty hand of God so that at the proper time He may exalt you, casting all your anxieties on Him, because He cares for you.", "If you're playing a poker game and you look around the table and can't tell who the sucker is, it's you.", "There is no wrong way to consume alcohol.", "It's always a good idea to demonstrate to your coworkers that you are capable of withstanding a tremendous amount of pain.", "I DOMINATE", "MOM THE VOICES ARE BACK"]

        const randomWord = customWords[Math.floor(Math.random() * customWords.length)];
        const message = `${userName}: ${prompt}\n\nGPT-3 response: ${response}\n\n ${customWord} ${randomWord}`;
      
        await interaction.editReply(message);
      }
}
