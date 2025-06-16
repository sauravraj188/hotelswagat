
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-hotel-blue text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Hotel Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">H</span>
              </div>
              <div>
                <h2 className="text-xl font-bold">Hotel Swagat</h2>
                <p className="text-sm text-gray-300">Experience Hospitality</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm">
              Experience the finest hospitality at Hotel Swagat. We offer comfortable accommodations 
              with modern amenities and traditional Indian warmth.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/rooms" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Rooms & Suites
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Services</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>Room Service</li>
              <li>Free WiFi</li>
              <li>Complimentary Breakfast</li>
              <li>Parking</li>
              <li>Laundry Service</li>
              <li>24/7 Support</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Info</h3>
            <div className="space-y-2 text-sm text-gray-300">
              <p>Ghanta Ghar, Bhagat Singh Rd, next to Rajdoot sweets, Bijopuri</p>
              <p> Saharanpur, Uttar Pradesh  247001</p>
              <p>India</p>
              <p className="pt-2">
                <strong>Phone:</strong> +91 22 1234 5678
              </p>
              <p>
                <strong>Email:</strong> info@hotelswagat.com
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-300">
              © 2025 Hotel Swagat. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link to="/privacy" className="text-gray-300 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-300 hover:text-white transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
