function formatPercentage(value) {
  return (value * 100).toFixed(2) + "%";
}

function formatBytes(num) {
  const units = ["B", "kB", "MB", "GB", "TB"];
  for (let i = 0; i < units.length; i++) {
    if (num < 1024) {
      return `${num.toFixed(1)} ${units[i]}`;
    }
    num /= 1024;
  }
  return `${num.toFixed(1)} PB`;
}
