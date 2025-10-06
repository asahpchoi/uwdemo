# Copilot Instructions for AI Coding Agents

## Project Overview
This is a React-based demo for underwriting workflows. The app allows users to upload images, which are processed by a backend webhook, and then displays results fetched from an Airtable base. The UI supports toggling between production and testing environments.

## Architecture & Data Flow
- **Frontend:** React (SPA) with routing via `react-router-dom`. Main pages: `HomePage`, `CaseListPage`, `CaseDetailPage`.
- **Backend Integration:** Image uploads are sent to a webhook (URL toggled by environment). Results are retrieved from Airtable using the official JS SDK.
- **Airtable:** All data fetches use the base ID `app5SLFPvCnsFIsXt` and table `tblgPTdZZHlLDDpjW`. API key is required via `.env`.
- **NGINX:** `nginx.conf` serves the production build and redirects HTTP to HTTPS. SPA routing is handled with `try_files $uri /index.html`.

## Developer Workflows
- **Start Dev Server:** `npm start`
- **Run Tests:** `npm test` (uses React Testing Library)
- **Build for Production:** `npm run build`
- **Environment Variables:**
  - `REACT_APP_AIRTABLE_API_KEY`: Airtable API key
  - `REACT_APP_PRODUCTION_URL`: Production webhook URL
  - `REACT_APP_TESTING_URL`: Testing webhook URL
- **Image Upload:** Handled in `HomePage.js` via form submission to the webhook URL.
- **Airtable Access:** All Airtable calls use the JS SDK and require the API key from `.env`.

## Project-Specific Patterns
- **Environment Toggle:** The `isProduction` state in `App.js` and `HomePage.js` determines which webhook URL is used.
- **Routing:** All routes are defined in `App.js` using `<Routes>` and `<Route>`.
- **Markdown Rendering:** Case details use `react-markdown` to render fields from Airtable.
- **Component Structure:**
  - `HomePage.js`: Image upload, webhook trigger, fetch Airtable record
  - `CaseListPage.js`: Lists cases from Airtable
  - `CaseDetailPage.js`: Shows details for a single case
- **Styling:** CSS files are colocated with components (e.g., `App.css`).

## Integration Points
- **Airtable:** JS SDK, base/table IDs hardcoded, API key via `.env`
- **Webhook:** URL from `.env`, toggled by environment
- **NGINX:** See `nginx.conf` for deployment config

## Example: Fetching a Case from Airtable
```js
const base = new Airtable({ apiKey }).base('app5SLFPvCnsFIsXt');
base('tblgPTdZZHlLDDpjW').find(recordId, (err, record) => {
  // handle record
});
```

## Key Files
- `src/App.js`: Main app, routing, environment toggle
- `src/HomePage.js`: Upload, webhook, Airtable fetch
- `src/CaseListPage.js`: List cases
- `src/CaseDetailPage.js`: Case details
- `nginx.conf`: Deployment config
- `.env`: Secrets and environment variables

---
If any conventions or workflows are unclear, please ask for clarification or provide feedback to improve these instructions.