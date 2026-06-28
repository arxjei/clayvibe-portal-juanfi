fetch("assets/config.json")
  .then((r) => r.json())
  .then((cfg) => {
    const messages = cfg.scrollMessages;
    const SEPARATOR = "✦";

    // ← No DOMContentLoaded wrapper needed, DOM is already loaded
    const joinedText = messages.join(SEPARATOR + " ") + SEPARATOR;

    const container = document.getElementById("clayvibe-scrollMsg");
    const track = document.createElement("div");
    track.className = "clayvibe-scrollMsg-track";

    const span1 = document.createElement("span");
    const span2 = document.createElement("span");

    span1.textContent = joinedText;
    span2.textContent = joinedText;

    span1.setAttribute("aria-hidden", "false");
    span2.setAttribute("aria-hidden", "true");

    track.appendChild(span1);
    track.appendChild(span2);
    container.appendChild(track);

    const SPEED = 50;
    const CHAR_WIDTH = 7.8;
    const totalWidth = joinedText.length * CHAR_WIDTH;
    const duration = Math.round(totalWidth / SPEED);

    track.style.setProperty("--scroll-duration", duration + "s");
  })
  .catch(() => {
		alert("config.json missing or invalid JSON!");
	});