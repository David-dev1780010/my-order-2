
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 py-4 border-t text-sm">
      <div className="px-4">
        <div className="flex flex-wrap justify-center gap-3">
          <Link to="/about" className="text-gray-500 hover:text-gray-700">
            About
          </Link>
          <Link to="/contact" className="text-gray-500 hover:text-gray-700">
            Contact
          </Link>
          <Link to="/terms" className="text-gray-500 hover:text-gray-700">
            Terms
          </Link>
          <Link to="/privacy" className="text-gray-500 hover:text-gray-700">
            Privacy
          </Link>
        </div>
        <p className="text-center text-xs text-gray-500 mt-2">
          &copy; {new Date().getFullYear()} QuizMaster
        </p>
      </div>
    </footer>
  );
};

export default Footer;
