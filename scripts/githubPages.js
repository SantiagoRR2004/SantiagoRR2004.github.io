appReady.then(() => {
  const pagesList = document.getElementById("pagesList");
  pagesList.innerHTML = "";

  Object.keys(customRepos).forEach((repoUrl) => {
    const repoName = repoUrl.split("/").slice(-1)[0];
    if (repoName.toLowerCase() === `${username}.github.io`.toLowerCase()) {
      // This is the main GitHub Pages repo, skip it
      return;
    }
    const owner = repoUrl.split("/").at(-2);
    const pagesUrl = `https://${owner}.github.io/${repoName}/`;

    // Check if the GitHub Pages URL exists
    fetch(pagesUrl, { method: "HEAD" }) // Use HEAD to check without downloading full content
      .then((res) => {
        if (res.ok) {
          // not a 404
          const li = document.createElement("li");
          li.innerHTML = `<a href="${pagesUrl}" target="_blank">${repoName}</a>`;
          pagesList.appendChild(li);
        } else {
          console.log(`Could not find deployment at ${pagesUrl}`);
        }
      })
      .catch((err) => {
        console.log(`Could not find deployment at ${pagesUrl}`);
      });
  });
});
