# README.md 파일 생성/업데이트
echo "# 재고 관리 시스템

## 설치 방법
\`\`\`bash
npm install
\`\`\`

## 환경 설정
1. .env.example 파일을 .env로 복사
2. .env 파일에서 다음 값들을 설정:
   - PORT: 서버 포트
   - MONGODB_URI: MongoDB 연결 문자열
   - JWT_SECRET: JWT 시크릿 키

## 실행 방법
\`\`\`bash
# 개발 모드
npm run dev

# 프로덕션 모드
npm start
\`\`\`
" > README.md