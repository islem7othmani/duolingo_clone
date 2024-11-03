const Message = require('../Models/Translator');
const mongoose = require("mongoose");

const addmessage = async (req, res) => {
  // Ensure the request body has the expected structure
  if (!req.body || !req.body.q) {
    return res.status(400).json({ error: 'Invalid request body. "q" is required.' });
  }

  const url = 'https://cheapest-gpt-4-turbo-gpt-4-vision-chatgpt-openai-ai-api.p.rapidapi.com/v1/chat/completions';
  
  const options = {
    method: 'POST',
    headers: {
      'x-rapidapi-key': '34381b8984mshd75a1b2014c2aa4p165b85jsncde73e638de3', // Replace with your actual API key
      'x-rapidapi-host': 'cheapest-gpt-4-turbo-gpt-4-vision-chatgpt-openai-ai-api.p.rapidapi.com',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      messages: [
        {
          role: 'user',
          content: req.body.q // Get input from request body
        }
      ],
      model: 'gpt-4o', // Ensure the model name is correct
      max_tokens: 100,
      temperature: 0.9
    })
  };

  try {
    const response = await fetch(url, options);
    
    // Check if the response status is ok (status code 200-299)
    if (!response.ok) {
      const errorBody = await response.json(); // Get the error details from the response
      console.error('API Error:', errorBody); // Log the error details
      return res.status(response.status).json({ error: errorBody }); // Return the error response to the client
    }

    const result = await response.json(); // Parse the JSON response
    console.log(result); // Log the result for debugging
    res.status(200).json(result); // Send the result back to the client
  } catch (error) {
    console.error('Error:', error); // Log any other errors
    res.status(500).json({ error: 'Something went wrong', details: error.message }); // Return a server error response
  }
};

module.exports = { addmessage };
