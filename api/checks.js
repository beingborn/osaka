const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join('/tmp', 'osaka-checks.json');

function initDataFile() {
  if (!fs.existsSync(DATA_FILE)) {
    const initialData = {
      a1: false, a2: false, a3: false, a4: false,
      a5: false, a6: false, a7: false, a8: false, a9: false,
      b1: false, b2: false, b3: false, b4: false,
      b5: false, b6: false, b7: false, b8: false,
      b9: false, b10: false
    };
    fs.writeFileSync(DATA_FILE, JSON.stringify(initialData, null, 2));
  }
}

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    initDataFile();

    if (req.method === 'GET') {
      const data = fs.readFileSync(DATA_FILE, 'utf-8');
      res.json(JSON.parse(data));
    } else if (req.method === 'POST') {
      fs.writeFileSync(DATA_FILE, JSON.stringify(req.body, null, 2));
      res.json({ success: true });
    }
  } catch (err) {
    res.status(500).json({ error: '파일 오류', details: err.message });
  }
}
