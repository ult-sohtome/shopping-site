import { bootstrap } from 'global-agent';
import dotenv from 'dotenv';
import express from 'express';
import { translate } from '@vitalets/google-translate-api';

dotenv.config();
if (process.env.USE_PROXY) {
  bootstrap();
}

const app = express();
app.use(express.json());

app.post('/api/translate', async (req, res) => {
  const { texts, to } = req.body;
  if (!texts || !to) {
    return res.status(400).json({ error: '翻訳するための情報が不足しています' });
  }
  try {
    const translatedTexts = await Promise.all(
      texts.map(async (text) => {
        const result = await translate(text, { to });
        return result.text;
      })
    );
    res.json({ translatedTexts });
  } catch (err) {
    res.status(500).json({ error: '翻訳に失敗しました', detail: err.message });
  }
});

app.listen(3000, () => {
  console.log('✅ 翻訳APIサーバー起動: http://localhost:3000');
});
