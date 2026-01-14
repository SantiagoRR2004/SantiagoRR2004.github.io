let languagesColors = {};
let customRepos = {};
let username = "";

async function init() {
  const currentUrl = window.location.href;
  const urlParts = new URL(currentUrl);

  username = urlParts.hostname.split(".")[0];

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

  // Fetch the user's profile data to set the favicon
  const faviconPromise = fetch(`https://api.github.com/users/${username}`)
    .then((response) => response.json())
    .then((data) => {
      if (data && data.avatar_url) {
        const link =
          document.querySelector("link[rel~='icon']") ||
          document.createElement("link");
        link.rel = "icon";
        link.href = data.avatar_url;
        document.getElementsByTagName("head")[0].appendChild(link);
      }
    })
    .catch((error) => {
      console.warn("Failed to fetch user profile data.", error);
    });

  await Promise.all([languagesPromise, reposPromise, faviconPromise]);

  // Change the title of the head and page to include the username
  document.title = `${username}`;
  document.getElementById("mainTitle").textContent = `${username}`;
  document.getElementById("mainTitle").style.textAlign = "center";
  document.getElementById("mainTitle").style.margin = "0 auto";
}

appReady = init();
