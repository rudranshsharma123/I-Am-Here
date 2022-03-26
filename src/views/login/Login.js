import React, { useState, useEffect } from "react";
import "./login.css";
import axios from "axios";
import { toastySuccess } from "../../toasts/toasts";
import Deso from "deso-protocol";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
function Login() {
	const navigate = useNavigate();
	const [publicKey, setPublicKey] = useState("");
	const deso = new Deso();
	const request = 3;
	const handleClick = () => {
		navigate("/mentor");
	};
	const handlePage = () => {
		navigate("/todo");
	};
	const handleEns = () => {
		navigate("/ens");
	};

	useEffect(() => {
		try {
			toastySuccess("checking to see if you have already logged in");
			const key = deso.identity.getUserKey();
			if (key !== "" && key !== null) {
				setPublicKey(key);
				toastySuccess("you have already logged in, check footer for details");
			}
		} catch (e) {
			console.log(e);
		}
	}, []);

	return (
		<>
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
			<div className="log">
				<h1>Welcome to I Am Here</h1>
				<button
					className="cta-button mint-button"
					onClick={async (e) => {
						e.preventDefault();
						const res = await deso.identity.login(request);
						const s = await deso.identity.getUserKey();
						console.log(s);
						console.log(res);
						setPublicKey(res.key);
					}}>
					Login/Signup in using your DeSo Account
				</button>
				{publicKey !== "" && (
					<>
						<button className="cta-button mint-button" onClick={handleClick}>
							You already have an account click me to proceed
						</button>
					</>
				)}
			</div>
			<ToastContainer
				position="top-right"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>
		</>
	);
}

export default Login;
