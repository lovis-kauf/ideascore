const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');
const path = require('path'); // Make sure this line is here
require('dotenv').config()

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
    const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

    try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
                "model": "gpt-3.5-turbo",
                "messages": [{"role": "user", "content": "Hello!"}]

        }, {
            headers: {
                'Authorization': `Bearer ${OPENAI_API_KEY}`,
                'Content-Type': 'application/json',
            },
        });

        console.log("MYDATA:::::", response.data.choices[0])
        const generatedAnswer = response.data.choices[0].message.content;
        res.json({ answer: generatedAnswer });
    }
    catch (error) {
        console.error('Error while processing request:', error.response ? error.response.data : error);
        res.status(500).json({ error: 'Error communicating with OpenAI API' });
    }

});

app.get('/hello', async (req, res) => {
    console.log('hello', req.body); // Add this line


        res.json({ answer: 'hello'});


});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
