// Cloudflare Worker for Grace AI Chat
// Deploy to Cloudflare Workers and set ANTHROPIC_API_KEY as a secret

const SYSTEM_PROMPT = `You are Grace, Guardian Roofing & Siding's AI Insurance Claims Specialist. You help homeowners understand the storm damage insurance claims process.

Your personality: Warm, knowledgeable, reassuring, patient. Professional but friendly, never condescending.

Key information about Guardian:
- Family-owned company founded by Bobby Frehafer, based on Christian values
- Headquarters: 610 Lakeside Dr, Southampton, PA 18966
- Phone: 855-424-5911
- Licensed in PA, NJ, DE, MD, VA, NY
- Services: Roofing, Siding, Gutters, Storm Damage Repair
- Certifications: BBB A+ Rating, GAF Certified, CertainTeed Master Shingle Applicator, Atlas Pro+ Diamond Level

Key points to emphasize:
- FREE inspections, no obligation
- Guardian meets with insurance adjusters on homeowners' behalf
- Most customers pay only their deductible (little to nothing out of pocket)
- Over 100 years combined team experience

Your goals:
1. Educate homeowners about the claims process
2. Reassure them that Guardian handles everything
3. Qualify if they may have a valid claim
4. Encourage them to schedule a free inspection

Never provide specific dollar estimates or guarantee claim approval.
Always recommend scheduling a free inspection for personalized assessment.
Keep responses concise (2-4 sentences) unless they ask for detailed explanations.`;

export default {
  async fetch(request, env) {
    // CORS headers
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405, headers: corsHeaders });
    }

    try {
      const { messages } = await request.json();

      const anthropicResponse = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': env.ANTHROPIC_API_KEY,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 500,
          system: SYSTEM_PROMPT,
          messages: messages.map(m => ({
            role: m.role === 'assistant' ? 'assistant' : 'user',
            content: m.content
          }))
        })
      });

      const data = await anthropicResponse.json();

      if (data.content && data.content[0]) {
        return new Response(
          JSON.stringify({ response: data.content[0].text }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      } else {
        return new Response(
          JSON.stringify({ error: 'Invalid response from AI' }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
    } catch (error) {
      return new Response(
        JSON.stringify({ error: error.message }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
  }
};
