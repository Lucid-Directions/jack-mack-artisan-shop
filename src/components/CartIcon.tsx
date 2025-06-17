
import { ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';

const CartIcon = () => {
  const { getTotalItems } = useCart();
  const itemCount = getTotalItems();

  return (
    <Link to="/cart">
      <Button variant="ghost" size="icon" className="relative text-nature-charcoal hover:text-nature-moss">
        <ShoppingCart className="h-5 w-5" />
        {itemCount > 0 && (
          <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-nature-moss text-nature-sage text-xs flex items-center justify-center p-0">
            {itemCount}
          </Badge>
        )}
      </Button>
    </Link>
  );
};

export default CartIcon;
