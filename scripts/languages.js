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

  thead.appendChild(headerRow);
  languagesTable.appendChild(thead);

  // All the files
  let totalBytes = 0;

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
        totalBytes += languages[lang];
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

    // Change background if color is known
    if (languagesColors[lang]) {
      // Opacity to 50%
      row.style.backgroundColor = languagesColors[lang] + "80";
    }

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

    // Percentage cell
    const cellPercentage = document.createElement("td");
    cellPercentage.style.textAlign = "center";
    const percentageValue = languageSize[lang] / totalBytes;
    cellPercentage.dataset.originalValue = percentageValue;
    cellPercentage.textContent = percentageHeader.formatter(percentageValue);
    row.appendChild(cellPercentage);

    tbody.appendChild(row);
  });

  // Add the body to the table
  languagesTable.appendChild(tbody);
});
