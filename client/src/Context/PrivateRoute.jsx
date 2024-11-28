import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { userProvider } from "./UserProvider";

function PrivateRoute({ children }) {
    const [user] = useContext(userProvider);

    return user.userName ? children : <Navigate to="/" />;
}

export default PrivateRoute;
