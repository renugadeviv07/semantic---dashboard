# Enterprise Accessible Dashboard

Semantic HTML5 & Accessible Component Architecture: a multi-page, vanilla HTML/CSS/JS admin dashboard targeting WCAG 2.1.

## Problem statement and objectives
Enterprise dashboards are often built from generic `div`s that are hard to use with a keyboard or screen reader. Objectives: strict semantic HTML5, correct DOM hierarchy, WCAG 2.1 conformance work, reusable components, responsive design.

## Technology stack
HTML5, CSS3, vanilla JavaScript, WAI-ARIA only where native HTML is not enough. No frameworks.

## Features
Dashboard stats; user list with search, filters, sortable columns, add/edit/delete with a confirmation dialog; validated add-user and settings forms (including password change); reports with date/category filters and CSV export; alerts.

**Data lives in localStorage: demonstration storage, not a secure production database. The password form stores nothing.**

## Semantic HTML and accessibility
See [docs/accessibility.md](docs/accessibility.md) for the implementation and keyboard test procedure.

## Component architecture
`components/header.html`, `sidebar.html` and `footer.html` are fetched by `js/main.js` into `data-include` placeholders on every page. Cards, tables, forms, buttons and alerts are shared CSS classes; `EAD.notify` (alerts) and `EAD.confirm` (modal) are shared helpers.

## Folder structure
`index.html`, `pages/`, `components/`, `css/`, `js/`, `assets/images/`, `docs/`.

## Run (Windows 11 PowerShell)
Components load with `fetch`, so use a local server (not double-click):

```powershell
cd semantic-dashboard
python -m http.server 8080
Start-Process http://localhost:8080
```
(or `npx serve .`)

## Validate HTML
Open https://validator.w3.org/nu/ and use "Check by text input" with each page's source. Because components are injected by JavaScript, also validate the rendered DOM (DevTools, copy outerHTML). Offline: `npx vnu-jar` (requires Java).

**Status: W3C validation pending, not yet run.**

## Screenshots
Pending: add captures to `assets/images/` and link them here.

## Future enhancements
Backend and authentication, pagination, i18n, automated axe-core tests.
