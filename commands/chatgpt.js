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
        const message = `${userName}: ${prompt}\n\nGPT-3 response: ${response}`;
      
        // If the response is longer than 10000 characters, split it into chunks
        if (response.length > 10000) {
          const chunks = response.match(/.{1,10000}/g);
          response = chunks.shift();
      
          // Send the first chunk as a regular message
          await interaction.editReply(message);
      
          // Add the rest of the chunks as follow-up messages
          for (const chunk of chunks) {
            await interaction.followUp({
              content: chunk,
              ephemeral: true
            });
          }
        } else {
          // If the response is shorter than 1500 characters, send it as a regular message
          await interaction.editReply(message);
        }
      }
};
