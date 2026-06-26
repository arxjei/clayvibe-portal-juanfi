var voucher = replaceAll(mac, ":"),
	vendorIpAddress = "",
	voucherToConvert = "",
	totalCoinReceived = 0,
	insertingCoin = !1,
	remainingTimer = null,
	timer = null,
	vcTopUp = !1,
	callerID = "";
    
function replaceAll(e, t) {
	for (var n = e; n.indexOf(t) > 0; ) n = n.replace(t, "");
	return n;
}

(document.addEventListener("visibilitychange", () => {
	("hidden" == document.visibilityState &&
		1 == insertingCoin &&
		0 == totalCoinReceived &&
		((insertingCoin = !1),
		(idinsrtCoin.style.display = "none"),
		clearInterval(timer),
		PauseAudio(),
		(timer = null),
		cancelTopUp()),
		"visible" == document.visibilityState &&
			1 != insertingCoin &&
			location.reload());
}),
	document.addEventListener("pageshow", (e) => {
		e.persisted && location.reload();
	}));
let div = document.createElement("div");
function insertBtnAction() {
	((callerID = "insertCoin"),
		(loaderDiv.style.display = "flex"),
		(document.getElementById("IPconfig").src = "assets/js/config.js"),
		history.pushState(null, null, window.location.href),
		history.back(),
		(window.onpopstate = () => history.forward()),
		document.getElementById("idBtninsrtCoin").blur());
}
function promoBtnAction() {
	((callerID = "promoRates"),
		(loaderDiv.style.display = "flex"),
		(document.getElementById("IPconfig").src = "assets/js/config.js"),
		history.pushState(null, null, window.location.href),
		history.back(),
		(window.onpopstate = () => history.forward()),
		document.getElementById("idBtnModalRate").blur());
}
function ModalRateEnd() {
	((idModalRate.style.display = "none"), location.reload());
}
function doLogin() {
	var e = new XMLHttpRequest();
	(e.open("POST", "/login", "_blank", !0),
		e.setRequestHeader(
			"Content-type",
			"application/x-www-form-urlencoded; charset=UTF-8",
		),
		(e.onreadystatechange = function () {
			4 == this.readyState &&
				200 == this.status &&
				((loaderDiv.style.display = "flex"),
				setTimeout(function () {
					location.href = "/status";
				}, 200));
		}),
		e.send("username=" + voucher));
}
function pause() {
	var e = new XMLHttpRequest();
	(e.open("POST", "/logout", "_blank", !0),
		e.setRequestHeader(
			"Content-type",
			"application/x-www-form-urlencoded; charset=UTF-8",
		),
		(e.onreadystatechange = function () {
			4 == this.readyState &&
				200 == this.status &&
				((loaderDiv.style.display = "flex"),
				setTimeout(function () {
					location.href = "/login";
				}, 200));
		}),
		e.send("erase-cookie=true"));
}
function chkdata() {
	var e = new XMLHttpRequest();
	(e.open("GET", "/data/" + voucher + ".txt?query=", !0),
		e.setRequestHeader(
			"Content-type",
			"application/x-www-form-urlencoded; charset=UTF-8",
		),
		(e.onreadystatechange = function () {
			if (4 == this.readyState && 200 == this.status) {
				var e = this.responseText;
				document.getElementById("remainTime").innerHTML = secondsToDhms(e);
			}
			if (404 == this.status)
				return (
					(document.getElementById("InOuttBTN").disabled = !0),
					void (document.getElementById("remainTime").innerHTML =
						"00h : 00m : 00s")
				);
		}),
		e.send());
}
function TopUpvc() {
    voucherToConvert = document.getElementById("voucherInput").value.trim();

    if (voucherToConvert === "") {
        alert("Please enter a voucher code.");
        document.getElementById("voucherInput").focus();
        return;
    }

    if (voucherToConvert === voucher) {
        alert("This voucher is already in use.");
        document.getElementById("voucherInput").value = "";
        document.getElementById("voucherInput").focus();
        return;
    }

    loaderDiv.style.display = "flex";
    vcTopUp = !0;
    callerID = "insertCoin";
    document.getElementById("IPconfig").src = "assets/js/config.js";
    history.pushState(null, null, window.location.href);
    history.back();
    window.onpopstate = () => history.forward();
    document.getElementById("TopUpBTN").blur();
}
function convertVoucherAction() {
	var e = new XMLHttpRequest();
	(e.open("POST", "http://" + vendorIpAddress + "/convertVoucher", !0),
		e.setRequestHeader(
			"Content-type",
			"application/x-www-form-urlencoded; charset=UTF-8",
		),
		(e.onreadystatechange = function () {
			if (4 == this.readyState && 200 == this.status) {
				var e = JSON.parse(this.responseText);
				if ("true" == e.status) {
					insertingCoin = !0;
					var t = setInterval(function () {
						(checkCoin(),
							0 != totalCoinReceived && (clearInterval(t), donepaying()));
					}, 800);
				}
				"false" == e.status &&
					((insertingCoin = !1), cancelTopUp(), location.reload());
			}
		}),
		e.send("voucher=" + voucher + "&convertVoucher=" + voucherToConvert));
}
function callTopupAPI(e) {
	var t = "",
		n = "";
	("undefined" != typeof uIp && (n = "&ipAddress=" + uIp),
		"yes" == stsPage && (t = "&extendTime=1"),
		"yes" != stsPage && (t = "&extendTime=0"),
		(progressDiv.style.width = "100%"));
	var o = new XMLHttpRequest();
	(o.open("POST", "http://" + vendorIpAddress + "/topUp", !0),
		o.setRequestHeader(
			"Content-type",
			"application/x-www-form-urlencoded; charset=UTF-8",
		),
		(o.onreadystatechange = function () {
			if (4 == this.readyState && 200 == this.status) {
				var e = JSON.parse(this.responseText);
				("coin.slot.banned" == e.errorCode &&
					(alert("Coinslot abused! please try again later!"),
					location.reload()),
					"coinslot.busy" == e.errorCode &&
						(alert("Coinslot is busy at the moment.."), location.reload()),
					"true" == e.status &&
						0 == vcTopUp &&
						((loaderDiv.style.display = "none"),
						(insertingCoin = !0),
						CoindropLoad(),
						PlayAudio(),
						(idinsrtCoin.style.display = "block"),
						null == timer && (timer = setInterval(checkCoin, 500))),
					"true" == e.status && 1 == vcTopUp && convertVoucherAction());
			}
		}),
		(o.onerror = function () {
			setTimeout(function () {
				(e <= 1 && callTopupAPI(e + 1),
					1 == e &&
						(alert("JuanFi ESP module not found!!"), location.reload()));
			}, 1e3);
		}),
		o.send("voucher=" + voucher + "&mac=" + mac + n + t));
}
function checkCoin() {
	var e = new XMLHttpRequest();
	(e.open("POST", "http://" + vendorIpAddress + "/checkCoin", !0),
		e.setRequestHeader(
			"Content-type",
			"application/x-www-form-urlencoded; charset=UTF-8",
		),
		(e.onreadystatechange = function () {
			if (4 == this.readyState && 200 == this.status) {
				var e = JSON.parse(this.responseText);
				if (
					((totalCoinReceived = parseInt(e.totalCoin)),
					(document.getElementById("totalCoin").innerHTML = e.totalCoin),
					(document.getElementById("totalTime").innerHTML = secondsToDhms(
						parseInt(e.timeAdded),
					)),
					"coin.not.inserted" == e.errorCode)
				) {
					var t = parseInt(parseInt(e.remainTime) / 1e3),
						n = parseFloat(e.waitTime),
						o = parseInt(((1e3 * t) / n) * 100);
					((progressDiv.style.width = o + "%"), t <= 0 && donepaying());
				}
				("true" == e.status && CoindropPlay(),
					"coin.is.reading" == e.errorCode &&
						((progressDiv.style.width = "100%"),
						(document.getElementById("idBtninsrtCoinEnd").disabled = !0)),
					"true" != e.status &&
						"coin.is.reading" != e.errorCode &&
						(document.getElementById("idBtninsrtCoinEnd").disabled = !1));
			}
		}),
		e.send("voucher=" + voucher));
}
function donepaying() {
	if (
		((loaderDiv.style.display = "flex"),
		1 != vcTopUp &&
			(clearInterval(timer),
			(idinsrtCoin.style.display = "none"),
			PauseAudio(),
			(timer = null)),
		0 == totalCoinReceived && cancelTopUp(),
		"yes" != stsPage && 0 != totalCoinReceived && useVoucher(),
		"yes" == stsPage && 0 != totalCoinReceived)
	) {
		var e = new XMLHttpRequest();
		(e.open("POST", "/logout", !0),
			(e.onreadystatechange = function () {
				4 == this.readyState && 200 == this.status && useVoucher();
			}),
			e.send());
	}
}
function useVoucher() {
	insertingCoin = !1;
	var e = new XMLHttpRequest();
	(e.open("POST", "http://" + vendorIpAddress + "/useVoucher", !0),
		e.setRequestHeader(
			"Content-type",
			"application/x-www-form-urlencoded; charset=UTF-8",
		),
		(e.onreadystatechange = function () {
			4 == this.readyState && 200 == this.status && (location.href = "/status");
		}),
		e.send("voucher=" + voucher));
}
function cancelTopUp() {
	insertingCoin = !1;
	var e = new XMLHttpRequest();
	(e.open("POST", "http://" + vendorIpAddress + "/cancelTopUp", !0),
		e.setRequestHeader(
			"Content-type",
			"application/x-www-form-urlencoded; charset=UTF-8",
		),
		(e.onreadystatechange = function () {
			4 == this.readyState && 200 == this.status && location.reload();
		}),
		e.send("voucher=" + voucher + "&mac=" + mac));
}
function populatePromoRates(e) {
	var t = new XMLHttpRequest();
	(t.open("POST", "http://" + vendorIpAddress + "/getRates?rateType=", !0),
		t.setRequestHeader("Content-type", "text/plain"),
		(t.onreadystatechange = function () {
			if (4 == this.readyState && 200 == this.status) {
				((idModalRate.style.display = "block"),
					(loaderDiv.style.display = "none"));
				var e = this.responseText.split("|");
				let tableHTML = '<table class="promo-table">';
				tableHTML +=
					"<thead><tr><th>Rate</th><th>Validity</th></tr></thead><tbody>";
				for (r in e)
					if (e.hasOwnProperty(r)) {
						var n = e[r].split("#"),
							rate = n[0],
							validity = secondsToDhms(60 * parseInt(n[3]));
						((tableHTML += "<tr>"),
							(tableHTML += "<td>" + rate + "</td>"),
							(tableHTML += "<td>" + validity + "</td>"),
							(tableHTML += "</tr>"));
					}
				((tableHTML += "</tbody></table>"),
					(document.getElementById("ratesBody").innerHTML = tableHTML));
			}
		}),
		(t.onerror = function () {
			setTimeout(function () {
				(e <= 1 && populatePromoRates(e + 1),
					1 == e &&
						(alert("JuanFi ESP module not found!!"), location.reload()));
			}, 1e3);
		}),
		t.send());
}
function CoindropLoad() {
	var e = document.getElementById("CoindropAudio");
	((e.src = "assets/audio/coin-received.mp3"), e.load());
}
function CoindropPlay() {
	document.getElementById("CoindropAudio").play();
}
function PlayAudio() {
	var e = document.getElementById("insertcoinbgAudio");
	((e.src = "assets/audio/insertcoinbg.mp3"), e.load(), e.play(), (e.loop = !0));
}
function PauseAudio() {
	document.getElementById("insertcoinbgAudio").pause();
}
function secondsToDhms(e) {
	e = Number(e);
	var t = Math.floor(e / 86400),
		n = Math.floor((e % 86400) / 3600),
		o = Math.floor((e % 3600) / 60),
		i = Math.floor(e % 60);
	return (
		(t > 0 ? t + "d: " : "") +
		(n > 0 ? n + "" : "00") +
		"h : " +
		(o > 0 ? o + "" : "00") +
		"m : " +
		(i > 0 ? i + "" : "00") +
		"s"
	);
}
((div.id = "progress-bar-color"),
	(div.innerHTML = "<p></p>"),
	document.body.appendChild(div),
	"yes" != stsPage && chkdata(),
	"yes" == stsPage &&
    "0" == time &&
    (document.getElementById("remainTime").innerHTML = "Connected"),
	"yes" == stsPage &&
    time > "0" &&
    ((document.getElementById("remainTime").innerHTML = secondsToDhms(+time)),  // ← +time
    (remainingTimer = setInterval(function () {
        time--,
        (document.getElementById("remainTime").innerHTML = secondsToDhms(time)),
        time <= 0 &&          // ← number, not "0"
            ((loaderDiv.style.display = "flex"),
            clearInterval(remainingTimer),
            setTimeout(function () {
                location.reload();
            }, 1e3));
    }, 1e3))));
