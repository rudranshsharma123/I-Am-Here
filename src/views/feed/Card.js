import React from "react";
import Popup from "reactjs-popup";
import { useState } from "react";
import { toastySuccess } from "../../toasts/toasts";
import Deso from "deso-protocol";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Card({ name, image, description, price, onClickButton, post }) {
	const [message, setMessage] = useState("");
	return (
		<div style={{ margin: "10px" }}>
			<div className="wrapper">
				<div className="overviewInfo">
					<div className="actions"></div>

					<div className="productinfo">
						<div className="grouptext">
							<h3>My Role</h3>
							<p>{post}</p>
						</div>
						<div className="grouptext">
							<h3>Member Since</h3>
							<p>Spring 2021</p>
						</div>
						<div className="grouptext">
							<h3>PRICE</h3>
							<p>{price}hour</p>
						</div>

						<div className="productImage">
							<img
								src={image}
								alt="product: ps5 controller image"
								width={"200px"}
								height={"150px"}
							/>
						</div>
					</div>
				</div>

				<div className="productSpecifications">
					<h1> {name} </h1>
					<p> {description} </p>

					{/*  */}

					<div className="checkoutButton">
						<div className="priceTag">
							<span>$</span>
							{price} <span>/hour</span>
						</div>
						<Popup
							trigger={
								<button className="preorder" onClick={onClickButton}>
									<p>Talk with me</p>
									<div className="buttonaction">
										<svg
											width="24"
											height="24"
											viewBox="0 0 24 24"
											fill="none"
											xmlns="http://www.w3.org/2000/svg">
											<path
												d="M23.0677 11.9929L18.818 7.75739L17.4061 9.17398L19.2415 11.0032L0.932469 11.0012L0.932251 13.0012L19.2369 13.0032L17.4155 14.8308L18.8321 16.2426L23.0677 11.9929Z"
												fill="currentColor"
											/>
										</svg>
									</div>
								</button>
							}
							modal>
							{(close) => (
								<div className="modal">
									<button className="close" onClick={close}>
										&times;
									</button>
									<div className="header-m"> Send the DM </div>
									<div className="content-m">
										<input
											type="text"
											placeholder="Your Message"
											value={message}
											onChange={(e) => {
												setMessage(e.target.value);
											}}
										/>
										<button
											className="cta-button mint-button"
											onClick={async () => {
												await onClickButton(
													"BC1YLhULJpt8KAd4NZheJngWeZEwDW988tRGfWWtv5gKfCSgJWXfgwb",
													message,
												);
												setMessage("");
											}}>
											Send
										</button>
									</div>

									<button
										className="cta-button connect-wallet-button"
										onClick={() => {
											console.log("modal closed ");
											close();
										}}>
										close modal
									</button>
								</div>
							)}
						</Popup>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Card;
