# Accessibility implementation

- Skip link, one `<main>` per page, one `<h1>`, ordered headings, `lang="en"`, viewport meta.
- Landmarks: `header`, `nav` (labelled), `aside`, `main`, `footer`; current page marked with `aria-current="page"`.
- Tables: `caption`, `th scope`, sortable headers expose `aria-sort`; scroll regions are focusable and labelled.
- Forms: visible `label`s, `fieldset`/`legend`, native `required`/`pattern`/`type`, errors linked via `aria-describedby`, `aria-invalid`, focus moved to first error, status/alert messages via `role="status"`/`role="alert"`.
- Modal: native `<dialog>` + `showModal()` gives focus move-in, focus trap, Escape to close and focus return to the opener. Titled with `aria-labelledby`/`aria-describedby`.
- Focus indicator is a 3px gold outline with a navy ring; navy/white palette; text-size setting; reduced-motion and forced-colors support. Contrast ratios have not been measured with a tool yet.

## Keyboard test
1. Tab from page load: the skip link appears first; Enter jumps to main content.
2. Tab through header, sidebar and content; every control shows a focus ring.
3. Users page: Tab/Enter on sort headers; Delete opens the dialog; Tab stays inside it; Esc closes and focus returns to Delete (or to the search box after a deletion).
4. Submit forms empty: focus lands on the first invalid field and errors are announced.
5. At 768px width or less, the Menu button toggles the sidebar (Esc closes it).

A screen reader pass (for example NVDA on Windows) is recommended and has NOT been performed.
