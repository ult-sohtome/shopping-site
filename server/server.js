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
  const { text, to } = req.body;
  if (!text) {
    return res.status(400).json({ error: 'textが必要です' });
  }

  try {
    const result = await translate(text, { to });
    res.json({ translatedText: result.text });
  } catch (err) {
    res.status(500).json({ error: '翻訳に失敗しました', detail: err.message });
  }
});

app.listen(3000, () => {
  console.log('✅ 翻訳APIサーバー起動: http://localhost:3000');
});
