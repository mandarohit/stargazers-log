# Stargazers Log

A portfolio-style GitHub profile page that displays a developer's public profile information, repository statistics, and project cards using the GitHub API.

## Overview

This project is designed to be used as a profile landing page or personal portfolio section for GitHub. It fetches:

- profile details (avatar, name, bio, links)
- public repository metadata
- stars, forks, and language information
- responsive project cards for portfolio display

## Features

- Clean profile header with avatar and bio
- Repository grid with project descriptions
- Language color badges
- Stats cards for repos, followers, and following
- Fallback data support if the GitHub API is unavailable
- Lightweight static site setup

## Project structure

- `index.html` — page structure
- `style.css` — visual styling and layout
- `script.js` — GitHub API calls and rendering logic
- `events.json` — fallback repository data

## Run locally

You can open the page directly in a browser, or serve it locally for easier testing:

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## Notes

- The page fetches data from the GitHub REST API using the configured profile.
- Private repositories are filtered out.
- The repository itself is excluded from the project list to avoid self-promotion in the generated portfolio.

## Example use

This page is especially useful for creating a polished GitHub profile experience that highlights public work, active projects, and portfolio-ready repositories.
