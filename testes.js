import { getSheetIdFromUrl, getUrlFromSheetId } from "./utils.js";
export function testerURL(){
	const url = "https://docs.google.com/spreadsheets/d/1P7oM4sAkM87rDaaJtDM5WSxZW-ow5d4wA68dd8cozTo/edit?gid=0#gid=0";
	const id = getSheetIdFromUrl(url);
	const vraiID = "1P7oM4sAkM87rDaaJtDM5WSxZW-ow5d4wA68dd8cozTo";
	const newUrl = getUrlFromSheetId(id);
	const vraiurl =  "https://docs.google.com/spreadsheets/d/1P7oM4sAkM87rDaaJtDM5WSxZW-ow5d4wA68dd8cozTo/edit";
	console.assert(id == vraiID, `différence d'id: ${id}, ${vraiID}`);
	console.assert(newUrl == vraiurl, `différence d'url: ${newUrl}, ${vraiurl}`);
}
