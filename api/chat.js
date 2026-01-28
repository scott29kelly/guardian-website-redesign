export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const GROQ_API_KEY = process.env.GROQ_API_KEY;
  
  if (!GROQ_API_KEY) {
    return res.status(500).json({ error: 'API key not configured' });
  }

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

Keep responses concise (2-4 sentences) unless they ask for details.
Never provide specific dollar estimates or guarantee claim approval.`;

  try {
    const { messages } = req.body;

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GROQ_API_KEY}`
      },
      body: JSON.stringify({
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
      })
    });

    const data = await response.json();

    if (data.choices && data.choices[0]) {
      return res.status(200).json({ response: data.choices[0].message.content });
    } else {
      return res.status(500).json({ error: 'Invalid response from AI' });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
