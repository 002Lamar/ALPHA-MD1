const { zokou } = require("../framework/zokou");
const axios = require("axios").default;

zokou({
  nomCom: "gpt",
  reaction: '📡',
  categorie: 'IA'
}, async (_event, _user, context) => {
  const { repondre: respond, arg: args, ms: message } = context;

  try {
    // Check if there are any arguments (user question)
    if (!args || args.length === 0) {
      return respond("Please ask a question, and Keith will answer it.");
    }

    // Join all arguments into a single question string
    const question = args.join(" ");
    
    // Send GET request to the API with the question
    const response = await axios.get(`https://widipe.com/v2/gpt4?text=${encodeURIComponent(question)}`);
    const data = response.data;

    // Check if there is a result and respond
    if (data && data.result) {
      respond(data.result);
    } else {
      respond("Error during response generation.");
    }
  } catch (error) {
    console.error("Error:", error.message || "An unknown error occurred.");
    respond("Oops, an error occurred while processing your request.");
  }
});
