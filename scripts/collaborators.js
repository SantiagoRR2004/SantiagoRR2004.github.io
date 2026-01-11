appReady.then(() => {
  const collaboratorsTable = document.getElementById("collaboratorsTable");

  // Clear existing content
  collaboratorsTable.innerHTML = "";
  collaboratorsTable.style.borderCollapse = "collapse";
  collaboratorsTable.style.margin = "0 auto";
  collaboratorsTable.style.width = "100%";
  // collaboratorsTable.style.borderRadius = "50%";

  let collaborators = {};

  // Gather collaborator data from customRepos
  Object.keys(customRepos).forEach((repo) => {
    const repoData = customRepos[repo];
    let nContributors = Object.keys(repoData["contributors"]).length;

    if (repoData["userCommits"] > 0) {
      // Include the main user as a contributor
      nContributors += 1;
    }

    let totalBytes = 0;
    Object.keys(repoData["languages"]).forEach((lang) => {
      totalBytes += repoData["languages"][lang];
    });

    Object.keys(repoData["contributors"]).forEach((contributorID) => {
      if (!collaborators[contributorID]) {
        collaborators[contributorID] = {
          ncolab: 0,
          username: repoData["contributors"][contributorID],
          bytes: 0,
        };
      }
      collaborators[contributorID]["ncolab"] += 1;
      collaborators[contributorID]["bytes"] += totalBytes / nContributors || 0;
    });
  });

  // Sort collaborators by nColab descending and then username ascending
  const sortedCollaborators = Object.entries(collaborators).sort((a, b) => {
    if (b[1].ncolab === a[1].ncolab) {
      return a[1].username.localeCompare(b[1].username);
    }
    return b[1].ncolab - a[1].ncolab;
  });

  console.log(sortedCollaborators);

  // Create table head
  const thead = document.createElement("thead");
  const headerRow = document.createElement("tr");
  headerRow.style.fontWeight = "bold";

  // Profile Picture column
  const profileHeader = document.createElement("th");
  profileHeader.style.textAlign = "center";
  profileHeader.textContent = "";
  headerRow.appendChild(profileHeader);

  // User column
  const userHeader = document.createElement("th");
  userHeader.style.textAlign = "center";
  userHeader.textContent = "User";
  headerRow.appendChild(userHeader);

  // Number of Collaborations column
  const nColabHeader = document.createElement("th");
  nColabHeader.style.textAlign = "center";
  nColabHeader.textContent = "Collaborations";
  nColabHeader.footerAggregator = sum;
  headerRow.appendChild(nColabHeader);

  // Bytes column
  const bytesHeader = document.createElement("th");
  bytesHeader.style.textAlign = "center";
  bytesHeader.textContent = "Bytes";
  bytesHeader.formatter = formatBytes;
  bytesHeader.footerAggregator = sum;
  headerRow.appendChild(bytesHeader);

  // Append header row to thead
  thead.appendChild(headerRow);
  collaboratorsTable.appendChild(thead);

  // Create body
  const tbody = document.createElement("tbody");

  sortedCollaborators.forEach(([collabID, collabData]) => {
    const row = document.createElement("tr");
    const profileUrl = `https://github.com/` + collabData["username"];
    const profileImageUrl = `https://avatars.githubusercontent.com/u/${collabID}`;

    // Profile Picture cell
    const cellProfile = document.createElement("td");
    cellProfile.style.textAlign = "right";
    cellProfile.dataset.originalValue = collabID;
    const link = document.createElement("a");
    link.href = profileUrl;
    link.target = "_blank";
    const profileImg = document.createElement("img");
    profileImg.src = profileImageUrl;
    profileImg.alt = collabData["username"];
    profileImg.style.height = "1em";
    profileImg.style.borderRadius = "50%";
    link.appendChild(profileImg);
    cellProfile.appendChild(link);
    row.appendChild(cellProfile);

    // User cell
    const cellUser = document.createElement("td");
    cellUser.style.textAlign = "left";
    cellUser.innerHTML =
      `<a href="` +
      profileUrl +
      `" target="_blank">` +
      collabData["username"] +
      `</a>`;
    row.appendChild(cellUser);

    // Number of Collaborations cell
    const cellNColab = document.createElement("td");
    cellNColab.style.textAlign = "center";
    cellNColab.dataset.originalValue = collabData["ncolab"];
    cellNColab.textContent = collabData["ncolab"];
    row.appendChild(cellNColab);

    // Bytes cell
    const cellBytes = document.createElement("td");
    cellBytes.style.textAlign = "center";
    cellBytes.dataset.originalValue = collabData["bytes"];
    cellBytes.textContent = bytesHeader.formatter(collabData["bytes"]);
    row.appendChild(cellBytes);

    // Append the row to the tbody
    tbody.appendChild(row);
  });

  // Add the body to the table
  collaboratorsTable.appendChild(tbody);
});
