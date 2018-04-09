if (parent === top) {

	const style = document.createElement("style");
	style.innerText = `
.vjs-playback-rate::before {
    content: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2aWV3Qm94PSIwIDAgODk4LjMgODk4LjMiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPGc+DQo8cG9seWdvbiBwb2ludHM9IjEyMC4yLDg4Mi41IDU1My42LDQ0OS4yIDEyMC4yLDE1LjggMCwxMzYgMzEzLjIsNDQ5LjIgMCw3NjIuMyIgZmlsbD0iI2ZmZiIvPg0KPHBvbHlnb24gcG9pbnRzPSIzNDQuNyw3NjIuMyA0NjQuOSw4ODIuNSA4OTguMyw0NDkuMiA0NjQuOSwxNS44IDM0NC43LDEzNiA2NTcuOSw0NDkuMiIgZmlsbD0iI2ZmZiIvPg0KPC9nPg0KPC9zdmc+DQo=);
    width: 24px !important;
    display: block;
    top: 12px !important;
    left: 13px !important;
    opacity: calc(var(--base-opacity) + var(--add-opacity));
}
.vjs-playback-rate {
	display: block !important;
    --base-opacity: 0.2;
    --add-opacity: 0;
}
.vjs-playback-rate-value {
	padding-top: 10px;
    text-shadow: 0 0 3px black, 0 0 3px black;
}

.vjs-playback-rate[rate="1"] {
    --base-opacity: 0.2;
}
.vjs-playback-rate[rate="1.5"] {
    --base-opacity: 0.4;
}
.vjs-playback-rate[rate="2"] {
    --base-opacity: 0.6;
}
.vjs-playback-rate[rate="2.5"] {
    --base-opacity: 0.8;
}
.vjs-playback-rate[rate="3"] {
    --base-opacity: 1;
}
.vjs-playback-rate:hover {
    --add-opacity: 0.1;
}
	`;
	document.body.appendChild(style);

	let speed;

	chrome.storage.sync.get("VrvSpeedControls:speed", (data) => {
		speed = data["VrvSpeedControls:speed"] || speed;
	});

	let button;
	let buttonValue;

	setInterval(() => {
		const video = document.querySelector("video");

		speed = speed || video.playbackRate;

		const newButton = document.querySelector(".vjs-playback-rate");

		if (button !== newButton) {
			button = newButton;
			buttonValue = document.querySelector(".vjs-playback-rate-value");
			bind();
		}

		button.setAttribute("rate", buttonValue.innerText = video.playbackRate = speed);
	}, 2000);

	function bind() {
		button.addEventListener("click", () => {
			const video = document.querySelector("video");

			speed = speed || video.playbackRate;

			speed += 0.5;
			if (speed > 3) speed = 1;
			button.setAttribute("rate", buttonValue.innerText = video.playbackRate = speed);

			chrome.storage.sync.set({ "VrvSpeedControls:speed": speed });
		});

		button.addEventListener("contextmenu", (event) => {
			const video = document.querySelector("video");

			speed = speed || video.playbackRate;

			speed -= 0.5;
			if (speed < 1) speed = 3;
			button.setAttribute("rate", buttonValue.innerText = video.playbackRate = speed);

			chrome.storage.sync.set({ "VrvSpeedControls:speed": speed });

			event.preventDefault();
			return false;
		});
	}

}