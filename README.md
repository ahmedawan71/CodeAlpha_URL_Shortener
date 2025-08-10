# 📎 URL Shortener

A simple and lightweight **URL Shortener** built with **Node.js, Express, Prisma (SQLite)**, and a minimal HTML/CSS/JS frontend. It lets you shorten long URLs into compact shareable links and redirects them when visited.

---

## 🚀 Features

- Shorten any valid URL into a unique 7-character code
- Instant redirect to the original link when visiting the short URL
- Minimal frontend for quick shortening
- Spinner-based loading indicator for smooth UX
- SQLite database via Prisma ORM — no external DB required
- Simple and self-hostable

---

## 📂 Project Structure

```
url-shortener/
│
├── prisma/              # Prisma schema & migrations
│   ├── schema.prisma
│   └── migrations/
│
├── public/              # Static frontend files
│   └── index.html
│
├── src/
│   └── index.js         # Express server
│
├── .gitignore
├── package.json
├── README.md
└── .env
```

---

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** SQLite (via Prisma ORM)
- **Frontend:** HTML, CSS, Vanilla JS
- **Utilities:** nanoid (unique short codes), cors

---

## 📋 Prerequisites

Make sure you have:
- [Node.js](https://nodejs.org/) v16+ (v18+ recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [Git](https://git-scm.com/)

---

## ⚙️ Setup & Installation

**1️⃣ Clone the repository**

```bash
git clone https://github.com/yourusername/url-shortener.git
cd url-shortener
```

**2️⃣ Install dependencies**

```bash
npm install
```

**3️⃣ Configure environment**

Create a `.env` file in the project root:

```env
DATABASE_URL="file:./dev.db"
```

**4️⃣ Set up the database**

```bash
npx prisma migrate dev --name init
npx prisma generate
```

**5️⃣ Run the development server**

```bash
npm run dev
```

The app will start at: **http://localhost:3000**

---

## 📡 API Endpoints

### **POST** `/api/shorten`
Shorten a URL.

```json
// Request body
{
  "url": "https://example.com"
}

// Response
{
  "code": "abc123x",
  "shortUrl": "http://localhost:3000/abc123x",
  "url": "https://example.com"
}
```

### **GET** `/:code`
Redirects to the original URL for the given short code.

Example:
```bash
GET /abc123x -> https://example.com
```

---

## 🎨 Frontend

- Open http://localhost:3000 in your browser
- Paste your long URL in the input field
- Click **Shorten** → get your short URL instantly
- A **spinner** will show while processing

---

## 📦 Scripts

```bash
npm run dev   # Run with nodemon for development
npm start     # Run in production mode
```

---

## 🗒️ Notes

- The database file (`dev.db`) is stored locally in the `prisma/` folder
- For production, you can change the `DATABASE_URL` in `.env` to use PostgreSQL, MySQL, etc.
- To deploy, make sure your hosting platform supports Node.js and configure the `PORT` env variable

---

## 📜 License

MIT License — feel free to use and modify as you wish.

---
