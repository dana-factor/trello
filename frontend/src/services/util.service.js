export const utilService = {
    formatTime,
    getDateShort,
    makeId
}

function formatTime(timestamp) {
    const date = new Date(timestamp)
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const hour = (date.getHours() < 10) ? '0' + date.getHours() : date.getHours();
    const min = (date.getMinutes() < 10) ? '0' + date.getMinutes() : date.getMinutes();
   return `${month} ${day} at ${hour}:${min}`;
}

function getDateShort(timestamp) {
    const date = new Date(timestamp)
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    const day = date.getDate();
    const month = months[date.getMonth()];
    return  `${month} ${day}`;
}
function makeId(length = 5) {
	var txt = '';
	var possible =
		'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	for (let i = 0; i < length; i++) {
		txt += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return txt;
}