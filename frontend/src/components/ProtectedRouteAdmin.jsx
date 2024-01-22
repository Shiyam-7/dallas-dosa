import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import { Outlet, Navigate } from "react-router-dom";

export default function PrivateRoute() {
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.auth);
  if (!token || !user) {
    return <Navigate to={"/sign-in"} />;
  }
  const role = user.roles.find((i) => i === 5150);
  if (role) {
    return <Outlet />;
  } else {
    dispatch(logout());
  }
}
