import React, { useState } from "react";
import GetError from "./GetError";
import GetInput from "./GetInput";


export default function Register({
	login,
	setlogin,
	userExists,
	register,
	emailExists,
}) {
	const [emailReg, setemailReg] = useState("");
	const [usernameReg, setusernameReg] = useState("");
	const [passwordReg, setpasswordReg] = useState("");
	const [passwordConfReg, setpasswordConfReg] = useState("");
	const [error, seterror] = useState("");
	const [emailError, setemailError] = useState("");
	const [usernameError, setusernameError] = useState("");
	const [passwordError, setpasswordError] = useState("");
	const [passwordConfError, setpasswordConfError] = useState("");



	function passwordValid() {
		return (
			passwordReg.match(/[a-z]+/) &&
			passwordReg.match(/[0-9]+/) &&
			passwordReg.match(/[A-Z]+/) &&
			passwordReg.length >= 8
		);
	}



	function handleSignup(e) {
		e.preventDefault();
		seterror("");
		setemailError("");
		setusernameError("");
		setpasswordError("");
		setpasswordConfError("");

		const validEmail = checkEmailValidity(emailReg);
		const validEmail2 = emailExists(emailReg);
		if (validEmail === null) {
			setemailError("error-input");
			seterror("Please fill up all the fields.");
			return;
		}
		if (validEmail2) {
			setemailError("error-input");
			seterror("Email already exists.");
			return;
		}

	

		const validUsername = userExists(usernameReg);



		if (validUsername) {
			setusernameError("error-input");
			seterror("The username already exists.");
			return;
		}



		if (!passwordValid()) {
			setpasswordError("error-input");
			seterror(
				"Password must be 8 characters minimum and consists of an uppercase and lowercase with a number."
			);
			return;
		}



		if (passwordReg !== passwordConfReg) {
			setpasswordError("error-input");
			setpasswordConfError("error-input");
			seterror("The password and confirm password do not match.");
			return;
		}



		register(validEmail[0], usernameReg, passwordReg);
		alert(`Welcome ${usernameReg}! You succesfully registered.`);
		clrea();
		setlogin(true);
	}



	function clrea() {
		setemailReg("");
		setusernameReg("");
		setpasswordReg("");
		setpasswordConfReg("");
	}



	function checkEmailValidity(e) {
		const pattern = new RegExp(
			/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
		);
		const res = e.toLowerCase().match(pattern);

		return res;
	}


	
	return (
		<div className={`signup ${!login ? "active" : ""}`}>
			<form
				onSubmit={handleSignup}
				style={{ display: `${!login ? "flex" : "none"}` }}
			>
				<GetInput
					style={emailError}
					label={"Email"}
					id={`emailReg`}
					data={emailReg}
					setdata={setemailReg}
					type={"email"}
					clearError={() => {
						error !== "" && seterror("");
						emailError !== "" && setemailError("");
					}}
				/>
				<GetInput
					style={usernameError}
					label={"Username"}
					id={`usernameReg`}
					data={usernameReg}
					setdata={setusernameReg}
					type={"text"}
					clearError={() => {
						error !== "" && seterror("");
						usernameError !== "" && setusernameError("");
					}}
				/>
				<GetInput
					style={passwordError}
					label={"Password"}
					id={`passwordReg`}
					data={passwordReg}
					setdata={setpasswordReg}
					type={"password"}
					clearError={() => {
						error !== "" && seterror("");
						passwordError !== "" && setpasswordError("");
						passwordConfError !== "" && setpasswordConfError("");
					}}
				/>
				<GetInput
					style={passwordConfError}
					label={"Confirm Password"}
					id={`passwordConfReg`}
					data={passwordConfReg}
					setdata={setpasswordConfReg}
					type={"password"}
					clearError={() => {
						error !== "" && seterror("");
						passwordError !== "" && setpasswordError("");
						passwordConfError !== "" && setpasswordConfError("");
					}}
				/>
				<GetError text={error} />
				<input type="submit" value="Register" />
			</form>
		</div>
	);
}
