# URL Shortener (Express + Prisma + SQLite)

## Run locally

1. Install
    
```bash
npm insatall
```

## Apply DB migrations (already done if you used npx prisma migrate dev):

```bash
npx prisma migrate dev
```

## Start dev server:

```bash
npm run dev
```

## Open http://localhost:3000 and test.

# API
##  POST /api/shorten JSON { "url": "https://..." } → returns { code, shortUrl, url }
## GET /:code → redirects to original URL