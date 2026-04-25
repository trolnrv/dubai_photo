const logBox = document.getElementById("log");
export function log(msg) {
  console.log(msg);
  //logBox.innerText += msg + "\n";
}
export function getSheetIdFromUrl(url) {
  const match = url.match(/\/d\/([a-zA-Z0-9-_]+)/);
  return match ? match[1] : null;
}
export function getUrlFromSheetId(id) {
  return `https://docs.google.com/spreadsheets/d/${id}/edit`;
}
