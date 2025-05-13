import express from 'express';
import { translate } from '@vitalets/google-translate-api';

const app = express();
app.use(express.json());

app.post('/api/translate', async (req, res) => {
  const { text, to } = req.body;
  if (!text) {
    return res.status(400).json({ error: 'textが必要です' });
  }

  try {
    const result = await translate(text, to || 'ja');
    res.json({ translatedText: result.text });
  } catch (err) {
  console.error('翻訳エラー詳細:', err);
  res.status(500).json({ error: '翻訳に失敗しました', detail: err.message });
  }
});

app.listen(3000, () => {
  console.log('✅ 翻訳APIサーバー起動: http://localhost:3000');
});
