const profileUrl = "https://api.github.com/users/mandarohit";
const reposUrl = `${profileUrl}/repos?sort=updated&per_page=100`;
const maxReposToShow = 50;

function formatNumber(value) {
  return new Intl.NumberFormat("en-US", {
    notation: value >= 1000 ? "compact" : "standard",
  }).format(value || 0);
}

function renderProfile(user) {
  const avatar = document.querySelector("#avatar");
  const name = document.querySelector("#name");
  const bio = document.querySelector("#bio");
  const profileLink = document.querySelector("#profile-link");

  avatar.src = user.avatar_url;
  avatar.alt = `${user.login} avatar`;
  name.textContent = user.name || user.login;
  bio.textContent = user.bio || "Building practical products, data-driven insights, and creative engineering experiments.";
  profileLink.href = user.html_url;
}

function renderStats(user) {
  const stats = document.querySelector("#stats");

  const items = [
    { label: "Repositories", value: formatNumber(user.public_repos) },
    { label: "Followers", value: formatNumber(user.followers) },
    { label: "Following", value: formatNumber(user.following) },
    { label: "GitHub URL", value: "Profile" },
  ];

  stats.innerHTML = items
    .map(
      (item) => `
        <div class="stat-card">
          <span class="stat-label">${item.label}</span>
          <strong class="stat-value">${item.value}</strong>
        </div>
      `
    )
    .join("");
}

function renderRepos(repos) {
  const container = document.querySelector("#repos");

  if (!repos.length) {
    container.innerHTML = '<div class="empty-state">No public repositories are available to display right now.</div>';
    return;
  }

  const sortedRepos = [...repos]
    .filter((repo) => !repo.private)
    .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
    .slice(0, maxReposToShow);

  container.innerHTML = sortedRepos
    .map(
      (repo) => `
        <article class="repo-card">
          <div class="repo-header">
            <div class="repo-name-wrap">
              <span class="repo-icon">◈</span>
              <a href="${repo.html_url}" target="_blank" rel="noreferrer">${repo.name}</a>
            </div>
            <span class="repo-visibility">${repo.fork ? "Fork" : "Public"}</span>
          </div>

          <p class="repo-description">${repo.description || "A project focused on learning, experimentation, and practical software building."}</p>

          <div class="repo-meta">
            <span class="language-dot" style="background:${repo.language ? getLanguageColor(repo.language) : "#8b5cf6"};"></span>
            <span>${repo.language || "Repository"}</span>
            <span>★ ${formatNumber(repo.stargazers_count)}</span>
            <span>⎇ ${formatNumber(repo.forks_count)}</span>
          </div>
        </article>
      `
    )
    .join("");
}

function getLanguageColor(language) {
  const languageColors = {
    JavaScript: "#f1e05a",
    TypeScript: "#3178c6",
    HTML: "#e34c26",
    CSS: "#563d7c",
    Python: "#3572A5",
    Java: "#b07219",
    Markdown: "#083fa1",
    Shell: "#89e051",
    PHP: "#4F5D95",
    Ruby: "#701516",
    C: "#555555",
    "C++": "#f34b7d",
    Go: "#00ADD8",
    Rust: "#dea584",
    "Jupyter Notebook": "#DA5B0B",
  };

  return languageColors[language] || "#8b5cf6";
}

async function fetchJson(url, options = {}) {
  const response = await fetch(url, {
    headers: {
      Accept: "application/vnd.github+json",
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }

  return response.json();
}

async function loadFallbackData() {
  const response = await fetch("events.json");
  if (!response.ok) {
    throw new Error("Fallback data unavailable");
  }

  return response.json();
}

async function loadPortfolio() {
  try {
    const [user, repos] = await Promise.all([
      fetchJson(profileUrl),
      fetchJson(reposUrl),
    ]);

    renderProfile(user);
    renderStats(user);
    renderRepos(repos.filter((repo) => !repo.private && repo.name !== "stargazers-log"));
  } catch (error) {
    try {
      const fallbackProjects = await loadFallbackData();
      const fallbackUser = {
        avatar_url: "https://avatars.githubusercontent.com/u/243554805?v=4",
        name: "Rohit Manda",
        login: "mandarohit",
        bio: "Building practical products, data-driven insights, and creative engineering experiments.",
        html_url: "https://github.com/mandarohit",
        public_repos: fallbackProjects.length,
        followers: 0,
        following: 0,
      };

      renderProfile(fallbackUser);
      renderStats(fallbackUser);
      renderRepos(
        fallbackProjects.map((repo) => ({
          name: repo.name,
          html_url: repo.url,
          description: repo.description,
          language: repo.language,
          stargazers_count: repo.stargazers_count || 0,
          forks_count: repo.forks_count || 0,
          private: false,
          fork: false,
          updated_at: new Date().toISOString(),
        })).slice(0, maxReposToShow)
      );
    } catch {
      renderProfile({
        avatar_url: "https://avatars.githubusercontent.com/u/243554805?v=4",
        name: "Rohit Manda",
        login: "mandarohit",
        bio: "GitHub profile data is unavailable right now.",
        html_url: "https://github.com/mandarohit",
        public_repos: 0,
        followers: 0,
        following: 0,
      });
      renderStats({ public_repos: 0, followers: 0, following: 0 });
      renderRepos([]);
    }
  }
}

document.addEventListener("DOMContentLoaded", loadPortfolio);
