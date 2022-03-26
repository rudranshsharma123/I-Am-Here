import React, { useState, useEffect } from "react";
import "./navbar.css";
import Deso from "deso-protocol";

function Navbar() {
	const deso = new Deso();
	const [publicKey, setPublicKey] = useState("");
	const [notfis, setNotifs] = useState("");
	const fectNotifs = async () => {
		const request = {
			PublicKeyBase58Check: publicKey,
		};
		const response = await deso.notification.getUnreadNotificationsCount(
			request,
		);
		console.log(response.data.NotificationsCount);
		setNotifs(response.data.NotificationsCount);
	};
	useEffect(() => {
		try {
			// toastySuccess("checking to see if you have already logged in");
			const key = deso.identity.getUserKey();
			if (key !== "" && key !== null) {
				setPublicKey(key);
				// toastySuccess("you have already logged in, check footer for details");\
			}
		} catch (e) {
			console.log(e);
		}
	}, []);

	useEffect(() => {
		if (publicKey) {
			fectNotifs();
		}
	}, [publicKey]);

	return (
		<nav>
			<div className="nav-links">
				<button className="cta-button" style={{ color: "black" }}>
					{" "}
					I Am Here
				</button>
				<a href="/">
					<button className="cta-button mint-button"> Home</button>
				</a>

				<a href="/mentor">
					<button className="cta-button mint-button"> Find Someone</button>
				</a>
				<a href="/post">
					<button className="cta-button mint-button"> Post your issues</button>
				</a>
				<a href="/issues">
					<button className="cta-button mint-button"> Post your Profile</button>
				</a>
				<a href="/feed">
					<button className="cta-button mint-button"> Feed</button>
				</a>
				<button className="cta-button mint-button">
					{" "}
					Number of Notifs : {notfis}
				</button>
			</div>
			<header>
				<div className="right">
					{publicKey ? (
						<p>
							{" "}
							Wallet: {publicKey.slice(0, 6)}...
							{publicKey.slice(-4)}{" "}
						</p>
					) : (
						<p> Not connected </p>
					)}
				</div>
			</header>
		</nav>
	);
}

export default Navbar;
