import { Navigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserContext } from "../Context/userContext";

const Protected = ({ isLoggedIn, children }) => {
    const {currentUser, setCurrentUser} = useContext(UserContext);
useEffect(() => {
  if(currentUser){
    isLoggedIn = true;
    if (!isLoggedIn) {
        return <Navigate to="/" replace />;
      }
  }
}, [currentUser]);

  return children;
};
export default Protected;