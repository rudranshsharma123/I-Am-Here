import React, { useState, useEffect } from "react";
import "./post.css";
import Deso from "deso-protocol";
import { toastySuccess } from "../../toasts/toasts";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../../navbar/Navbar";
function Post() {
	const [publicKey, setPublicKey] = useState("");
	const deso = new Deso();
	const [bio, setBio] = useState("");
	const [name, setName] = useState("");
	const [skills, setSkills] = useState("");
	const [role, setRole] = useState("");
	const [price, setPrice] = useState("");
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
				Body: `Hello, I am ${name}, I am going to be a ${role} and I am good at ${skills}. I will be charging ${price} $/hr. A liitle about me will be ${bio} @Iamhere`,
				VideoURLs: [vidLink],
				ImageURLs: [url],
			},
		};
		const res = await deso.posts.submitPost(postReq);
		let finalLink = `${baseUri}/${res.PostHashHex}`;
		setPostLink(finalLink);
		console.log(res);
		toastySuccess("Posted on chain...");
		setBio("");
		setName("");
		setRole("");
		setSkills("");
		setPrice("");
		setLink("");
		setVidlink("");
	};
	return (
		<>
			<Navbar />
			<div className="main-container">
				<p className="title" style={{ marginBottom: "10px", color: "black" }}>
					Enter your Details
				</p>
				<div className="form-container">
					<input
						type="text"
						placeholder="Tell us a little about yourself"
						value={bio}
						onChange={(e) => {
							setBio(e.target.value);
						}}
					/>
					<input
						type="text"
						placeholder="Your skills"
						value={skills}
						onChange={(e) => {
							setSkills(e.target.value);
						}}
					/>

					<input
						type="text"
						placeholder="What are you?"
						value={role}
						onChange={(e) => {
							setRole(e.target.value);
						}}
					/>
					<input
						type="text"
						placeholder="Your Name"
						value={name}
						onChange={(e) => {
							setName(e.target.value);
						}}
					/>
					<input
						type="text"
						placeholder="What is your price/hr? "
						value={price}
						onChange={(e) => {
							setPrice(e.target.value);
						}}
					/>
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
							Submit your profile on chain!
						</button>
					</div>
				</div>
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
			{postLink && (
				<header>
					<div className="right">{postLink}</div>
				</header>
			)}
		</>
	);
}

export default Post;
