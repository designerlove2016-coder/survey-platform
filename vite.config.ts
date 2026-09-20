import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import { GoogleGenAI } from '@google/genai';

function geminiApiPlugin(apiKey: string | undefined) {
  return {
    name: 'gemini-api-plugin',
    configureServer(server: any) {
      server.middlewares.use(async (req: any, res: any, next: any) => {
        if (req.url === '/api/analyze-product' && req.method === 'POST') {
          let body = '';
          req.on('data', (chunk: Buffer) => {
            body += chunk.toString();
          });
          req.on('end', async () => {
            res.setHeader('Content-Type', 'application/json');
            try {
              if (!apiKey) {
                res.statusCode = 400;
                res.end(JSON.stringify({ error: 'GEMINI_API_KEY is not configured' }));
                return;
              }

              const parsed = JSON.parse(body || '{}');
              const { imageBase64, mimeType = 'image/jpeg', fileName = '' } = parsed;

              if (!imageBase64) {
                res.statusCode = 400;
                res.end(JSON.stringify({ error: 'No image provided' }));
                return;
              }

              const ai = new GoogleGenAI({
                apiKey: apiKey,
                httpOptions: {
                  headers: {
                    'User-Agent': 'aistudio-build',
                  },
                },
              });

              const prompt = `You are an AI assistant for Panda supermarket customer experience editor.
Analyze this product image carefully. Identify the supermarket product accurately.
Filename hint if relevant: "${fileName}".
Return JSON ONLY in this exact structure:
{
  "productNameAr": "اسم المنتج بالعربية باختصار وبدقة لمتجر بنده (مثال: طماطم كرزية، حليب كامل الدسم، أرز بسمتي، جبن شيدر)",
  "productNameEn": "Short English product name",
  "emoji": "Single most accurate emoji like 🍅 or 🥛 or 🍚 or 🧀",
  "category": "Department category in Arabic like خضار or ألبان or غذائية"
}`;

              const response = await ai.models.generateContent({
                model: 'gemini-3.8-flash',
                contents: [
                  {
                    parts: [
                      {
                        inlineData: {
                          mimeType: mimeType,
                          data: imageBase64,
                        },
                      },
                      {
                        text: prompt,
                      },
                    ],
                  },
                ],
                config: {
                  responseMimeType: 'application/json',
                },
              });

              const resultText = response.text || '{}';
              let resultJson = {};
              try {
                resultJson = JSON.parse(resultText);
              } catch {
                resultJson = { productNameAr: 'منتج بنده الطازج', emoji: '🛍️' };
              }

              res.statusCode = 200;
              res.end(JSON.stringify(resultJson));
            } catch (err: any) {
              console.error('Gemini API product analysis error:', err);
              res.statusCode = 500;
              res.end(JSON.stringify({ error: err.message || 'Error analyzing image' }));
            }
          });
          return;
        }
        next();
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  const apiKey = env.GEMINI_API_KEY || process.env.GEMINI_API_KEY;

  return {
    plugins: [react(), tailwindcss(), geminiApiPlugin(apiKey)],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(apiKey),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify - file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
