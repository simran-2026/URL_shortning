# URL_shortning
Simple URL shortening service built with Node.js and MongoDB.

## 🚀 Setup
1. Install dependencies:
```bash
npm install

Configure environment:

bash
cp .env.example .env
# Edit .env with your MongoDB URI
Start server:

bash
npm start
📌 API Reference
Shorten URL:

bash
POST /api/shorten
Body: {"originalUrl":"https://example.com/very/long/url"}
Redirect:

bash
GET /:shortCode
🔧 Troubleshooting
Error: URL.findOneAndUpdate is not a function

Verify MongoDB connection is active

Check model definition in models/Url.js

Ensure proper model import: const URL = require('./models/Url')

📝 Requirements
Node.js 14+

MongoDB

npm/yarn
