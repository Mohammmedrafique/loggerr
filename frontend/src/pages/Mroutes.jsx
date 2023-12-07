import { Routes, Route } from "react-router-dom";
import PostManagement from "./PostManagement";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";
const Mroutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<SignupForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/blogs" element={<PostManagement />} />
      </Routes>
    </div>
  );
};

export default Mroutes;
