import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Login from "./views/login/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Feed from "./views/feed/Feed";
import Post from "./views/post/Post";
import PostIssues from "./views/PostIssues/PostIssues";

ReactDOM.render(
	<BrowserRouter>
		<Routes>
			<Route path="/" element={<Login />} />
			<Route path="/mentor" element={<Feed />} />
			<Route path="/post" element={<Post />} />
			<Route path="/issues" element={<PostIssues />} />
		</Routes>
	</BrowserRouter>,
	document.getElementById("root"),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
