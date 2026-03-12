/**
 * Gemini AI image transformation service.
 * Sends the portrait to Gemini and requests a Spider-Man mask version for morph animation.
 * Uses VITE_GEMINI_API_KEY. Falls back to null if key missing or API doesn't return image.
 */

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY as string | undefined;
const GEMINI_MODEL = 'gemini-2.0-flash-exp'; // or gemini-1.5-flash when image-out not needed

export const GEMINI_PROMPT =
  'Transform this human portrait into a cinematic Spider-Man styled version where the mask gradually forms over the face while keeping facial structure realistic. Same pose and framing. Output only the transformed image.';

/**
 * Fetch image from URL and return as base64 (for API).
 */
async function imageUrlToBase64(url: string): Promise<string> {
  const res = await fetch(url);
  const blob = await res.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const dataUrl = reader.result as string;
      const base64 = dataUrl.split(',')[1];
      resolve(base64 || '');
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

/**
 * Call Gemini API with image + prompt. Returns image data URL if the model returns image; otherwise null.
 */
export async function getGeminiTransformedImage(portraitUrl: string): Promise<string | null> {
  if (!GEMINI_API_KEY?.trim()) return null;

  try {
    const base64 = await imageUrlToBase64(portraitUrl);
    const mimeType = portraitUrl.toLowerCase().includes('.png') ? 'image/png' : 'image/jpeg';

    const body: Record<string, unknown> = {
      contents: [
        {
          parts: [
            {
              inlineData: {
                mimeType,
                data: base64,
              },
            },
            {
              text: GEMINI_PROMPT,
            },
          ],
        },
      ],
      generationConfig: {
        temperature: 0.4,
        topK: 32,
        topP: 1,
        maxOutputTokens: 8192,
      },
    };
    // Image output (when supported by model, e.g. gemini-2.0-flash-exp)
    try {
      (body.generationConfig as Record<string, unknown>).responseModalities = ['TEXT', 'IMAGE'];
      (body.generationConfig as Record<string, unknown>).responseMimeType = 'image/png';
    } catch {
      // ignore
    }

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      }
    );

    if (!res.ok) {
      console.warn('Gemini API error:', res.status, await res.text());
      return null;
    }

    const data = await res.json();
    const candidate = data?.candidates?.[0];
    const parts = candidate?.content?.parts ?? [];

    for (const part of parts) {
      if (part.inlineData?.data) {
        const mime = part.inlineData.mimeType || 'image/png';
        return `data:${mime};base64,${part.inlineData.data}`;
      }
    }
  } catch (e) {
    console.warn('Gemini transform failed:', e);
  }
  return null;
}
