const express = require('express');
const cors = require('cors');
require('dotenv').config();
const axios = require('axios');

const app = express();
app.use(express.json());
app.use(cors());

const API_KEY = process.env.GEMINI_API_KEY;

app.post("/api/chat", async (req, res) => {
    try {
        const userMessage = req.body.message;

        const response = await axios.post(
            "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" + API_KEY,
            {
                "contents": [{ "parts": [{ "text": userMessage }] }]
            }
        );

        const botReply = response.data.candidates[0].content.parts[0].text;
        res.json({ reply: botReply });

    } catch (error) {
        console.error(error);
        res.json({ reply: "Error connecting to AI 🤖" });
    }
});

const PORT = 3000;
app.listen(PORT, () => console.log("Server running on port", PORT));