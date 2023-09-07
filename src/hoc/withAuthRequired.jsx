import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectUser } from "../store/auth/auth-selectors";

export function withAuthRequired(Component) {
  return function ProtectedComponent() {
    const user = useSelector(selectUser);
    const navigate = useNavigate();

    useEffect(() => {
      if (!user) {
        navigate("/signin");
      }
    }, [user]);

    return user && <Component />;
  };
}
