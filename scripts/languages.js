const languagesTable = document.getElementById("languagesTable");

fetch(
  `https://raw.githubusercontent.com/${username}/${username}/main/repositories.json`
)
  .then((response) => response.json())
  .then((customRepos) => {
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

    thead.appendChild(headerRow);
    languagesTable.appendChild(thead);

    // Calculate total bytes for each language
    let languageSize = {};
    Object.values(customRepos).forEach((repo) => {
      const languages = repo["languages"];
      if (languages) {
        Object.keys(languages).forEach((lang) => {
          if (!languageSize[lang]) {
            languageSize[lang] = 0;
          }
          languageSize[lang] += languages[lang];
        });
      }
    });

    // Sort languages by total size descending
    languageSize = Object.fromEntries(
      Object.entries(languageSize).sort((a, b) => b[1] - a[1])
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

      // Bytes cell
      const cellBytes = document.createElement("td");
      cellBytes.style.textAlign = "center";
      cellBytes.dataset.originalValue = languageSize[lang];
      cellBytes.textContent = bytesHeader.formatter(languageSize[lang]);
      row.appendChild(cellBytes);

      tbody.appendChild(row);
    });

    // Add the body to the table
    languagesTable.appendChild(tbody);
  })
  .catch((error) => {
    console.warn(
      "No custom repositories.json found or failed to load it.",
      error
    );
  });
