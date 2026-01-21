appReady.then(() => {
  const languagesTable = document.getElementById("languagesTable");

  // Clear existing content
  languagesTable.innerHTML = "";
  languagesTable.style.borderCollapse = "collapse";
  languagesTable.style.margin = "0 auto";
  languagesTable.style.width = "100%";

  // Create table head
  const thead = document.createElement("thead");
  const headerRow = document.createElement("tr");
  headerRow.style.fontWeight = "bold";

  // Language column
  const languageHeader = document.createElement("th");
  languageHeader.style.textAlign = "center";
  languageHeader.textContent = "Language";
  headerRow.appendChild(languageHeader);

  // Bytes column
  const bytesHeader = document.createElement("th");
  bytesHeader.style.textAlign = "center";
  bytesHeader.textContent = "Bytes";
  bytesHeader.formatter = formatBytes;
  bytesHeader.footerAggregator = sum;
  headerRow.appendChild(bytesHeader);

  // Percentage column
  const percentageHeader = document.createElement("th");
  percentageHeader.style.textAlign = "center";
  percentageHeader.textContent = "Percentage";
  percentageHeader.formatter = formatPercentage;
  percentageHeader.footerAggregator = sum;
  headerRow.appendChild(percentageHeader);

  // Bytes Owned column
  const bytesOwnedHeader = document.createElement("th");
  bytesOwnedHeader.style.textAlign = "center";
  bytesOwnedHeader.textContent = "Owned";
  bytesOwnedHeader.formatter = formatBytes;
  bytesOwnedHeader.footerAggregator = sum;
  headerRow.appendChild(bytesOwnedHeader);

  // Percentage Owned column
  const percentageOwnedHeader = document.createElement("th");
  percentageOwnedHeader.style.textAlign = "center";
  percentageOwnedHeader.textContent = "Percentage";
  percentageOwnedHeader.formatter = formatPercentage;
  percentageOwnedHeader.footerAggregator = average;
  headerRow.appendChild(percentageOwnedHeader);

  // Bytes Commits column
  const bytesCommitsHeader = document.createElement("th");
  bytesCommitsHeader.style.textAlign = "center";
  bytesCommitsHeader.textContent = "Commits";
  bytesCommitsHeader.formatter = formatBytes;
  bytesCommitsHeader.footerAggregator = sum;
  headerRow.appendChild(bytesCommitsHeader);

  // Percentage Commits column
  const percentageCommitsHeader = document.createElement("th");
  percentageCommitsHeader.style.textAlign = "center";
  percentageCommitsHeader.textContent = "Percentage";
  percentageCommitsHeader.formatter = formatPercentage;
  percentageCommitsHeader.footerAggregator = average;
  headerRow.appendChild(percentageCommitsHeader);

  // Bytes Contributed column
  const bytesContributedHeader = document.createElement("th");
  bytesContributedHeader.style.textAlign = "center";
  bytesContributedHeader.textContent = "By Contributor";
  bytesContributedHeader.formatter = formatBytes;
  bytesContributedHeader.footerAggregator = sum;
  headerRow.appendChild(bytesContributedHeader);

  // Percentage Contributed column
  const percentageContributedHeader = document.createElement("th");
  percentageContributedHeader.style.textAlign = "center";
  percentageContributedHeader.textContent = "Percentage";
  percentageContributedHeader.formatter = formatPercentage;
  percentageContributedHeader.footerAggregator = average;
  headerRow.appendChild(percentageContributedHeader);

  // Biggest Repository column
  const biggestRepoHeader = document.createElement("th");
  biggestRepoHeader.style.textAlign = "center";
  biggestRepoHeader.textContent = "Biggest Repository";
  headerRow.appendChild(biggestRepoHeader);

  // Number of repositories column
  const nReposHeader = document.createElement("th");
  nReposHeader.style.textAlign = "center";
  nReposHeader.textContent = "Repositories";
  // nReposHeader.footerAggregator = sum;
  headerRow.appendChild(nReposHeader);

  // Append header row to thead
  thead.appendChild(headerRow);
  languagesTable.appendChild(thead);

  // All the files
  let totalBytes = 0;

  // Calculate total bytes for each language
  let languageSize = {};
  let languageSizeOwned = {};
  let languageSizeCommits = {};
  let languageSizeContributed = {};
  let biggestRepository = {};
  let nRepositories = {};

  Object.keys(customRepos).forEach((repo) => {
    const languages = customRepos[repo]["languages"];
    const owner = repo.split("/").at(-2);
    const nContributors = Object.keys(customRepos[repo]["contributors"]).length;

    if (languages) {
      Object.keys(languages).forEach((lang) => {
        if (!languageSize[lang]) {
          languageSize[lang] = 0;
          languageSizeOwned[lang] = 0;
          languageSizeCommits[lang] = 0;
          languageSizeContributed[lang] = 0;
          biggestRepository[lang] = { repo: repo, size: 0 };
          nRepositories[lang] = 0;
        }
        languageSize[lang] += languages[lang];
        totalBytes += languages[lang];

        // Owned
        if (owner.toLowerCase() === username.toLowerCase()) {
          languageSizeOwned[lang] += languages[lang];
        }

        // Commits
        languageSizeCommits[lang] +=
          (languages[lang] * customRepos[repo]["userCommits"]) /
            customRepos[repo]["commits"] || 0;

        // Contributed
        languageSizeContributed[lang] +=
          languages[lang] /
            (nContributors + (customRepos[repo]["userCommits"] ? 1 : 0)) || 0;

        // Biggest Repository
        if (languages[lang] > biggestRepository[lang]["size"]) {
          biggestRepository[lang]["size"] = languages[lang];
          biggestRepository[lang]["repo"] = repo;
        }

        // Number of repositories
        nRepositories[lang] += 1;
      });
    }
  });

  // Sort languages by total size descending
  languageSize = Object.fromEntries(
    Object.entries(languageSize).sort((a, b) => b[1] - a[1]),
  );

  // Create body
  const tbody = document.createElement("tbody");

  Object.keys(languageSize).forEach((lang) => {
    const row = document.createElement("tr");

    // Language cell
    const cellLanguage = document.createElement("td");
    cellLanguage.style.textAlign = "center";
    cellLanguage.textContent = lang;
    row.appendChild(cellLanguage);

    // Change background if color is known
    if (languagesColors[lang]) {
      // Opacity to 50%
      row.style.backgroundColor = languagesColors[lang] + "80";
      cellLanguage.style.backgroundColor = languagesColors[lang];
    }

    // Bytes cell
    const cellBytes = document.createElement("td");
    cellBytes.style.textAlign = "center";
    cellBytes.dataset.originalValue = languageSize[lang];
    cellBytes.textContent = bytesHeader.formatter(languageSize[lang]);
    row.appendChild(cellBytes);

    // Percentage cell
    const cellPercentage = document.createElement("td");
    cellPercentage.style.textAlign = "center";
    const percentageValue = languageSize[lang] / totalBytes || 0;
    cellPercentage.dataset.originalValue = percentageValue;
    cellPercentage.textContent = percentageHeader.formatter(percentageValue);
    row.appendChild(cellPercentage);

    // Bytes Owned cell
    const cellBytesOwned = document.createElement("td");
    cellBytesOwned.style.textAlign = "center";
    cellBytesOwned.dataset.originalValue = languageSizeOwned[lang];
    cellBytesOwned.textContent = bytesOwnedHeader.formatter(
      languageSizeOwned[lang],
    );
    row.appendChild(cellBytesOwned);

    // Percentage Owned cell
    const cellPercentageOwned = document.createElement("td");
    cellPercentageOwned.style.textAlign = "center";
    const percentageOwnedValue =
      languageSizeOwned[lang] / languageSize[lang] || 0;
    cellPercentageOwned.dataset.originalValue = percentageOwnedValue;
    cellPercentageOwned.textContent =
      percentageOwnedHeader.formatter(percentageOwnedValue);
    row.appendChild(cellPercentageOwned);

    // Bytes Commits cell
    const cellBytesCommits = document.createElement("td");
    cellBytesCommits.style.textAlign = "center";
    cellBytesCommits.dataset.originalValue = languageSizeCommits[lang];
    cellBytesCommits.textContent = bytesCommitsHeader.formatter(
      languageSizeCommits[lang],
    );
    row.appendChild(cellBytesCommits);

    // Percentage Commits cell
    const cellPercentageCommits = document.createElement("td");
    cellPercentageCommits.style.textAlign = "center";
    const percentageCommitsValue =
      languageSizeCommits[lang] / languageSize[lang] || 0;
    cellPercentageCommits.dataset.originalValue = percentageCommitsValue;
    cellPercentageCommits.textContent = percentageCommitsHeader.formatter(
      percentageCommitsValue,
    );
    row.appendChild(cellPercentageCommits);

    // Bytes Contributed cell
    const cellBytesContributed = document.createElement("td");
    cellBytesContributed.style.textAlign = "center";
    cellBytesContributed.dataset.originalValue = languageSizeContributed[lang];
    cellBytesContributed.textContent = bytesContributedHeader.formatter(
      languageSizeContributed[lang],
    );
    row.appendChild(cellBytesContributed);

    // Percentage Contributed cell
    const cellPercentageContributed = document.createElement("td");
    cellPercentageContributed.style.textAlign = "center";
    const percentageContributedValue =
      languageSizeContributed[lang] / languageSize[lang] || 0;
    cellPercentageContributed.dataset.originalValue =
      percentageContributedValue;
    cellPercentageContributed.textContent =
      percentageContributedHeader.formatter(percentageContributedValue);
    row.appendChild(cellPercentageContributed);

    // Biggest Repository cell
    const cellBiggestRepo = document.createElement("td");
    cellBiggestRepo.style.textAlign = "left";
    const biggestRepoInfo = biggestRepository[lang];
    const biggestRepoUrl =
      `<a href="` +
      biggestRepoInfo["repo"] +
      `" target="_blank" style="color: inherit; text-decoration: none;">` +
      biggestRepoInfo["repo"].split("/").pop() +
      `</a>`;
    cellBiggestRepo.innerHTML = biggestRepoUrl;
    row.appendChild(cellBiggestRepo);

    // Number of repositories cell
    const cellNRepositories = document.createElement("td");
    cellNRepositories.style.textAlign = "center";
    cellNRepositories.dataset.originalValue = nRepositories[lang];
    cellNRepositories.textContent = nRepositories[lang];
    row.appendChild(cellNRepositories);

    // Append the row to the tbody
    tbody.appendChild(row);
  });

  // Add the body to the table
  languagesTable.appendChild(tbody);
});
