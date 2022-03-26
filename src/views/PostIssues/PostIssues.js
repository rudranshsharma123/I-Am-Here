import React, { useState, useEffect } from "react";
import "./postissues.css";
import Deso from "deso-protocol";
import { toastySuccess } from "../../toasts/toasts";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../../navbar/Navbar";
function PostIssues() {
	const [publicKey, setPublicKey] = useState("");
	const deso = new Deso();
	const [post, setPost] = useState("");
	const [link, setLink] = useState("");
	const [vidLink, setVidlink] = useState("");
	const [postLink, setPostLink] = useState("");
	useEffect(() => {
		try {
			toastySuccess("checking to see if you have already logged in");
			const key = deso.identity.getUserKey();
			if (key !== "" && key !== null) {
				setPublicKey(key);
				toastySuccess("you have already logged in");
			}
		} catch (e) {
			console.log(e);
		}
	}, []);
	const postProfile = async () => {
		toastySuccess("Posting your Profile on chain!");
		let baseUri = "https://diamondapp.com/posts";
		let url = link
			? link
			: "https://www.onetherapybrighton.com/wp-content/uploads/2017/11/cartoon-counselling-session-e1521493521159.jpg";
		let vidUrl = vidLink
			? vidLink
			: "https://media.giphy.com/media/DJOv9iPyEIxAA/giphy.gif";
		console.log(url, vidUrl);

		const postReq = {
			UpdaterPublicKeyBase58Check: publicKey,
			BodyObj: {
				Body: `${post} @Iamhere`,
				VideoURLs: [vidLink],
				ImageURLs: [url],
			},
		};
		const res = await deso.posts.submitPost(postReq);
		console.log(res);
		let finalLink = `${baseUri}/${res.PostHashHex}`;
		setPostLink(finalLink);
		toastySuccess("Posted on chain....");
		setPost("");
		setLink("");
		setVidlink("");
	};
	return (
		<>
			<Navbar />
			<div className="main-container">
				<p className="title" style={{ marginBottom: "10px", color: "black" }}>
					What would you Like to share today?
				</p>
				<div className="form-container">
					<textarea
						type="text"
						placeholder="What would you like to share today?"
						value={post}
						onChange={(e) => {
							setPost(e.target.value);
						}}
					/>{" "}
					<input
						type="text"
						placeholder="Add any image you want to add "
						value={link}
						onChange={(e) => {
							setLink(e.target.value);
						}}
					/>
					<input
						type="text"
						placeholder="Add any Video you want to add "
						value={vidLink}
						onChange={(e) => {
							setVidlink(e.target.value);
						}}
					/>
					<div>
						<button className="cta-button mint-button" onClick={postProfile}>
							Submit your post on chain!
						</button>
					</div>
				</div>
				{postLink && (
					<header>
						<div className="right">{postLink}</div>
					</header>
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

export default PostIssues;
