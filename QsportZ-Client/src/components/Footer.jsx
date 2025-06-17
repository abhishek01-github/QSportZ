import { Link } from "react-router-dom";
import { FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-black text-gray-400 pt-12 pb-6 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand Column */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-3">QSportz</h2>
          <p className="text-sm">
            The ultimate platform for coaches and athletes to analyze, improve,
            and win.
          </p>
        </div>

        {/* Navigation Column */}
        <div className="flex flex-col justify-self-center">
          <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/about" className="hover:text-red-500 transition">
                About
              </Link>
            </li>
            <li>
              <Link to="/features" className="hover:text-red-500 transition">
                Features
              </Link>
            </li>
            <li>
              <Link to="/register" className="hover:text-red-500 transition">
                Sign Up
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-red-500 transition">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Media Column */}
        <div className="flex flex-col justify-self-center">
          <h3 className="text-lg font-semibold text-white mb-3">Follow Us</h3>
          <div className="flex space-x-4">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-red-500">
              <FaTwitter size={20} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-red-500">
              <FaLinkedin size={20} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-red-500">
              <FaInstagram size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Divider and bottom row */}
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-xs">
        &copy; {new Date().getFullYear()} QSportz. All rights reserved.
        <div className="mt-2 space-x-4">
          <Link to="/terms" className="hover:text-white">
            Terms
          </Link>
          <Link to="/privacy" className="hover:text-white">
            Privacy
          </Link>
        </div>
      </div>
    </footer>
  );
}
