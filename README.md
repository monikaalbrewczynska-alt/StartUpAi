# Recovera

Responsive bilingual (Polish / English) postoperative care web application prototype. Includes patient, physician, physiotherapist and guardian demo roles; lengthening plan, medication schedule, prescription requests, contact requests, photo check-ins, home exercises and a care-team queue.

## Open without a server

Open `public/index.html` directly in a modern browser. HTML, CSS and vanilla JavaScript run without Node.js. Demo data stays in the browser; storage behavior for local files may vary between browsers.

## Run

Requires Node.js 22 or newer. No runtime dependencies.

```sh
npm start
```

The server listens on port 3000; set `PORT` to override. Run `npm test` for HTTP smoke tests.

For browser workflow validation, install development dependencies with `npm ci`, start the app, then run `npm run test:browser`. The browser smoke test uses `/usr/bin/chromium`; set `CHROMIUM_PATH` to override. It runs in an isolated browser context with fictional data and checks task persistence, contact / response, prescription requests, plan editing, photo uploads, physiotherapy, guardian access, English and mobile layout.

## Demo limitations

All records are fictional. Data is stored in this browser's localStorage, shared between demo roles in the same browser only. Role selection is a demonstration, not authentication or authorization. Do not use real health data. There is no backend database, clinical notification delivery, e-prescription integration, real-time duty management or verified guardian access. A real clinical deployment requires those services, security and privacy review, clinically approved content, backup and recovery, and an agreed response-time / escalation process. The app does not diagnose conditions or automatically change medical treatment.

Clear the `recovera-demo-v1` localStorage key to reset sample records. Fonts use Google Fonts when reachable and fall back to system fonts otherwise.
