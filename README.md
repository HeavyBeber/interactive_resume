# Interactive Resume

This is a small static site that presents an interactive resume. The landing page shows a photo and name; clicking "Explore sections" opens a question UI where visitors pick what they want to see (Experience, Projects, Education, Skills, Contact).

Files:
- `index.html` — main page
- `styles.css` — styling
- `app.js` — interactive behavior and content data
- `assets/photo.svg` — placeholder photo

Quick test (Windows PowerShell):

```powershell
# from the project folder
python -m http.server 8000
# then open http://localhost:8000 in your browser
```

Next steps you might want:
- Replace `assets/photo.svg` with a real photo and update `state.name` in `app.js`.
- Add deeper interactions (filters, animations, route-like URLs).
- Deploy to GitHub Pages or Netlify.
