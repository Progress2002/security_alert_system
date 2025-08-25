import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import AdminSignIn from "./pages/AdminSignIn";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route>
          <Route index element={<Home />} />
          <Route path="sign-in" element={<SignIn />} />
          <Route path="admin/sign-in" element={<AdminSignIn />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
