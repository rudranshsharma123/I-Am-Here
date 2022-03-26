import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
	<BrowserRouter>
		<Routes>
			<Route path="/" element={<Login />} />
			{/* <Route path="/post" element={<App />} />

			<Route path="/post" element={<Posting />} />
			<Route path="/board" element={<Board />} />
			<Route path="/feed" element={<Feed />} /> */}
		</Routes>
	</BrowserRouter>,
	document.getElementById("root"),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
