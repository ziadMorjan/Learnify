import { GoogleGenAI } from '@google/genai';
import CustomError from './CustomError.js';

const MODEL_ID = process.env.GEMINI_MODEL_ID || 'gemini-2.0-flash';
const MAX_INPUT_CHARS = 80000;
const MAX_FLASHCARDS = 10;

const client = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY || '',
});

const extractText = (result) => {
    if (!result) return '';
    if (typeof result.text === 'string') return result.text;
    if (typeof result?.response?.text === 'string') return result.response.text;
    const candidateParts =
        result?.response?.candidates?.[0]?.content?.parts ||
        result?.candidates?.[0]?.content?.parts ||
        result?.contents?.[0]?.parts;
    if (Array.isArray(candidateParts)) {
        const combined = candidateParts
            .map((p) => (typeof p.text === 'string' ? p.text : ''))
            .filter(Boolean)
            .join('\n')
            .trim();
        if (combined) return combined;
    }
    return '';
};

const parseFlashcards = (raw) => {
    let text = raw || '';
    const match = text.match(/\[.*\]/s);
    if (match) {
        text = match[0];
    }
    let parsed;
    try {
        parsed = JSON.parse(text);
    } catch (err) {
        throw new CustomError('Failed to parse AI response', 502);
    }

    if (!Array.isArray(parsed)) {
        throw new CustomError('AI response is not an array', 502);
    }

    const cards = parsed
        .map((card) => ({
            question: (card?.question || '').toString().trim(),
            answer: (card?.answer || '').toString().trim(),
        }))
        .filter((card) => card.question && card.answer)
        .slice(0, MAX_FLASHCARDS);

    if (!cards.length) {
        throw new CustomError('AI returned no valid flashcards', 502);
    }

    return cards;
};

export const generateFlashcardsFromText = async ({ text, count = MAX_FLASHCARDS }) => {
    if (!process.env.GEMINI_API_KEY) {
        throw new CustomError('GEMINI_API_KEY is not set', 500);
    }

    const clippedText = text.slice(0, MAX_INPUT_CHARS);
    const requestedCount = Math.min(Math.max(count || 1, 1), MAX_FLASHCARDS);

    const prompt = `
You are a tutor creating concise flashcards.
Generate ${requestedCount} flashcards from the content below.
Return ONLY valid JSON: an array of objects with "question" and "answer" strings. No extra text.

Content:
${clippedText}
`;

    try {
        const result = await client.models.generateContent({
            model: MODEL_ID,
            contents: [
                {
                    role: 'user',
                    parts: [{ text: prompt }],
                },
            ],
            generationConfig: {
                maxOutputTokens: 512,
                temperature: 0.4,
            },
        });

        const outputText = extractText(result);
        if (!outputText) {
            throw new CustomError('Empty AI response', 502);
        }

        return parseFlashcards(outputText).slice(0, requestedCount);
    } catch (error) {
        if (error instanceof CustomError) throw error;
        const message =
            error?.response?.error?.message ||
            error?.message ||
            'Failed to generate flashcards';
        throw new CustomError(message, 502);
    }
};

export default generateFlashcardsFromText;
