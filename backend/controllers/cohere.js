const { CohereClient } = require("cohere-ai");
require("dotenv").config();

const cohere = new CohereClient({
  token: process.env.CO_API_KEY
});

async function analyzeSentiment (message) {
  const response = await cohere.classify({
    model: "embed-english-v3.0",
    inputs: [message],
    examples: [{"text": "Why do you always mess things up? I\'m so tired of this!\n", "label": "Angry"}, {"text": "This is absolutely unacceptable. Fix it now!", "label": "Angry"}, {"text": "I can\'t believe they treated me like that. I\'m furious!", "label": "Angry"}, {"text": "You\'re wasting everyone\'s time with your incompetence.", "label": "Angry"}, {"text": "Stop ignoring my messages! This is ridiculous.", "label": "Angry"}, {"text": "I just got promoted at work, and I couldn\'t be happier!", "label": "Happy"}, {"text": "Today is such a beautiful day. I feel amazing!", "label": "Happy"}, {"text": "I can\'t wait for the weekend—it’s going to be so much fun!", "label": "Happy"}, {"text": "The surprise party was absolutely perfect. Thank you!", "label": "Happy"}, {"text": "I’m so proud of myself for accomplishing this goal!", "label": "Happy"}, {"text": "I miss you so much. Life feels empty without you.", "label": "Sad"}, {"text": "Things haven’t been going well lately. I feel lost.", "label": "Sad"}, {"text": "I’m heartbroken. I didn’t expect it to end like this.", "label": "Sad"}, {"text": "Everything feels so overwhelming. I just want to cry.", "label": "Sad"}, {"text": "I feel like I\'m not good enough, no matter what I do.", "label": "Sad"}, {"text": "The food at that restaurant was absolutely disgusting!", "label": "Disgust"}, {"text": "\"I can’t believe people actually enjoy watching this garbage.", "label": "Disgust"}, {"text": "That was such a horrible thing to do. It makes me sick.", "label": "Disgust"}, {"text": "The way they treated the animals was completely inhumane.", "label": "Disgust"}, {"text": "I’m revolted by the sheer audacity of their behavior.", "label": "Disgust"}, {"text": "I have a presentation tomorrow, and I’m so nervous about it.", "label": "Anxious"}, {"text": "I can’t shake the feeling that something bad is going to happen.", "label": "Anxious"}, {"text": "I’ve been worrying about this all night—I can’t sleep.", "label": "Anxious"}, {"text": "What if I make a mistake? Everyone will judge me!", "label": "Anxious"}, {"text": "I feel like I’m running out of time, and I don’t know what to do.", "label": "Anxious"}]
  });
  return response.classifications;
}

preamble = "You will be asked to give specific, personalized insights/advice based on other's diary/journal entries. You are speaking directly to the author of these entries. Use a conversational and enthusiastic tone."

async function analyzeChat (message) {
    const stream = await cohere.chat({
      model: "command-r-plus-08-2024",
      message,
      preamble,
      temperature: 0.3,
      promptTruncation: "AUTO",
      max_tokens: 100,
      connectors: [{"id":"web-search"}]
    });
  
    
  };
module.exports = {
    analyzeSentiment,
    analyzeChat
}

console.log(await analyzeChat("Today was a really tough day. I had a lot of work to do and I was feeling really overwhelmed. I had a presentation in front of the whole team and I was really nervous about it. I ended up doing okay, but I made a few mistakes and I felt really embarrassed."))