import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white font-bold text-lg">
          Blog
        </Link>
        <div className="space-x-4">
          <Link to="/" className="text-white">
            Home
          </Link>
          <Link to="./login" className="text-white">
            Login
          </Link>
          <Link to="/blogs" className="text-white">
            Blog
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
