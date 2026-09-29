# stargazers-log

A simple web app to track and display the repositories you've starred on GitHub.

## What it does

Displays a personal log of repositories you've starred, showing the repository name and the date you starred it. Perfect for keeping a browsable history of your GitHub favorites.

## Quick start

1. Clone the repo
2. Update `events.json` with your starred repositories
3. Open `index.html` in a browser (or serve via HTTP)

That's it—no build step, no dependencies.

## Files

- **index.html** — The page structure
- **script.js** — Fetches and renders `events.json` 
- **style.css** — Minimal styling
- **events.json** — Your starred repository data

## Data format

Add entries to `events.json` like this:

```json
[
  { "name": "owner/repo-name", "starred": "YYYY-MM-DD" },
  { "name": "another-owner/another-repo", "starred": "YYYY-MM-DD" }
]
