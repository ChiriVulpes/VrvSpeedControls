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
    text-shadow: 0 0 1px black, 0 0 2px black, 0 0 2px black, 0 0 2px black, 0 0 1px black, 0 0 1px black, 0 0 1px black, 0 0 1px black;
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

.nextButton {
    right: 117px !important;
    position: absolute !important;
	cursor: pointer;
}
.nextButton::before {
	content: url(data:image/svg+xml;charset=utf-8;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2aWV3Qm94PSIwIDAgODk4LjMgODk4LjMiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPGc+DQo8cG9seWdvbiBwb2ludHM9IjEyMC4yLDg4Mi41IDU1My42LDQ0OS4yIDEyMC4yLDE1LjggMCwxMzYgMzEzLjIsNDQ5LjIgMCw3NjIuMyIgZmlsbD0iI2ZmZiIvPg0KPHJlY3Qgd2lkdGg9IjE1MCIgaGVpZ2h0PSI4NjYuNyIgZmlsbD0iI2ZmZiIgeT0iMTUuOCIgeD0iNjUwIi8+PC9nPg0KPC9zdmc+);
    width: 20px !important;
    display: block;
    top: 15px !important;
    left: 15px !important;
    filter: brightness(0.75);
}
.nextButton:hover::before {
	filter: brightness(0.95);
}
	`;
	document.body.appendChild(style);

	let speed;

	chrome.storage.sync.get("VrvSpeedControls:speed", (data) => {
		speed = data["VrvSpeedControls:speed"] || speed;
	});

	let rateButton;
	let rateButtonValue;
	let nextButton;

	setInterval(() => {
		const video = document.querySelector("video");

		speed = speed || video.playbackRate;

		const currentRateButton = document.querySelector(".vjs-playback-rate");

		if (rateButton !== currentRateButton) {
			rateButton = currentRateButton;
			rateButtonValue = document.querySelector(".vjs-playback-rate-value");
			bindRateButton();
		}

		rateButton.setAttribute("rate", rateButtonValue.innerText = video.playbackRate = speed);

		const currentNextButton = document.querySelector(".nextButton");

		if (nextButton !== currentNextButton) {
			nextButton = document.createElement("div");
			nextButton.classList.add("vjs-button", "vjs-control", "nextButton");
			nextButton.setAttribute("title", "Next");

			document.querySelector(".vjs-control-bar").appendChild(nextButton);
			bindNextButton();
		}
	}, 2000);

	function bindRateButton() {
		rateButton.addEventListener("click", () => {
			const video = document.querySelector("video");

			speed = speed || video.playbackRate;

			speed += 0.5;
			if (speed > 3) speed = 1;
			rateButton.setAttribute("rate", rateButtonValue.innerText = video.playbackRate = speed);

			chrome.storage.sync.set({ "VrvSpeedControls:speed": speed });
		});

		rateButton.addEventListener("contextmenu", (event) => {
			const video = document.querySelector("video");

			speed = speed || video.playbackRate;

			speed -= 0.5;
			if (speed < 1) speed = 3;
			rateButton.setAttribute("rate", rateButtonValue.innerText = video.playbackRate = speed);

			chrome.storage.sync.set({ "VrvSpeedControls:speed": speed });

			event.preventDefault();
			return false;
		});

	}

	async function sleep(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}

	function bindNextButton() {
		nextButton.addEventListener("click", async () => {
			const video = document.querySelector("video");
			video.currentTime = video.duration;
			await sleep(100);
			video.play();
		});
	}

}