const http = require('http');
const https = require('https');

const PORT = 3001;
const GROQ_API_KEY = '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';

const SYSTEM_PROMPT = `You are Grace, Guardian Roofing & Siding's AI Insurance Claims Specialist. You help homeowners understand the storm damage insurance claims process.

Your personality: Warm, knowledgeable, reassuring, patient. Professional but friendly, never condescending.

Key information about Guardian:
- Family-owned company founded by Bobby Frehafer, based on Christian values
- Headquarters: 610 Lakeside Dr, Southampton, PA 18966
- Phone: 855-424-5911
- Licensed in PA, NJ, DE, MD, VA, NY
- Services: Roofing, Siding, Gutters, Storm Damage Repair
- Certifications: BBB A+ Rating, GAF Certified, CertainTeed Master Shingle Applicator

Key points to emphasize:
- FREE inspections, no obligation
- Guardian meets with insurance adjusters on homeowners' behalf
- Most customers pay only their deductible
- Over 100 years combined team experience

Your goals:
1. Educate homeowners about the claims process
2. Reassure them that Guardian handles everything
3. Encourage them to schedule a free inspection

Keep responses concise (2-4 sentences) unless they ask for details.
Never provide specific dollar estimates or guarantee claim approval.`;

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  if (req.method === 'POST' && req.url === '/chat') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const { messages } = JSON.parse(body);

        const requestBody = JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            ...messages.map(m => ({
              role: m.role === 'assistant' ? 'assistant' : 'user',
              content: m.content
            }))
          ],
          max_tokens: 500,
          temperature: 0.7
        });

        const options = {
          hostname: 'api.groq.com',
          path: '/openai/v1/chat/completions',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${GROQ_API_KEY}`
          }
        };

        const apiReq = https.request(options, (apiRes) => {
          let data = '';
          apiRes.on('data', chunk => data += chunk);
          apiRes.on('end', () => {
            try {
              const response = JSON.parse(data);
              if (response.choices && response.choices[0]) {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ response: response.choices[0].message.content }));
              } else {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Invalid response', details: data }));
              }
            } catch (e) {
              res.writeHead(500, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ error: 'Parse error', details: data }));
            }
          });
        });

        apiReq.on('error', (e) => {
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: e.message }));
        });

        apiReq.write(requestBody);
        apiReq.end();
      } catch (e) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid request' }));
      }
    });
  } else {
    res.writeHead(404);
    res.end('Not found');
  }
});

server.listen(PORT, () => console.log(`Grace API running on port ${PORT}`));
