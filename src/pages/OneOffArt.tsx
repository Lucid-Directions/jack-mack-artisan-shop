import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye, ShoppingCart } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useCart } from '@/contexts/CartContext';

const OneOffArt = () => {
  const [artPieces, setArtPieces] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const { addToCart } = useCart();

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('category', 'one-off-art')
        .eq('stock_status', 'available')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setArtPieces(data || []);
    } catch (error: any) {
      console.error('Error fetching products:', error);
      toast({
        title: 'Error',
        description: 'Failed to load products',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (piece: any) => {
    addToCart(piece);
    toast({
      title: "Added to Cart",
      description: `${piece.title} has been added to your cart.`,
    });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-nature-sage">
      <Header />
      
      <main className="pt-20 md:pt-24">
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8 md:mb-12">
              <Badge variant="outline" className="border-nature-moss text-nature-moss mb-4">
                Unique Artworks
              </Badge>
              <h1 className="text-2xl md:text-4xl font-playfair font-bold text-nature-forest mb-4">
                One-Off Art Pieces
              </h1>
              <p className="text-lg md:text-xl text-nature-charcoal/70 max-w-2xl mx-auto px-4">
                Each piece is completely unique, showcasing the natural beauty and character of the wood.
              </p>
            </div>

            {loading ? (
              <div className="text-center py-16">
                <div className="text-nature-charcoal">Loading products...</div>
              </div>
            ) : artPieces.length === 0 ? (
              <div className="text-center py-16">
                <h3 className="text-lg font-medium text-nature-forest mb-2">No products available</h3>
                <p className="text-nature-charcoal/60">Check back soon for new one-off art pieces!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
                {artPieces.map((piece) => (
                  <Card key={piece.id} className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 bg-nature-sage border-nature-moss/20 rounded-xl overflow-hidden">
                    <div className="relative">
                      <div className="h-56 md:h-80 w-full flex items-center justify-center relative overflow-hidden bg-gray-50">
                        {piece.image_url ? (
                          <img 
                            src={piece.image_url} 
                            alt={piece.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <>
                            <div className="absolute inset-0 bg-black/20"></div>
                            <span className="text-white/80 text-4xl md:text-6xl font-playfair relative z-10">JM</span>
                          </>
                        )}
                        <Badge className="absolute top-3 left-3 bg-nature-forest text-nature-sage text-xs">
                          1 of 1
                        </Badge>
                        
                        {/* Hover Actions - Hidden on mobile */}
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:flex items-center justify-center space-x-3">
                          <Link to={`/product/${piece.id}`}>
                            <Button size="sm" variant="secondary" className="bg-nature-sage text-nature-charcoal">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </Link>
                          <Button 
                            size="sm" 
                            className="bg-nature-moss text-nature-sage"
                            onClick={() => handleAddToCart(piece)}
                          >
                            <ShoppingCart className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    <CardContent className="p-4 md:p-6">
                      <h3 className="text-lg md:text-xl font-playfair font-semibold text-nature-forest mb-2">
                        {piece.title}
                      </h3>
                      <p className="text-nature-charcoal/60 mb-3 text-sm md:text-base">{piece.wood_type || 'Handcrafted Wood'}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-xl md:text-2xl font-bold text-nature-moss">
                          {piece.price ? `£${piece.price}` : 'Price on request'}
                        </span>
                        <Link to={`/product/${piece.id}`}>
                          <Button className="bg-nature-moss hover:bg-nature-forest text-nature-sage rounded-lg text-sm md:text-base px-3 md:px-4 py-2">
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

export default OneOffArt;
