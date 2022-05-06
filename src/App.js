
import "./App.css";
import React, { useState, useEffect } from "react";
import Register from "./components/Register";
import Login from "./components/Login";
import GetPage from "./components/GetPage";
import bcryptjs from "bcryptjs";

function App() {
	const [dbUser, setdbUser] = useState([
		{
			email: "hiiiiimrome@gmail.com",
			username: "akosigyrome",
			password: "$2a$10$bk0ZrV0Sv01ZhZRrhmxPoOsEiGYDhMDSU8t/BjYvcwZvi9hsyubwe",
		},
		{
			email: "admin123@gmail.com",
			username: "admin",
			password: "$2a$10$bk0ZrV0Sv01ZhZRrhmxPoOsEiGYDhMDSU8t/BjYvcwZvi9hsyubwe",
		}, 
	]);




	const [login, setlogin] = useState(true);
	const [user, setuser] = useState({});
	const salt = bcryptjs.genSaltSync(10);
	const hash = pass => bcryptjs.hashSync(pass, salt);



	function userExists(u) {
		const userFound = dbUser.find(user => user.username === u);
		return userFound;
	}

	function emailExists(e) {
		const userFound = dbUser.find(user => user.email === e);
		return userFound;
	}


	function authenticate(u, p) {
		const userFound = userExists(u);
		if (userFound) {
			const compare = bcryptjs.compareSync(p, userFound.password);
			
			if (compare) {
				
				return { passwordMatches: true, user: userFound };
			} else return { passwordMatches: false };
		} else return { passwordMatches: false };
	}


	function handleLogout() {
		setuser({});
	}


	function register(e, u, p) {
		let tempArray = dbUser;
		tempArray.push({ email: e, username: u, password: hash(p) });
		setdbUser(tempArray);
	
	}


	useEffect(() => {
		console.log(dbUser);
	}, [dbUser]);


	return (
		<>
			{user.username ? (
				<div className="authedt">
					
					<button className="logout" onClick={handleLogout}>
						
						Log out?
					</button>
				</div>
			) : (
				<div className={`wallpaper w-${login ? "login" : "signup"}`}>
					<div
						className={`switch s-${login ? "login" : "signup"}`}
						onClick={() => setlogin(!login)}
					>
						{login ? (
							<GetPage main={`Sign Up`} />
						) : (
							<GetPage main={`Go Back`} />
						)}
					</div>
					<div className="main-container">
						<Login
							login={login}
							authenticate={authenticate}
							setuser={setuser}
						/>
						
						<Register
							login={login}
							setlogin={setlogin}
							userExists={userExists}
							emailExists={emailExists}
							register={register}
						/>
					</div>
					
				</div>
			)}
		</>
	);
}




export default App;
