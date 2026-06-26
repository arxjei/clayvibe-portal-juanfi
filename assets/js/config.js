// ─── Multi-vendor configuration ───────────────────────────────────────────────
// multiVendo        : enables multi-vendor mode
// multiVendoOption  : 0 = show a button-picker UI, 1 = auto-select by interface name
var multiVendo = false;
var multiVendoOption = 1;

// Fallback IP used when multiVendo is disabled (option 0 path)
var vendoIpAddress = "10.0.0.254";

// List of vendors with their gateway IP and VLAN interface
var multiVendoAddresses = [
  {
    vendoName: "VENDOR ONE",
    vendoIp: "10.0.0.254",
    interfaceName: "vlan1",
  },
  {
    vendoName: "VENDOR TWO",
    vendoIp: "10.0.0.255",
    interfaceName: "vlan2",
  },
];

// ─── Helper called by the "End / Back" multi-vendor button ────────────────────
// Hides the vendor-picker UI and reloads the page.
function multiBtnEnd() {
  multiBtn.style.display = "none";
  location.reload();
}

// ─── Mode 1: multiVendo ON, option 0 — show a button-picker UI ───────────────
// Execution order determined by the switch cases run in the order: 1, 4, 3, 0, 2
if (multiVendo === true && multiVendoOption === 0) {
  // Case 1 – show the multi-vendor button panel, hide the loader
  loaderDiv.style.display = "none";
  multiBtn.style.display = "block";

  // Case 4 – create the buttons container div
  var buttonsContainer = document.createElement("div");

  // Case 3 – add the CSS class to the container
  buttonsContainer.classList.add("buttons-container");

  // Case 0 – create one <button> per vendor and append to container
  for (var i = 0; i < multiVendoAddresses.length; i++) {
    var button = document.createElement("button");
    button.classList.add("button");
    button.textContent = multiVendoAddresses[i].vendoName;
    button.dataset.ip = multiVendoAddresses[i].vendoIp;
    buttonsContainer.appendChild(button);
  }

  // Case 2 – mount the container in the DOM and wire up click handlers
  document.getElementById("btns").appendChild(buttonsContainer);

  document.querySelectorAll(".button").forEach(function (n) {
    n.addEventListener("click", function () {
      // Store the chosen vendor's IP in the global variable
      vendorIpAddress = n.dataset.ip;

      // Show the vendor name in the #vendoID element
      document.getElementById("vendoID").innerHTML = n.textContent;

      // Hide multi-vendor panel, show loader
      loaderDiv.style.display = "none";
      multiBtn.style.display = "flex";

      // Kick off the appropriate flow based on which caller triggered this page
      if ("insertCoin" == callerID) callTopupAPI(0);
      if ("promoRates" == callerID) populatePromoRates(0);
    });
  });
}

// ─── Mode 2: multiVendo ON, option 1 — auto-select by interface name ─────────
// Matches the current interface name against the vendor list and picks the IP.
if (multiVendo === true && multiVendoOption === 1) {
  for (i = 0; i < multiVendoAddresses.length; i++) {
    var currentInterfaceName = interfaceName;
    if (multiVendoAddresses[i].interfaceName === currentInterfaceName) {
      vendorIpAddress = multiVendoAddresses[i].vendoIp;
    }
  }

  if ("insertCoin" == callerID) callTopupAPI(0);
  if ("promoRates" == callerID) populatePromoRates(0);
}

// ─── Mode 3: multiVendo OFF — single vendor, use the hardcoded IP ─────────────
if (multiVendo === false) {
  vendorIpAddress = vendoIpAddress;
  if ("insertCoin" == callerID) callTopupAPI(0);
  if ("promoRates" == callerID) populatePromoRates(0);
}