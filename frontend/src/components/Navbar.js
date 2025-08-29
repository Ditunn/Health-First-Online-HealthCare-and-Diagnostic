import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { MessageSquare, LogOut, User, Calendar } from 'lucide-react';

const Navbar = () => {
  const { userInfo, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-primary">
          Health First
        </Link>
        <div className="flex items-center space-x-4">
          {/* <button className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
           <MessageSquare className="w-4 h-4 mr-2" /> 
          </button> */}
          <ul className="flex items-center space-x-6 hidden md:flex">
            <li><Link to="/" className="text-gray-600 hover:text-primary transition-colors">Home</Link></li>
            <li><Link to="/about" className="text-gray-600 hover:text-primary transition-colors">About</Link></li>
            <li><Link to="/departments" className="text-gray-600 hover:text-primary transition-colors">Departments</Link></li>
            <li><Link to="/contact" className="text-gray-600 hover:text-primary transition-colors">Contact</Link></li>
          </ul>
        </div>
        <div className="flex items-center space-x-4">
          {userInfo ? (
            <div className="relative group py-3 -my-3"> {/* <-- THE FIX IS HERE */}
              <button className="flex items-center text-gray-700">
                <User className="w-5 h-5 mr-1" />
                {userInfo.name.split(' ')[0]}
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20 hidden group-hover:block">
                <Link to="/my-appointments" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  <Calendar className="w-4 h-4 mr-2" /> My Appointments
                </Link>
                <button onClick={handleLogout} className="w-full text-left flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  <LogOut className="w-4 h-4 mr-2" /> Logout
                </button>
              </div>
            </div>
          ) : (
            <Link to="/login" className="px-4 py-2 text-white bg-primary rounded-lg hover:bg-blue-700 transition-colors">
              Login / Register
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;