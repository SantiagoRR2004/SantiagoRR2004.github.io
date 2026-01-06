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
    const aText = a.cells[columnIndex].textContent.trim();
    const bText = b.cells[columnIndex].textContent.trim();

    const aNum = parseFloat(aText);
    const bNum = parseFloat(bText);

    if (!isNaN(aNum) && !isNaN(bNum)) {
      return ascending ? aNum - bNum : bNum - aNum;
    }

    return ascending
      ? aText.localeCompare(bText)
      : bText.localeCompare(aText);
  });

  header.dataset.sort = ascending ? "asc" : "desc";
  rows.forEach((row) => tbody.appendChild(row));
});
