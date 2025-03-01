const axios = require("axios");

let handler = async (m, { q }) => {
    if (!q) return m.reply("_Tanya apa?_");

    const apiUrl = 'https://advancewithaiapi.cropk.com/Gpt/generate';
    const headers = {
        'Accept': '*/*',
        'Content-Type': 'application/json',
        'content-type': 'application/json; charset=utf-8'
    };

    const gptGenerator = new Sky(apiUrl, headers);

    try {
        const response = await gptGenerator.generateResponse(q);
        m.reply(response); 
    } catch (error) {
        m.reply("Terjadi kesalahan, coba lagi nanti.");
    }
};

class Sky {
    constructor(apiUrl, headers) {
        this.apiUrl = apiUrl;
        this.headers = headers;
        this.responseData = null;
    }


    validatePrompt(prompt) {
        if (typeof prompt !== 'string' || prompt.trim() === '') {
            throw new Error('Prompt tidak valid.');
        }
    }

    formatResponse(data) {
        if (data && data.generatedText) {
            return `~> "${data.generatedText}"`;
        } else {
            throw new Error('Response format tidak valid.');
        }
    }

    async generateResponse(prompt) {
        this.validatePrompt(prompt);

        const payload = {
            prompt: prompt,
            contentType: 'gptAlternative'
        };

        try {
            const response = await axios.post(this.apiUrl, payload, { headers: this.headers });
            this.responseData = response.data;
            return this.formatResponse(this.responseData);
        } catch (error) {
            this.handleError(error);
            throw new Error('Gagal mendapatkan respons dari API.');
        }
    }

 
    handleError(error) {
        if (error.response) {
            console.error(`Error ${error.response.status}: ${error.response.statusText}`);
        } else if (error.request) {
            console.error('No response received from API:', error.request);
        } else {
            console.error('An unknown error occurred:', error.message);
        }
    }
}

handler.help = ["chatgpt"];
handler.tags = ["internet", "ai", "gpt"];
handler.command = ["gptai"];

module.exports = handler;
