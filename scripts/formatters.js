function normalFormatter(number) {
  if (number === 0) return "";
  return number;
}


function formatPercentage(value) {
  if (value !== 0) {
    return (value * 100).toFixed(2) + "%";
  } else {
    return "";
  }
}

function formatBytes(num) {
  // Empty string for 0 bytes
  if (num === 0) return "";

  const units = ["B", "kB", "MB", "GB", "TB"];
  for (let i = 0; i < units.length; i++) {
    if (num < 1024) {
      return `${num.toFixed(1)} ${units[i]}`;
    }
    num /= 1024;
  }
  return `${num.toFixed(1)} PB`;
}

