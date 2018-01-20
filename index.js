if (parent === top) {

	const style = document.createElement("style");
	style.innerText = `
.vjs-playback-rate::before {
    content: url(data:image/svg+xml;charset=utf-8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gU3ZnIFZlY3RvciBJY29ucyA6IGh0dHA6Ly93d3cub25saW5ld2ViZm9udHMuY29tL2ljb24gLS0+DQo8IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgMTAwMCAxMDAwIiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCAxMDAwIDEwMDAiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPGc+PGc+PHBhdGggZmlsbD0iIzU1NSIgZD0iTTkyOS41LDQ4MC40TDkxLjMsMTQuNmMtOS43LTUuNS0xOC02LjEtMjQuOS0xLjlDNTkuNSwxNi45LDU2LDI0LjUsNTYsMzUuNXY5MjkuMWMwLDEwLjksMy41LDE4LjUsMTAuNCwyMi43YzYuOSw0LjIsMTUuMywzLjYsMjQuOS0xLjlsODM4LjItNDY1LjhjOS43LTUuNSwxNC41LTEyLDE0LjUtMTkuNkM5NDQsNDkyLjQsOTM5LjIsNDg1LjksOTI5LjUsNDgwLjR6Ii8+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjwvZz4NCjwvc3ZnPg==);
    width: 32px !important;
    display: block;
    top: 8px !important;
    left: 13px !important;
}
.vjs-playback-rate {
	display: block !important;
}
.vjs-playback-rate-value {
	padding-top: 10px;
}
	`;
	document.body.appendChild(style);

	const button = document.querySelector(".vjs-playback-rate");
	const buttonValue = document.querySelector(".vjs-playback-rate-value");
	const video = document.querySelector("video");
	button.addEventListener("click", () => {
		video.playbackRate += 0.5;
		if (video.playbackRate > 4) video.playbackRate = 1;
		buttonValue.innerText = video.playbackRate;
	});
	button.addEventListener("contextmenu", (event) => {
		video.playbackRate -= 0.5;
		if (video.playbackRate < 1) video.playbackRate = 4;
		buttonValue.innerText = video.playbackRate;

		event.preventDefault();
		return false;
	});

}