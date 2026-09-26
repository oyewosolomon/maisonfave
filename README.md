# Maison Fave

Website for Maison Fave, the creative house behind [Weddings by Maison Fave](https://weddingsbymaisonfave.com).
Live at https://maisonfave.com.

Next.js static export (`output: 'export'`), built into `out/` and served by Cloudflare Workers static assets (`wrangler.jsonc`).

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # writes the static site to out/
```

Page content and imagery live in `src/lib/data/maison-fave.ts`; sections are in `src/components/maison-fave/`.
