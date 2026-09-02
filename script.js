function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, c => ({
    "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#039;"
  }[c]));
}

function storyUrl(article) {
  return `article.html?id=${encodeURIComponent(article.id)}`;
}

function imageOrPlaceholder(path, title) {
  return `<img src="${escapeHtml(path)}" alt="${escapeHtml(title)}" onerror="this.style.display='none';">`;
}

const sorted = [...articles].sort((a, b) => new Date(b.date) - new Date(a.date));

const top = document.getElementById("top-stories");
const cards = document.getElementById("story-cards");

if (top && sorted.length) {
  const featured = sorted[0];
  const side = sorted.slice(1, 4);

  top.innerHTML = `
    <a class="feature" href="${storyUrl(featured)}">
      ${imageOrPlaceholder(featured.image, featured.title)}
      <div class="feature-content">
        <span class="kicker">${escapeHtml(featured.category)} · ${escapeHtml(featured.date)}</span>
        <h2>${escapeHtml(featured.title)}</h2>
        <p>${escapeHtml(featured.description)}</p>
      </div>
    </a>
    <div class="side-stories">
      ${side.map(article => `
        <a class="side-story" href="${storyUrl(article)}">
          ${imageOrPlaceholder(article.image, article.title)}
          <div class="side-story-content">
            <span class="kicker">${escapeHtml(article.category)}</span>
            <h3>${escapeHtml(article.title)}</h3>
          </div>
        </a>
      `).join("")}
    </div>
  `;

  cards.innerHTML = sorted.slice(4, 7).map(article => `
    <a class="card" href="${storyUrl(article)}">
      ${imageOrPlaceholder(article.image, article.title)}
      <div class="card-content">
        <span class="kicker">${escapeHtml(article.category)} · ${escapeHtml(article.date)}</span>
        <h3>${escapeHtml(article.title)}</h3>
        <p>${escapeHtml(article.description)}</p>
      </div>
    </a>
  `).join("");
}
