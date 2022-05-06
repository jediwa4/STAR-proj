import React, { useState } from "react";
import GetError from "./GetError";
import GetInput from "./GetInput";


export default function Login({ login, authenticate, setuser }) {
	const [username, setusername] = useState("");
	const [password, setpassword] = useState("");
	const [error, seterror] = useState("");

	function handleLogin(e) {
		e.preventDefault();
		seterror("");
		const userData = authenticate(username, password);
		if (userData.passwordMatches) setuser(userData.user);
		else seterror("Username or Password is invalid.");
	}

	
	return (
		<div className={`login ${login ? "active" : ""}`}>
			<form
				onSubmit={handleLogin}
				style={{ display: `${login ? "flex" : "none"}` }}
			>
				<GetInput
					label={"Username"}
					id={`username`}
					data={username}
					setdata={setusername}
					type={"text"}
					clearError={() => error !== "" && seterror("")}
				/>
				<GetInput
					label={"Password"}
					id={`password`}
					data={password}
					setdata={setpassword}
					type={"password"}
					clearError={() => error !== "" && seterror("")}
				/>
				<GetError text={error} />
				<input type="submit" value="Login" />
			</form>
		</div>
	);
}
