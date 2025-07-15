import { useState, useRef, useEffect } from 'react';
import { FiLogOut, FiUser, FiSettings, FiChevronDown } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const [user, setUser] = useState({});

  useEffect(() => {
    // Load user from localStorage
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      toast.success("logout Sccessfully")
      navigate("/");
      window.location.reload();
    }
  };

  return (
    <header className="flex items-center justify-between px-8 h-16 shadow-lg sticky top-0 z-50 bg-amber-50">
      <div className="text-xl font-bold text-indigo-600">
        <img src='https://www.bing.com/th/id/OIP.fXgYUVPqjNT-LJDpgiKoVAHaHa?w=198&h=211&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2' alt='logo' className='size-15 rounded-full'/>
      </div>
      
      <div className="relative">
        <input
          type="text"
          placeholder="Search..."
          className="py-2 px-4 pr-10 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 w-72 transition-all"
        />
        <svg
          className="absolute right-3 top-2.5 h-5 w-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>

      <div className="relative flex items-center gap-3" ref={dropdownRef}>
        <span className="hidden md:inline">{user.first_name || "User"}</span>
        <div 
          className="flex items-center gap-1 cursor-pointer"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <img src='https://tse1.explicit.bing.net/th/id/OIP.k8qLQpsbo1yNgPgIl1pmQQHaLG?pid=ImgDet&w=191&h=286&c=7&o=7&rm=3' alt='profile' className="w-10 h-10 rounded-full"/>
          <FiChevronDown className={`transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
        </div>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div className="absolute right-0 top-12 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-100">
            <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-100">
              <p className="font-medium">{user.first_name} {user.last_name}</p>
              <p className="text-gray-500 text-xs">{user.email}</p>
            </div>
            
            <a
              href="#"
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <FiUser className="mr-2" />
              Edit Profile
            </a>
            
            <a
              href="#"
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <FiSettings className="mr-2" />
              Settings
            </a>
            
            <button
              onClick={handleLogout}
              className="w-full text-left flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 transition-colors border-t border-gray-100"
            >
              <FiLogOut className="mr-2" />
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
