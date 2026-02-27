import { Outlet, Link, useLocation } from "react-router";
import { Flower2, Menu, X } from "lucide-react";
import { useState } from "react";

export function Layout() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-primary border-b-4 border-secondary shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative">
                <Flower2 className="w-10 h-10 text-secondary group-hover:rotate-12 transition-transform duration-300" />
                <div className="absolute inset-0 bg-secondary blur-xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white tracking-wide">Tamil Olaisuvadi</h1>
                <p className="text-xs text-secondary">தமிழ் ஓலைசுவடி</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <Link
                to="/"
                className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                  isActive("/")
                    ? "bg-secondary text-primary shadow-lg scale-105"
                    : "text-white hover:bg-white/10"
                }`}
              >
                முகப்பு
              </Link>
              <Link
                to="/upload"
                className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                  isActive("/upload")
                    ? "bg-secondary text-primary shadow-lg scale-105"
                    : "text-white hover:bg-white/10"
                }`}
              >
                பதிவேற்று
              </Link>
              <Link
                to="/about"
                className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                  isActive("/about")
                    ? "bg-secondary text-primary shadow-lg scale-105"
                    : "text-white hover:bg-white/10"
                }`}
              >
                எங்களை பற்றி
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden pb-4 space-y-2">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-3 rounded-lg transition-all ${
                  isActive("/")
                    ? "bg-secondary text-primary"
                    : "text-white hover:bg-white/10"
                }`}
              >
                முகப்பு (Home)
              </Link>
              <Link
                to="/upload"
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-3 rounded-lg transition-all ${
                  isActive("/upload")
                    ? "bg-secondary text-primary"
                    : "text-white hover:bg-white/10"
                }`}
              >
                பதிவேற்று (Upload)
              </Link>
              <Link
                to="/about"
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-3 rounded-lg transition-all ${
                  isActive("/about")
                    ? "bg-secondary text-primary"
                    : "text-white hover:bg-white/10"
                }`}
              >
                எங்களை பற்றி (About)
              </Link>
            </div>
          )}
        </div>
      </nav>

      {/* Decorative Pattern */}
      <div className="h-2 bg-gradient-to-r from-primary via-secondary to-accent"></div>

      {/* Main Content */}
      <main>
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="mt-20 bg-primary text-white py-12 border-t-4 border-secondary">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Flower2 className="w-8 h-8 text-secondary" />
                <h3 className="text-xl">Tamil Olaisuvadi</h3>
              </div>
              <p className="text-white/70">
                Preserving Tamil heritage through modern technology
              </p>
            </div>
            <div>
              <h4 className="mb-4 text-secondary">Quick Links</h4>
              <div className="space-y-2">
                <Link to="/" className="block text-white/70 hover:text-secondary transition-colors">
                  Home
                </Link>
                <Link to="/upload" className="block text-white/70 hover:text-secondary transition-colors">
                  Upload
                </Link>
                <Link to="/about" className="block text-white/70 hover:text-secondary transition-colors">
                  About
                </Link>
              </div>
            </div>
            <div>
              <h4 className="mb-4 text-secondary">Contact</h4>
              <p className="text-white/70">
                Email: info@tamilolaisuvadi.com<br />
                Phone: +91 XXX XXX XXXX
              </p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-white/20 text-center text-white/70">
            <p>&copy; 2026 Tamil Olaisuvadi. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
