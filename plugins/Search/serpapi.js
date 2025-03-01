const axios = require('axios');


async function searchAndDisplayResults(query) {
    const apiKey = 'f6313a796871b466ed970c257935f0d5b512caa7f0619516d7444aa22bf4b6e0'; // API key ga tau expired atau ngga 👀
    const url = `https://serpapi.com/search.json?q=${encodeURIComponent(query)}&location=Indonesia&hl=id&gl=id&google_domain=google.co.id&async=true&api_key=${apiKey}`;

  
    const headers = {
        'User-Agent': 'Mozilla/5.0 (Linux; Android 13; Mobile) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.5845.163 Mobile Safari/537.36',
        'Accept': 'application/json, text/javascript, */*; q=0.01',
        'X-Requested-With': 'XMLHttpRequest'
    };

    try {
        const response = await axios.get(url, { headers: headers });
        const data = response.data;
        
      
        const jsonEndpoint = data.search_metadata.json_endpoint;
    
        return await getSearchResults(jsonEndpoint);
    } catch (error) {
        console.error('Error fetching data:', error);
        return 'Error fetching data from SerpApi.';
    }
}


async function getSearchResults(endpoint) {
    try {
        const response = await axios.get(endpoint);
        const data = response.data;

        if (data && data.organic_results) {
            const results = data.organic_results;
            let resultMessage = "Search Results:\n\n";
            
           
            results.forEach((result, index) => {
             
                resultMessage += `Position: ${index + 1}\n`;
                resultMessage += `Title: ${result.title}\n`;
                resultMessage += `Link: ${result.link}\n`;
                resultMessage += `Snippet: ${result.snippet}\n`;
                resultMessage += `Source: ${result.source}\n`;
                resultMessage += `Thumbnail: ${result.thumbnail}\n`;
                resultMessage += '---\n';
            });
            
            return resultMessage;
        } else {
            return 'No results found in json_endpoint';
        }
    } catch (error) {
        console.error('Error fetching data from json_endpoint:', error);
        return 'Error fetching data from json_endpoint.';
    }
}


let handler = async (m, { hanz, setReply, text }) => {
   
    if (text) {
        const query = text.trim();
        
        if (query) {
            const results = await searchAndDisplayResults(query);
            m.reply(results);
        } else {
            setReply('masukij kata pencarian');
        }
    } else {
        setReply('masikn kata kunci pencarian .');
    }
};

handler.command = ['serpapi'];
handler.tags = ['search'];

module.exports = handler;