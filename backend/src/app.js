const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// 미들웨어 설정
app.use(cors());
app.use(express.json());

// 기본 라우트
app.get('/', (req, res) => {
  res.json({ message: '재고 관리 시스템 API 서버' });
});

// MongoDB 연결
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/inventory')
  .then(() => console.log('MongoDB에 연결되었습니다.'))
  .catch(err => console.error('MongoDB 연결 실패:', err));

// 서버 시작
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`서버가 포트 ${PORT}에서 실행 중입니다.`);
});