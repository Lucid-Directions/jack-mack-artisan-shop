import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye, ShoppingCart, Image } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useCart } from '@/contexts/CartContext';

const Kitchenware = () => {
  const [kitchenware, setKitchenware] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  const fetchKitchenware = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('category', 'kitchenware')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setKitchenware(data || []);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: 'Failed to fetch kitchenware products',
        variant: 'destructive',
      });
      console.error('Error fetching kitchenware:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchKitchenware();
  }, []);

  const getStockBadgeColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-600 text-white';
      case 'sold':
        return 'bg-red-600 text-white';
      case 'reserved':
        return 'bg-yellow-600 text-white';
      default:
        return 'bg-gray-600 text-white';
    }
  };

  const getStockDisplay = (status: string) => {
    switch (status) {
      case 'available':
        return 'In Stock';
      case 'sold':
        return 'Sold';
      case 'reserved':
        return 'Reserved';
      default:
        return status;
    }
  };

  const handleAddToCart = (item: any) => {
    addToCart(item);
    toast({
      title: "Added to Cart",
      description: `${item.title} has been added to your cart.`,
    });
  };

  return (
    <div className="min-h-screen bg-nature-sage">
      <Header />
      
      <main className="pt-20">
        <section className="py-8 md:py-16 nature-grain-bg">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8 md:mb-12">
              <Badge variant="outline" className="border-nature-moss text-nature-moss mb-4">
                Functional Beauty
              </Badge>
              <h1 className="text-3xl md:text-4xl font-playfair font-bold text-nature-forest mb-4">
                Kitchenware Collection
              </h1>
              <p className="text-lg md:text-xl text-nature-charcoal/70 max-w-2xl mx-auto px-4">
                Beautiful, functional pieces that bring artisan craftsmanship to your kitchen.
              </p>
            </div>

            {loading ? (
              <div className="text-center py-8">
                <div className="text-nature-charcoal">Loading kitchenware...</div>
              </div>
            ) : kitchenware.length === 0 ? (
              <div className="text-center py-8">
                <Image className="h-12 w-12 mx-auto text-nature-moss/50 mb-4" />
                <h3 className="text-lg font-medium text-nature-forest mb-2">No kitchenware available</h3>
                <p className="text-nature-charcoal/60">Check back soon for new pieces!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {kitchenware.map((item) => (
                  <Card key={item.id} className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 bg-nature-sage border-nature-moss/20 rounded-xl overflow-hidden">
                    <div className="relative">
                      <div className="aspect-square flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-amber-700 to-amber-800">
                        {item.image_url ? (
                          <img
                            src={item.image_url}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <>
                            <div className="absolute inset-0 bg-black/20"></div>
                            <span className="text-white/80 text-4xl md:text-6xl font-playfair relative z-10">JM</span>
                          </>
                        )}
                        
                        <Badge className={`absolute top-4 left-4 ${getStockBadgeColor(item.stock_status)}`}>
                          {getStockDisplay(item.stock_status)}
                        </Badge>
                        
                        {/* Hover Actions */}
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-3">
                          <Link to={`/product/${item.id}`}>
                            <Button size="sm" variant="secondary" className="bg-nature-sage text-nature-charcoal">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </Link>
                          <Button 
                            size="sm" 
                            className="bg-nature-moss text-nature-sage"
                            onClick={() => handleAddToCart(item)}
                            disabled={item.stock_status === 'sold'}
                          >
                            <ShoppingCart className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    <CardContent className="p-4 md:p-6">
                      <h3 className="text-lg md:text-xl font-playfair font-semibold text-nature-forest mb-2">
                        {item.title}
                      </h3>
                      {item.wood_type && (
                        <p className="text-nature-charcoal/60 mb-3 text-sm md:text-base">{item.wood_type}</p>
                      )}
                      {item.description && (
                        <p className="text-nature-charcoal/60 mb-3 text-sm line-clamp-2">{item.description}</p>
                      )}
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                        {item.price && (
                          <span className="text-xl md:text-2xl font-bold text-nature-moss">£{item.price}</span>
                        )}
                        <Link to={`/product/${item.id}`}>
                          <Button className="bg-nature-moss hover:bg-nature-forest text-nature-sage rounded-lg w-full sm:w-auto text-sm md:text-base px-3 md:px-4 py-2">
                            View Details
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Kitchenware;
