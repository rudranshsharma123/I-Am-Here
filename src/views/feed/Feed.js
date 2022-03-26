import React from "react";
import Navbar from "../../navbar/Navbar";
import Card from "./Card";
import "./feed.css";
function Feed() {
	return (
		<>
			<Navbar />
			<div className="holder">
				<Card
					name={"Rudransh Sharma"}
					image={
						"https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dmlld3xlbnwwfHwwfHw%3D&w=1000&q=80"
					}
					description={"We are the best ones you can ever find"}
					price={"100"}
					onClickButton={() => {}}
					post={"Consellor"}
				/>
			</div>
		</>
	);
}

export default Feed;
// name, image, description, price, onClickButton, post;
