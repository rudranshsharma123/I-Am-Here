import React, { useState, useEffect } from "react";
import Card from "../feed/Card";
import Deso from "deso-protocol";
import { toastySuccess } from "../../toasts/toasts";
import axios from "axios";
import PostCards from "./PostCards";
import "./postfeed.css";
import Navbar from "../../navbar/Navbar";

function PostFeed() {
	const deso = new Deso();
	const pfps = [
		"https://i.pinimg.com/originals/83/89/2c/83892c806ca8f287926b91f15ce5adc0.jpg",
		"https://i.pinimg.com/236x/91/fd/ce/91fdceeaba021b3c87e8d696c13d618f.jpg",
		"http://pm1.narvii.com/7305/f687328407de3238a00b165790d5b01a505ff9d6r1-720-960v2_uhq.jpg",
	];

	const [post, setPost] = useState([]);
	const [publicKey, setPublicKey] = useState("");

	const getPosts = async () => {
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
		console.log(res);
		let x = res.Posts;
		let y = [];
		for (let i = 0; i < x.length; i++) {
			if (x[i].Body.includes("y@Iamhere")) {
				x[i].Body = x[i].Body.toString().replace("y@Iamhere", "");
				// console.log(k);
				y.push(x[i]);
			}
		}
		console.log(y);
		setPost(y);
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
		getPosts();
	}, [publicKey]);
	return (
		<div className="test">
			<Navbar />
			{post.length > 0 &&
				post.map((post, index) => {
					let body = post.Body;
					let image = post.ImageURLs[0];
					let poster = post.PosterPublicKeyBase58Check;

					return (
						<PostCards
							name={poster}
							image={image}
							desc={body}
							key={index}
							userImage={pfps[pfps.length % (index + 1)]}
						/>
					);
				})}
		</div>
	);
}

export default PostFeed;
