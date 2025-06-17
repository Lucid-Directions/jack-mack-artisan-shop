import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import AuthButton from './AuthButton';
import CartIcon from './CartIcon';
import logoImage from '/lovable-uploads/8509c152-cdb4-4f26-856a-dafd7addca55.png';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useAuth();

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'One-Off Art', href: '/one-off-art' },
    { name: 'Kitchenware', href: '/kitchenware' },
    { name: 'Finishing Products', href: '/finishing-products' },
  ];

  // Add admin link for logged-in users
  if (user) {
    navItems.push({ name: 'Admin', href: '/admin' });
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-nature-sage/95 backdrop-blur-sm border-b border-nature-moss/20">
      <div className="container mx-auto px-4 py-3 md:py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <Link to="/">
              <img 
                src={logoImage} 
                alt="Jack Mack Woodturning" 
                className="h-16 md:h-20 w-auto"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {navItems.map((item) => (
              item.href.startsWith('#') ? (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-nature-charcoal hover:text-nature-moss transition-colors duration-200 font-medium text-sm xl:text-base"
                >
                  {item.name}
                </a>
              ) : (
                <Link
                  key={item.name}
                  to={item.href}
                  className="text-nature-charcoal hover:text-nature-moss transition-colors duration-200 font-medium text-sm xl:text-base"
                >
                  {item.name}
                </Link>
              )
            ))}
            <CartIcon />
            <AuthButton />
          </nav>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-2">
            <CartIcon />
            <Button
              variant="ghost"
              size="icon"
              className="text-nature-charcoal hover:text-nature-moss p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="lg:hidden mt-4 pb-4 border-t border-nature-moss/20 pt-4">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                item.href.startsWith('#') ? (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-nature-charcoal hover:text-nature-moss transition-colors duration-200 font-medium text-lg py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                ) : (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="text-nature-charcoal hover:text-nature-moss transition-colors duration-200 font-medium text-lg py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                )
              ))}
              <div className="pt-2">
                <AuthButton />
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
