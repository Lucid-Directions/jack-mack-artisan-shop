
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft, CreditCard } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { toast } from '@/hooks/use-toast';
import { stripePromise } from '@/lib/stripe';

const Cart = () => {
  const { items, removeFromCart, updateQuantity, clearCart, getTotalPrice } = useCart();
  const [showCheckout, setShowCheckout] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  const handleCheckout = () => {
    if (items.length === 0) {
      toast({
        title: 'Cart is empty',
        description: 'Add some items to your cart before checking out.',
        variant: 'destructive',
      });
      return;
    }
    setShowCheckout(true);
  };

  const handleStripePayment = async () => {
    if (items.length === 0) return;
    
    setIsProcessingPayment(true);
    
    try {
      const stripe = await stripePromise;
      if (!stripe) {
        throw new Error('Stripe failed to initialize');
      }

      // Create payment intent on your backend
      // For now, we'll show a placeholder for backend integration
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: items.map(item => ({
            id: item.id,
            title: item.title,
            price: item.price,
            quantity: item.quantity
          })),
          amount: Math.round(getTotalPrice() * 100), // Convert to cents
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create payment intent');
      }

      const { clientSecret } = await response.json();

      // Redirect to Stripe Checkout or use Elements
      const { error } = await stripe.redirectToCheckout({
        sessionId: clientSecret
      });

      if (error) {
        throw error;
      }

    } catch (error) {
      console.error('Payment error:', error);
      toast({
        title: 'Payment Error',
        description: 'Unable to process payment. Please contact us directly.',
        variant: 'destructive',
      });
    } finally {
      setIsProcessingPayment(false);
    }
  };

  const handleSubmitOrder = () => {
    // Fallback order submission (non-payment)
    toast({
      title: 'Order Submitted!',
      description: 'We\'ll contact you shortly to arrange payment and delivery.',
    });
    clearCart();
    setShowCheckout(false);
  };

  if (showCheckout) {
    return (
      <div className="min-h-screen bg-nature-sage">
        <Header />
        <main className="pt-20">
          <div className="container mx-auto px-4 py-8">
            <div className="max-w-2xl mx-auto">
              <Button 
                onClick={() => setShowCheckout(false)}
                className="mb-6 bg-nature-moss hover:bg-nature-forest text-nature-sage"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Cart
              </Button>

              <Card className="bg-nature-sage border-nature-moss/20">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-playfair font-bold text-nature-forest mb-6">
                    Order Summary
                  </h2>
                  
                  <div className="space-y-4 mb-6">
                    {items.map((item) => (
                      <div key={item.id} className="flex justify-between items-center py-2 border-b border-nature-moss/20">
                        <div>
                          <h4 className="font-medium text-nature-forest">{item.title}</h4>
                          <p className="text-sm text-nature-charcoal/60">Quantity: {item.quantity}</p>
                        </div>
                        <span className="font-bold text-nature-moss">£{(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-nature-moss/20 pt-4 mb-6">
                    <div className="flex justify-between items-center text-xl font-bold text-nature-forest">
                      <span>Total:</span>
                      <span className="text-nature-moss">£{getTotalPrice().toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="bg-nature-moss/10 rounded-lg p-4 mb-6">
                    <h3 className="font-semibold text-nature-forest mb-2">Next Steps</h3>
                    <p className="text-nature-charcoal/70 text-sm">
                      We'll contact you within 24 hours to arrange payment and discuss delivery options. 
                      Each piece is handcrafted to order, so please allow 2-3 weeks for completion.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <Button 
                      onClick={handleStripePayment}
                      disabled={isProcessingPayment}
                      className="w-full bg-nature-moss hover:bg-nature-forest text-nature-sage py-3"
                    >
                      <CreditCard className="h-4 w-4 mr-2" />
                      {isProcessingPayment ? 'Processing...' : 'Pay with Stripe'}
                    </Button>
                    <Button 
                      onClick={handleSubmitOrder}
                      variant="outline"
                      className="w-full border-nature-moss text-nature-moss hover:bg-nature-moss hover:text-nature-sage py-3"
                    >
                      Submit Order Request (Pay Later)
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-nature-sage">
      <Header />
      
      <main className="pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center mb-8">
            <Link to="/">
              <Button variant="ghost" className="text-nature-charcoal hover:text-nature-moss">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Continue Shopping
              </Button>
            </Link>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-playfair font-bold text-nature-forest mb-4">
              Shopping Cart
            </h1>
            <Badge variant="outline" className="border-nature-moss text-nature-moss">
              {items.length} {items.length === 1 ? 'Item' : 'Items'}
            </Badge>
          </div>

          {items.length === 0 ? (
            <div className="text-center py-16">
              <ShoppingBag className="h-16 w-16 mx-auto text-nature-moss/50 mb-4" />
              <h3 className="text-lg font-medium text-nature-forest mb-2">Your cart is empty</h3>
              <p className="text-nature-charcoal/60 mb-6">Add some beautiful handcrafted pieces to get started!</p>
              <Link to="/one-off-art">
                <Button className="bg-nature-moss hover:bg-nature-forest text-nature-sage">
                  Browse Products
                </Button>
              </Link>
            </div>
          ) : (
            <div className="max-w-4xl mx-auto">
              <div className="space-y-4 mb-8">
                {items.map((item) => (
                  <Card key={item.id} className="bg-nature-sage border-nature-moss/20">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center gap-4">
                        <div className="w-full md:w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                          {item.image_url ? (
                            <img 
                              src={item.image_url} 
                              alt={item.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-amber-700 to-amber-800">
                              <span className="text-white/80 text-lg font-playfair">JM</span>
                            </div>
                          )}
                        </div>

                        <div className="flex-1">
                          <h3 className="text-lg font-playfair font-semibold text-nature-forest mb-1">
                            {item.title}
                          </h3>
                          {item.wood_type && (
                            <p className="text-nature-charcoal/60 text-sm mb-2">{item.wood_type}</p>
                          )}
                          <Badge variant="outline" className="border-nature-moss text-nature-moss text-xs">
                            {item.category.replace('-', ' ')}
                          </Badge>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-8 text-center font-medium">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>

                          <div className="text-right">
                            <div className="text-lg font-bold text-nature-moss">
                              £{(item.price * item.quantity).toFixed(2)}
                            </div>
                            {item.quantity > 1 && (
                              <div className="text-sm text-nature-charcoal/60">
                                £{item.price.toFixed(2)} each
                              </div>
                            )}
                          </div>

                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="bg-nature-sage border-nature-moss/20">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-playfair font-semibold text-nature-forest mb-1">
                        Order Total
                      </h3>
                      <p className="text-nature-charcoal/60 text-sm">
                        Including all selected items
                      </p>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-2xl font-bold text-nature-moss">
                        £{getTotalPrice().toFixed(2)}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-col sm:flex-row gap-3">
                    <Button
                      variant="outline"
                      onClick={clearCart}
                      className="border-red-300 text-red-600 hover:bg-red-50"
                    >
                      Clear Cart
                    </Button>
                    <Button
                      onClick={handleCheckout}
                      className="flex-1 bg-nature-moss hover:bg-nature-forest text-nature-sage py-3"
                    >
                      Proceed to Checkout
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Cart;
