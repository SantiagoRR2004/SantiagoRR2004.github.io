const currentUrl = window.location.href;
const urlParts = new URL(currentUrl);

const username = urlParts.hostname.split(".")[0];

// Change the title of the head and page to include the username
document.title = `${username}`;
document.getElementById("mainTitle").textContent = `${username}`;
document.getElementById("mainTitle").style.textAlign = "center";
document.getElementById("mainTitle").style.margin = "0 auto";
