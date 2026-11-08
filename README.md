# Eve Studio, light

The white version of the Eve Studio site. The dark cinematic version lives in `../new-site/` and the original site in the parent folder; neither is touched by this one.

A studio site drawn like a design file: giant expanded caps, purple construction lines with nodes and handles, and inset rounded panels that change ground as you read. It sells one thing, a free 30 minute call.

## Run it

```bash
npm install
npm run build
npm start
```

Then open http://localhost:4175. The other two sites keep ports 4173 and 4174, so all three can run side by side. `npm run build` also runs `scripts/flatten-rsc.mjs`, which makes the static export work from any plain file server.

## Before launch

Set these in `.env.local` (see `.env.example`):

- `NEXT_PUBLIC_BOOKING_URL`: the booking page, embedded on the contact page. Until it is set, that page asks visitors to email two times that suit them.
- `NEXT_PUBLIC_CONTACT_EMAIL`: the lead inbox. Until it is set the address is never shown: the copy-email buttons and email lines are hidden, and the contact page points to the brief form instead. WhatsApp and socials likewise appear only once set.
- `NEXT_PUBLIC_FORM_ENDPOINT`: where the brief form posts. Until then it opens an email.
- `NEXT_PUBLIC_WHATSAPP`, `NEXT_PUBLIC_SITE_URL`, and socials in `src/content/site.ts`.

Replace the samples in `src/content/`: every project but Eve, every figure on them and the service prices are invented and tagged as samples on the page. Eve is real.

## Where things live

- `src/components/Hero.tsx`: the headline in three staggered lines, the construction drawing measured from the real type, the selection box round "launch" and the circle that leans toward the pointer.
- `src/components/Home.tsx`: the statement, selected work, sketch to launch day, services (stacking cards), the team, the launch planner and questions.
- `src/components/Footer.tsx`: the deep panel, the outlined name fitted to the panel width, letters that fill as the pointer passes, and the crew placed on measured cap tops.
- `src/art/voxel.ts` and `src/components/Voxel.tsx`: the pixel crew.
- `src/art/draw.ts`: the sample deliverables, drawn on canvas.
- `src/content/`: cases, services, team and site copy.

## Checks

- `node scripts/snap.mjs <url> 1440x900 <outdir> name=<selector>@<wait>` captures sections headlessly; `START` sets the first wait, `REDUCED=1` emulates reduced motion. `scripts/stitch.cjs <out.png> <img...>` stacks frames into one sheet.
- Speed: `perf.mjs out/index.html --root out` from the design-taste-frontend skill. Its "broken requests" row comes from its own server.
