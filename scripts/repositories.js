const repoTable = document.getElementById("repositoriesTable");

fetch(
  `https://raw.githubusercontent.com/${username}/${username}/main/repositories.json`
)
  .then((response) => response.json())
  .then((customRepos) => {
    // Clear existing content
    repoTable.innerHTML = "";
    repoTable.style.borderCollapse = "collapse";
    repoTable.style.margin = "0 auto";

    // Create table head
    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");

    // Repository column
    const repoHeader = document.createElement("th");
    repoHeader.style.textAlign = "center";
    repoHeader.textContent = "Repository";
    headerRow.appendChild(repoHeader);

    // Commits column
    const commitsHeader = document.createElement("th");
    commitsHeader.style.textAlign = "center";
    commitsHeader.textContent = "Commits";
    headerRow.appendChild(commitsHeader);

    thead.appendChild(headerRow);
    repoTable.appendChild(thead);

    // Create body
    const tbody = document.createElement("tbody");

    Object.keys(customRepos).forEach((repoUrl) => {
      const row = document.createElement("tr");

      const cellName = document.createElement("td");
      cellName.style.textAlign = "left";

      // Get repo name from URL
      const repoName = repoUrl.split("/").pop();
      cellName.innerHTML = `<a href="${repoUrl}" target="_blank">${repoName}</a>`;
      row.appendChild(cellName);

      // Commits cell
      const cellCommits = document.createElement("td");
      cellCommits.style.textAlign = "center";
      cellCommits.textContent = customRepos[repoUrl]["userCommits"];
      row.appendChild(cellCommits);

      tbody.appendChild(row);
    });

    repoTable.appendChild(tbody);
  })
  .catch((error) => {
    console.warn(
      "No custom repositories.json found or failed to load it.",
      error
    );
  });
