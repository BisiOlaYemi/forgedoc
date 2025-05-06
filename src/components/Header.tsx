import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Twitter, Book, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import logoImage from '../assets/images/forgelogo.png';

const Header: React.FC = () => {
  return (
    <motion.header 
      className="sticky top-0 z-40 w-full border-b border-gray-700 bg-gray-900 backdrop-blur supports-[backdrop-filter]:bg-gray-900/90 shadow-md"
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="container flex h-16 items-center justify-between px-4 sm:px-8">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center space-x-2">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center"
            >
              <img 
                src={logoImage} 
                alt="Flux Logo" 
                className="h-8 w-auto" 
              />
            </motion.div>
          </Link>
        </div>
        <nav className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-6">
            <Link to="/docs" className="text-sm font-medium text-gray-300 hover:text-blue-400 transition-colors">
              Docs
            </Link>
            <div className="relative group">
              <button className="flex items-center text-sm font-medium text-gray-300 hover:text-blue-400 transition-colors">
                Resources
                <ChevronDown size={16} className="ml-1" />
              </button>
              <div className="absolute top-full right-0 w-48 bg-gray-800 rounded-md shadow-lg py-2 mt-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10 border border-gray-700">
                <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">
                  Tutorials
                </a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">
                  Examples
                </a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">
                  Best Practices
                </a>
              </div>
            </div>
            <Link to="/community" className="text-sm font-medium text-gray-300 hover:text-blue-400 transition-colors">
              Community
            </Link>
            <Link to="/blog" className="text-sm font-medium text-gray-300 hover:text-blue-400 transition-colors">
              Blog
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/Fluxgo/flux"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium text-gray-300 transition-colors hover:text-blue-400"
            >
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </a>
            <a
              href="https://twitter.com/fluxframework"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium text-gray-300 transition-colors hover:text-blue-400"
            >
              <Twitter className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </a>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden sm:flex items-center px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-md transition-colors"
            >
              <Book size={16} className="mr-1" />
              Get Started
            </motion.button>
          </div>
        </nav>
      </div>
    </motion.header>
  );
};

export default Header;