// Add footer to all tables
function addFooterToTables() {
  const tables = document.querySelectorAll("table");

  tables.forEach((table) => {
    // Skip if table already has a footer or no header
    if (table.tFoot || !table.tHead) return;

    const headerRow = table.tHead.rows[0];
    if (!headerRow) return;

    const columnCount = headerRow.cells.length;
    const tbody = table.tBodies[0];

    // Create footer
    const tfoot = document.createElement("tfoot");
    const footerRow = document.createElement("tr");
    footerRow.style.fontWeight = "bold";

    // Add random value from each column
    for (let i = 0; i < columnCount; i++) {
      const cell = document.createElement("td");
      cell.style.textAlign = "center";
      cell.textContent = "";

      // Get all values from this column in tbody
      if (tbody && tbody.rows.length > 0) {
        let columnValues = [];

        for (let j = 0; j < tbody.rows.length; j++) {
          const cellValue = tbody.rows[j].cells[i];

          if (cellValue) {
            // Check if it has originalValue property
            if (cellValue.dataset.originalValue !== undefined) {
              columnValues.push(cellValue.dataset.originalValue);
              continue;
            } else {
              const text = cellValue.textContent.trim();
              columnValues.push(text);
            }
          }
        }

        const headerCell = headerRow.cells[i];
        // If the header has a footerAggregator function, use it
        if (headerCell.footerAggregator) {
          const aggregatedValue = headerCell.footerAggregator(columnValues);
          cell.textContent = aggregatedValue;
        }

        // If the header has a formatter function, apply it
        if (headerCell.formatter) {
          cell.textContent = headerCell.formatter(cell.textContent);
        }
      }

      footerRow.appendChild(cell);
    }

    tfoot.appendChild(footerRow);
    table.appendChild(tfoot);
  });
}

// Run when DOM is loaded
document.addEventListener("DOMContentLoaded", addFooterToTables);

// Watch for dynamically added tables
const observer = new MutationObserver(() => {
  addFooterToTables();
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
});

document.addEventListener("click", (event) => {
  const header = event.target.closest("th");
  if (!header) return;

  const table = header.closest("table");
  if (!table) return;

  const columnIndex = Array.from(header.parentElement.children).indexOf(header);
  if (columnIndex === -1) return;

  const tbody = table.tBodies[0];
  if (!tbody) return;

  const rows = Array.from(tbody.rows);
  const ascending = header.dataset.sort !== "asc";

  rows.sort((a, b) => {
    const aCell = a.cells[columnIndex];
    const bCell = b.cells[columnIndex];

    // Use originalValue when possible
    const aRaw =
      aCell && aCell.dataset && aCell.dataset.originalValue !== undefined
        ? aCell.dataset.originalValue
        : aCell
        ? aCell.textContent.trim()
        : "";
    const bRaw =
      bCell && bCell.dataset && bCell.dataset.originalValue !== undefined
        ? bCell.dataset.originalValue
        : bCell
        ? bCell.textContent.trim()
        : "";

    const aNum = parseFloat(aRaw);
    const bNum = parseFloat(bRaw);

    if (!isNaN(aNum) && !isNaN(bNum)) {
      return ascending ? aNum - bNum : bNum - aNum;
    }

    return ascending
      ? aRaw.localeCompare(bRaw, undefined, { numeric: true, sensitivity: "base" })
      : bRaw.localeCompare(aRaw, undefined, { numeric: true, sensitivity: "base" });
  });

  header.dataset.sort = ascending ? "asc" : "desc";
  rows.forEach((row) => tbody.appendChild(row));
});

function average(numbers) {
  const validNumbers = numbers
    .map((num) => parseFloat(num))
    .filter((num) => !isNaN(num));

  let total = 0;
  validNumbers.forEach((num) => {
    total += num;
  });

  return total / validNumbers.length || 0;
}

function sum(numbers) {
  const validNumbers = numbers
    .map((num) => parseFloat(num))
    .filter((num) => !isNaN(num));

  let total = 0;
  validNumbers.forEach((num) => {
    total += num;
  });

  return total;
}
