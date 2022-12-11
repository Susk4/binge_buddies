import React, { useEffect, useState } from "react";
import useAuth from "../hook/useAuth";
import AuthService from "../services/AuthService";

export default function AuthStateChanged({ children }) {
	const { setUser } = useAuth();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		AuthService.waitForUser((userCred) => {
			setUser(userCred);
			setLoading(false);
		});
	}, []);

	if (loading) {
		return <h1>Loading...</h1>;
	}

	return children;
}