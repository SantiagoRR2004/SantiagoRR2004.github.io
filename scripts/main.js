let languagesColors = {};
let customRepos = {};
let username = "";

async function init() {
  const currentUrl = window.location.href;
  const urlParts = new URL(currentUrl);

  username = urlParts.hostname.split(".")[0];

  // Change the title of the head and page to include the username
  document.title = `${username}`;
  document.getElementById("mainTitle").textContent = `${username}`;
  document.getElementById("mainTitle").style.textAlign = "center";
  document.getElementById("mainTitle").style.margin = "0 auto";

  const languagesPromise = fetch(
    `https://raw.githubusercontent.com/github-linguist/linguist/refs/heads/main/lib/linguist/languages.yml`
  )
    .then((response) => response.text())
    .then((yamlText) => {
      const languagesData = jsyaml.load(yamlText);

      // Fill in the languagesColors dictionary
      for (const [languageName, languageInfo] of Object.entries(
        languagesData
      )) {
        if (languageInfo && languageInfo.color) {
          languagesColors[languageName] = languageInfo.color;
        }
      }
    })
    .catch((error) => {
      console.warn(
        "No custom repositories.json found or failed to load it.",
        error
      );
    });

  // Fetch custom repositories.json if it exists
  const reposPromise = fetch(
    `https://raw.githubusercontent.com/${username}/${username}/main/repositories.json`
  )
    .then((response) => response.json())
    .then((data) => {
      customRepos = data;

      // Try to find the properly capitalized username
      Object.keys(customRepos).forEach((repoUrl) => {
        const url = new URL(repoUrl);
        const repoOwner = url.pathname.split("/")[1];
        if (repoOwner.toLowerCase() === username.toLowerCase()) {
          username = repoOwner;
          // Exit the loop
          return;
        }
      });
    })
    .catch((error) => {
      console.warn(
        "No custom repositories.json found or failed to load it.",
        error
      );
    });

  await Promise.all([languagesPromise, reposPromise]);
}

appReady = init();
