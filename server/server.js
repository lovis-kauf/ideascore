const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');
const path = require('path'); // Make sure this line is here

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

const frontendPath = path.join(__dirname, '..', 'frontend');
app.use(express.static(frontendPath));


app.post('/api/ask', async (req, res) => {
    console.log('Request received:', req.body); // Add this line

    const userInput = req.body.userInput;

    // Replace with your OpenAI API key
    const OPENAI_API_KEY = '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';

    try {
        const response = await axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', {
            prompt: userInput,
            max_tokens: 50, // You can adjust this according to your needs
            n: 1,
            stop: null,
            temperature: 0.5,
        }, {
            headers: {
                'Authorization': `Bearer ${OPENAI_API_KEY}`,
                'Content-Type': 'application/json',
            },
        });

        const generatedAnswer = response.data.choices[0].text.trim();
        res.json({ answer: generatedAnswer });
    } catch (error) {
        console.error('Error while processing request:', error); // Add this line
        res.status(500).json({ error: 'Error communicating with OpenAI API' });
    }
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
