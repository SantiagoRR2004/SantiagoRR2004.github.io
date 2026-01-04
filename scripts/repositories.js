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

    // Author column
    const authorHeader = document.createElement("th");
    authorHeader.style.textAlign = "center";
    authorHeader.textContent = "Author";
    headerRow.appendChild(authorHeader);

    // Repository column
    const repoHeader = document.createElement("th");
    repoHeader.style.textAlign = "center";
    repoHeader.textContent = "Repository";
    headerRow.appendChild(repoHeader);

    // Stars column
    const starsHeader = document.createElement("th");
    starsHeader.style.textAlign = "center";
    starsHeader.textContent = "Stars";
    headerRow.appendChild(starsHeader);

    // Forks column
    const forksHeader = document.createElement("th");
    forksHeader.style.textAlign = "center";
    forksHeader.textContent = "Forks";
    headerRow.appendChild(forksHeader);

    // Contributors column
    const contributorsHeader = document.createElement("th");
    contributorsHeader.style.textAlign = "center";
    contributorsHeader.textContent = "Contributors";
    headerRow.appendChild(contributorsHeader);

    // Commits column
    const commitsHeader = document.createElement("th");
    commitsHeader.style.textAlign = "center";
    commitsHeader.textContent = "Commits";
    headerRow.appendChild(commitsHeader);

    // Total commits column
    const totalCommitsHeader = document.createElement("th");
    totalCommitsHeader.style.textAlign = "center";
    totalCommitsHeader.textContent = "Total Commits";
    headerRow.appendChild(totalCommitsHeader);

    // Commit Percentage column
    const commitPercentageHeader = document.createElement("th");
    commitPercentageHeader.style.textAlign = "center";
    commitPercentageHeader.textContent = "Commit Percentage";
    headerRow.appendChild(commitPercentageHeader);

    // Language column
    const languageHeader = document.createElement("th");
    languageHeader.style.textAlign = "center";
    languageHeader.textContent = "Language";
    headerRow.appendChild(languageHeader);

    // Issues column
    const issuesHeader = document.createElement("th");
    issuesHeader.style.textAlign = "center";
    issuesHeader.textContent = "Issues";
    headerRow.appendChild(issuesHeader);

    // Total Issues column
    const totalIssuesHeader = document.createElement("th");
    totalIssuesHeader.style.textAlign = "center";
    totalIssuesHeader.textContent = "Total Issues";
    headerRow.appendChild(totalIssuesHeader);

    // Issue Percentage column
    const issuePercentageHeader = document.createElement("th");
    issuePercentageHeader.style.textAlign = "center";
    issuePercentageHeader.textContent = "Issue Percentage";
    headerRow.appendChild(issuePercentageHeader);

    // Pull Requests column
    const prHeader = document.createElement("th");
    prHeader.style.textAlign = "center";
    prHeader.textContent = "Pull Requests";
    headerRow.appendChild(prHeader);

    // Total PRs column
    const totalPrHeader = document.createElement("th");
    totalPrHeader.style.textAlign = "center";
    totalPrHeader.textContent = "Total PRs";
    headerRow.appendChild(totalPrHeader);

    // PR Percentage column
    const prPercentageHeader = document.createElement("th");
    prPercentageHeader.style.textAlign = "center";
    prPercentageHeader.textContent = "PR Percentage";
    headerRow.appendChild(prPercentageHeader);

    thead.appendChild(headerRow);
    repoTable.appendChild(thead);

    // Create body
    const tbody = document.createElement("tbody");

    Object.keys(customRepos).forEach((repoUrl) => {
      const row = document.createElement("tr");

      // Get repo name from URL
      const repoName = repoUrl.split("/").pop();
      const authorUsername = repoUrl.split("/").slice(-2, -1)[0];
      const authorUrl = repoUrl.split("/").slice(0, -1).join("/");

      // Author cell
      const cellAuthor = document.createElement("td");
      cellAuthor.style.textAlign = "left";
      if (authorUsername.toLowerCase() === username.toLowerCase()) {
        cellAuthor.innerHTML = "";
      } else {
        cellAuthor.innerHTML =
          '<a href="' +
          authorUrl +
          '" target="_blank">' +
          authorUsername +
          "</a>";
      }
      row.appendChild(cellAuthor);

      // Repository cell
      const cellName = document.createElement("td");
      cellName.style.textAlign = "left";
      cellName.innerHTML = `<a href="${repoUrl}" target="_blank">${repoName}</a>`;
      row.appendChild(cellName);

      // Stars cell
      const cellStars = document.createElement("td");
      cellStars.style.textAlign = "center";
      cellStars.textContent = customRepos[repoUrl]["stars"];
      row.appendChild(cellStars);

      // Forks cell
      const cellForks = document.createElement("td");
      cellForks.style.textAlign = "center";
      cellForks.textContent = customRepos[repoUrl]["forks"];
      row.appendChild(cellForks);

      // Contributors cell
      const cellContributors = document.createElement("td");
      cellContributors.style.textAlign = "center";
      cellContributors.textContent = customRepos[repoUrl]["contributors"];
      row.appendChild(cellContributors);

      // Commits cell
      const cellCommits = document.createElement("td");
      cellCommits.style.textAlign = "center";
      cellCommits.textContent = customRepos[repoUrl]["userCommits"];
      row.appendChild(cellCommits);

      // Total commits cell
      const cellTotalCommits = document.createElement("td");
      cellTotalCommits.style.textAlign = "center";
      cellTotalCommits.textContent = customRepos[repoUrl]["commits"];
      row.appendChild(cellTotalCommits);

      // Commit Percentage cell
      const cellCommitPercentage = document.createElement("td");
      cellCommitPercentage.style.textAlign = "center";
      const percentage =
        (customRepos[repoUrl]["userCommits"] /
          customRepos[repoUrl]["commits"]) *
          100 || 0;
      cellCommitPercentage.textContent = percentage.toFixed(2) + "%";
      row.appendChild(cellCommitPercentage);

      // Language cell
      const cellLanguage = document.createElement("td");
      cellLanguage.style.textAlign = "center";
      const languages = customRepos[repoUrl]["languages"];
      if (languages && Object.keys(languages).length > 0) {
        const primaryLanguage = Object.keys(languages).reduce((a, b) =>
          languages[a] > languages[b] ? a : b
        );
        cellLanguage.textContent = primaryLanguage;
      } else {
        cellLanguage.textContent = "";
      }
      row.appendChild(cellLanguage);

      // Issues cell
      const cellIssues = document.createElement("td");
      cellIssues.style.textAlign = "center";
      cellIssues.textContent = customRepos[repoUrl]["userIssues"];
      row.appendChild(cellIssues);

      // Total Issues cell
      const cellTotalIssues = document.createElement("td");
      cellTotalIssues.style.textAlign = "center";
      cellTotalIssues.textContent = customRepos[repoUrl]["issues"];
      row.appendChild(cellTotalIssues);

      // Issue Percentage cell
      const cellIssuePercentage = document.createElement("td");
      cellIssuePercentage.style.textAlign = "center";
      const issuePercentage =
        (customRepos[repoUrl]["userIssues"] / customRepos[repoUrl]["issues"]) *
          100 || 0;
      cellIssuePercentage.textContent = issuePercentage.toFixed(2) + "%";
      row.appendChild(cellIssuePercentage);

      // Pull Requests cell
      const cellPRs = document.createElement("td");
      cellPRs.style.textAlign = "center";
      cellPRs.textContent = customRepos[repoUrl]["userPullRequests"];
      row.appendChild(cellPRs);

      // Total PRs cell
      const cellTotalPRs = document.createElement("td");
      cellTotalPRs.style.textAlign = "center";
      cellTotalPRs.textContent = customRepos[repoUrl]["pullRequests"];
      row.appendChild(cellTotalPRs);

      // PR Percentage cell
      const cellPRPercentage = document.createElement("td");
      cellPRPercentage.style.textAlign = "center";
      const prPercentage =
        (customRepos[repoUrl]["userPullRequests"] /
          customRepos[repoUrl]["pullRequests"]) *
          100 || 0;
      cellPRPercentage.textContent = prPercentage.toFixed(2) + "%";
      row.appendChild(cellPRPercentage);

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
