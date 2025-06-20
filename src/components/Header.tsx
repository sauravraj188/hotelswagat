
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import ProfileDropdown from './ProfileDropdown';

const Header = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string; isLoggedIn: boolean } | null>(null);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Check for user data on component mount and storage changes
  useEffect(() => {
    const checkUserStatus = () => {
      const userData = localStorage.getItem('user');
      if (userData) {
        try {
          const parsedUser = JSON.parse(userData);
          setUser(parsedUser);
        } catch (error) {
          console.error('Error parsing user data:', error);
          localStorage.removeItem('user');
        }
      }
    };

    checkUserStatus();
    
    // Listen for storage changes (in case user logs in from another tab)
    window.addEventListener('storage', checkUserStatus);
    
    return () => {
      window.removeEventListener('storage', checkUserStatus);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');   // clear user info
  localStorage.removeItem('token');  // clear JWT
    setUser(null);
    setIsMenuOpen(false);
    navigate('/');
  };

  const handleLoginClick = () => {
    navigate('/login');
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">H</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-hotel-blue">Hotel Swagat</h1>
              <p className="text-xs text-muted-foreground">Experience Hospitality</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-foreground hover:text-primary transition-colors">
              Home
            </Link>
            <Link to="/rooms" className="text-foreground hover:text-primary transition-colors">
              Rooms
            </Link>
            <Link to="/about" className="text-foreground hover:text-primary transition-colors">
              About
            </Link>
            <Link to="/contact" className="text-foreground hover:text-primary transition-colors">
              Contact
            </Link>
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {user?.isLoggedIn ? (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Welcome, {user.name}!</span>
                <ProfileDropdown user={user} onLogout={handleLogout} />
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={handleLoginClick}
                >
                  Login
                </Button>
                <Button size="sm" onClick={handleLoginClick}>Sign Up</Button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t bg-white animate-fade-in">
            <div className="py-4 space-y-4">
              <Link 
                to="/" 
                className="block px-4 py-2 text-foreground hover:bg-gray-50 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/rooms" 
                className="block px-4 py-2 text-foreground hover:bg-gray-50 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Rooms
              </Link>
              <Link 
                to="/about" 
                className="block px-4 py-2 text-foreground hover:bg-gray-50 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                to="/contact" 
                className="block px-4 py-2 text-foreground hover:bg-gray-50 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              
              {/* Mobile Auth */}
              <div className="px-4 pt-4 border-t space-y-2">
                {user?.isLoggedIn ? (
                  <>
                    <p className="text-sm text-gray-600 mb-2">Welcome, {user.name}!</p>
                    <Link 
                      to="/profile" 
                      className="block w-full text-left px-0 py-2 text-sm hover:bg-gray-50"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Manage Profile
                    </Link>
                    <Link 
                      to="/booking-history" 
                      className="block w-full text-left px-0 py-2 text-sm hover:bg-gray-50"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Booking History
                    </Link>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="w-full justify-start px-0"
                      onClick={handleLogout}
                    >
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="w-full"
                      onClick={handleLoginClick}
                    >
                      Login
                    </Button>
                    <Button size="sm" className="w-full" onClick={handleLoginClick}>Sign Up</Button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
