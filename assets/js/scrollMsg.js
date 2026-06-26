const messages = [
  "⚡ Auto Pause is enabled, when you disconnect",
  "💡 Tip: Click the 'Clear Cache' button if you encounter any problems",
  "🔔 Need help? Ask for assistance",
];

const SEPARATOR = "✦"; 

document.addEventListener("DOMContentLoaded", () => {
  // Build one long repeating string: "msg1 ✦ msg2 ✦ msg3 ✦ "
  const joinedText = messages.join(SEPARATOR + " ") + SEPARATOR;

  // Grab the scroll container element by ID
  const container = document.getElementById("clayvibe-scrollMsg");

  // Create the scrolling track <div class="clayvibe-scrollMsg-track">
  const track = document.createElement("div");
  track.className = "clayvibe-scrollMsg-track";

  // Create two identical <span> elements (duplicate for seamless looping)
  const span1 = document.createElement("span");
  const span2 = document.createElement("span");

  span1.textContent = joinedText;
  span2.textContent = joinedText;

  // Mark span2 as decorative/hidden from screen readers
  span1.setAttribute("aria-hidden", "false");
  span2.setAttribute("aria-hidden", "true");

  // Assemble: track > span1 + span2, container > track
  track.appendChild(span1);
  track.appendChild(span2);
  container.appendChild(track);

  // Calculate scroll animation duration based on text length
  const SPEED = 50;           // pixels per second (approx)
  const CHAR_WIDTH = 7.8;     // estimated px per character
  const totalWidth = joinedText.length * CHAR_WIDTH;
  const duration = Math.round(totalWidth / SPEED);

  // Set CSS custom property to drive the keyframe animation
  track.style.setProperty("--scroll-duration", duration + "s");
});