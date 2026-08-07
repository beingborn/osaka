const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const DATA_FILE = path.join(__dirname, 'data.json');

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// 초기 데이터 생성 함수
function initDataFile() {
  if (!fs.existsSync(DATA_FILE)) {
    const initialData = {
      a1: false, a2: false, a3: false, a4: false,
      a5: false, a6: false, a7: false, a8: false,
      b1: false, b2: false, b3: false, b4: false,
      b5: false, b6: false, b7: false, b8: false,
      b9: false
    };
    fs.writeFileSync(DATA_FILE, JSON.stringify(initialData, null, 2));
  }
}

// GET /api/checks - 현재 체크리스트 상태 조회
app.get('/api/checks', (req, res) => {
  try {
    const data = fs.readFileSync(DATA_FILE, 'utf-8');
    res.json(JSON.parse(data));
  } catch (err) {
    res.status(500).json({ error: '파일 읽기 실패' });
  }
});

// POST /api/checks - 체크리스트 상태 업데이트
app.post('/api/checks', (req, res) => {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(req.body, null, 2));
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: '파일 쓰기 실패' });
  }
});

app.listen(PORT, () => {
  initDataFile();
  console.log(`🚀 서버 실행 중: http://localhost:${PORT}`);
  console.log(`📁 데이터 파일: ${DATA_FILE}`);
});
