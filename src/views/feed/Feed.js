import React, { useState, useEffect } from "react";
import Navbar from "../../navbar/Navbar";
import axios from "axios";
import Card from "./Card";
import "./feed.css";
import { toastySuccess } from "../../toasts/toasts";
import Deso from "deso-protocol";
import { ToastContainer } from "react-toastify";
function Feed() {
	const deso = new Deso();
	const [posts, setPosts] = useState([]);
	const [publicKey, setPublicKey] = useState("");
	const [message, setMessage] = useState("");
	const [mentorPosts, setMentorPosts] = useState("");
	const [mentorPostHashHex, setMentorPostHashHex] = useState("");
	const [mentorPostPublicKey, setMentorPostPublicKey] = useState("");
	const pfps = [
		"https://i.pinimg.com/originals/57/3f/22/573f22a1aa17b366f5489745dc4704e1.jpg",
		"https://i.pinimg.com/474x/2c/67/80/2c678002e587299b3511cec86382daf1.jpg",
		"https://exploringbits.com/wp-content/uploads/2022/01/Aesthetic-girl-pfp-5.jpg?ezimgfmt=rs:352x387/rscb3/ng:webp/ngcb3",
		"https://wallpapercave.com/wp/wp7151807.jpg",
		"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQm2LkuIQ7UVafgOsYElDMt-EnD7PkXEQC_HA&usqp=CAU",
	];
	const sendDiamonds = async (toPublicKey, postHashHex) => {
		toastySuccess("Sending Diamonds");
		const request = {
			ReceiverPublicKeyBase58Check: toPublicKey,
			SenderPublicKeyBase58Check: publicKey,
			DiamondPostHashHex: postHashHex,
			DiamondLevel: 1,
			MinFeeRateNanosPerKB: 1000,
			InTutorial: false,
		};
		//sleep(5000);

		// toastySuccess("Diamonds Sent");
		const res = await deso.social.sendDiamonds(request);
		console.log(res);
		toastySuccess("Diamonds Sent");
	};

	const sendMessage = async (toPublicKey, message) => {
		toastySuccess("sending message");
		const request = {
			RecipientPublicKeyBase58Check: toPublicKey,
			SenderPublicKeyBase58Check: publicKey,
			MessageText: message,
		};
		const res = await deso.social.sendMessage(request);
		console.log(res);
		// setMessage("");
		toastySuccess("message sent");
	};
	const getPosts = async (publicKey) => {
		const BASEURI = "https://api.desodev.com/api";
		const path = "/v0/get-posts-for-public-key";

		const data = {
			PublicKeyBase58Check: publicKey,
			ReaderPublicKeyBase58Check: "",
			NumToFetch: 20,
			MediaRequired: false,
		};
		const res = await axios.post(BASEURI + path, data).then((res) => {
			// console.log(res.data);
			return res.data;
		});
		for (let i in res.Posts) {
			// console.log(res.Posts[i]);
			let x = res.Posts[i].Body.split(" ");
			if (x[1] == "I" && x.slice(-1) == "@Iamhere") {
				setMentorPosts((prev) => [...prev, res.Posts[i].Body]);
				setMentorPostHashHex((prev) => [...prev, res.Posts[i].PostHashHex]);
				setMentorPostPublicKey((prev) => [
					...prev,
					res.Posts[i].PosterPublicKeyBase58Check,
				]);
			}
		}
		console.table(mentorPostHashHex, mentorPostPublicKey, mentorPosts);
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
	useEffect(() => {
		getPosts(publicKey);
		getPosts("BC1YLfyvnDiwb1PLjdB4KtLhCiDoaV4qZ1MUJs15tzdDAXe4LBtfs8x");
	}, [publicKey]);
	return (
		<>
			<Navbar />
			<div className="holder">
				{mentorPosts.length > 0 &&
					mentorPosts.map((post, index) => {
						let x = post.split(" ");
						console.log(x);
						let name = x[3] + " " + x[4].split(",")[0];
						let role = x[11];
						let y = -1;
						let z = -1;
						for (let i = 0; i < x.length; i++) {
							if (x[i] === "liitle") {
								y = i;
								break;
							}
						}
						for (let i = 0; i < x.length; i++) {
							if (x[i] === "charging") {
								z = i + 1;
								break;
							}
						}
						let string = "";
						for (let i = y + 1; i < x.length - 1; i++) {
							string += x[i] + " ";
						}
						console.log(y, string, z);
						return (
							<Card
								name={name}
								image={pfps[Math.floor(Math.random() * pfps.length)]}
								description={string}
								price={x[z]}
								onClickButton={sendMessage}
								post={role}
								key={index}
							/>
						);
					})}

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
			</div>
		</>
	);
}

export default Feed;
// name, image, description, price, onClickButton, post;
{
	/* <Card
	name={"Rudransh Sharma"}
	image={
		"https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dmlld3xlbnwwfHwwfHw%3D&w=1000&q=80"
	}
	description={"We are the best ones you can ever find"}
	price={"100"}
	onClickButton={() => {}}
	post={"Consellor"}
/>; */
}
