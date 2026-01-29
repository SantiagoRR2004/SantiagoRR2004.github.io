function normalFormatter(number) {
  const num = typeof number === "string" ? parseFloat(number) : number;
  if (num === 0 || isNaN(num)) return "";
  return num.toFixed(2).replace(/\.?0+$/, "");
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

// Export for module usage
if (typeof module !== "undefined" && module.exports) {
  module.exports = { normalFormatter, formatPercentage, formatBytes };
}
