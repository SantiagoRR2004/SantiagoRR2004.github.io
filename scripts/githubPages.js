const pagesList = document.getElementById("pagesList");

fetch(`https://api.github.com/users/${username}/repos?per_page=100`)
  .then((response) => response.json())
  .then((repos) => {
    pagesList.innerHTML = "";
    repos.forEach((repo) => {
      if (repo.name.toLowerCase() !== `${username}.github.io`.toLowerCase()) {
        const pagesUrl = `https://${username}.github.io/${repo.name}/`;

        // Check if the GitHub Pages URL exists
        fetch(pagesUrl, { method: "HEAD" }) // Use HEAD to check without downloading full content
          .then((res) => {
            if (res.ok) {
              // not a 404
              const li = document.createElement("li");
              li.innerHTML = `<a href="${pagesUrl}" target="_blank">${repo.name}</a>`;
              pagesList.appendChild(li);
            }
          })
          .catch((err) => {
            console.warn(`Could not check ${pagesUrl}`, err);
          });
      }
    });
  })
  .catch((error) => {
    pagesList.innerHTML = "Failed to load repositories.";
    console.error(error);
  });
