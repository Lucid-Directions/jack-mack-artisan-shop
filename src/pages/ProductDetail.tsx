
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useCart } from '@/contexts/CartContext';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchProduct = async () => {
    if (!id) return;
    
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (error) throw error;
      setProduct(data);
    } catch (error: any) {
      console.error('Error fetching product:', error);
      toast({
        title: 'Error',
        description: 'Failed to load product',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product);
    toast({
      title: "Added to Cart",
      description: `${product?.title} has been added to your cart.`,
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-nature-sage flex items-center justify-center">
        <div className="text-nature-charcoal">Loading product...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-nature-sage flex items-center justify-center">
        <div className="text-center px-4">
          <h1 className="text-xl md:text-2xl font-playfair font-bold text-nature-forest mb-4">Product Not Found</h1>
          <Button onClick={() => navigate('/one-off-art')} className="bg-nature-moss hover:bg-nature-forest text-nature-sage">
            Back to Products
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-nature-sage">
      <Header />
      
      <main className="pt-20 md:pt-24">
        <div className="container mx-auto px-4 py-8 md:py-16">
          <Button 
            onClick={() => navigate(-1)} 
            className="mb-6 md:mb-8 bg-nature-moss hover:bg-nature-forest text-nature-sage"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>

          <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
            {/* Product Image */}
            <div className="space-y-4">
              <div className="relative">
                <div className="aspect-square rounded-xl overflow-hidden bg-gray-50">
                  {product.image_url ? (
                    <img 
                      src={product.image_url} 
                      alt={product.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <>
                      <div className="absolute inset-0 bg-black/20"></div>
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-white/80 text-6xl md:text-8xl font-playfair">JM</span>
                      </div>
                    </>
                  )}
                  <Badge className="absolute top-4 left-4 bg-nature-forest text-nature-sage">
                    1 of 1
                  </Badge>
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6 md:space-y-8">
              <div>
                <h1 className="text-2xl md:text-4xl font-playfair font-bold text-nature-forest mb-4">
                  {product.title}
                </h1>
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
                  <span className="text-2xl md:text-3xl font-bold text-nature-moss">
                    {product.price ? `£${product.price}` : 'Price on request'}
                  </span>
                  {product.wood_type && (
                    <Badge variant="outline" className="border-nature-moss text-nature-moss w-fit">
                      {product.wood_type}
                    </Badge>
                  )}
                </div>
              </div>

              {product.description && (
                <div className="space-y-4">
                  <h3 className="text-lg md:text-xl font-playfair font-semibold text-nature-forest">Description</h3>
                  <p className="text-nature-charcoal/70 leading-relaxed text-sm md:text-base">
                    {product.description}
                  </p>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                {product.wood_type && (
                  <div>
                    <h4 className="font-semibold text-nature-forest mb-2">Wood Type</h4>
                    <p className="text-nature-charcoal/70 text-sm md:text-base">{product.wood_type}</p>
                  </div>
                )}
                <div>
                  <h4 className="font-semibold text-nature-forest mb-2">Category</h4>
                  <p className="text-nature-charcoal/70 capitalize text-sm md:text-base">{product.category?.replace('-', ' ')}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-nature-forest mb-2">Status</h4>
                  <p className="text-nature-charcoal/70 capitalize text-sm md:text-base">{product.stock_status}</p>
                </div>
              </div>

              <div className="bg-nature-moss/10 rounded-lg p-4 md:p-6">
                <h4 className="font-semibold text-nature-forest mb-2">Craftsmanship Promise</h4>
                <p className="text-nature-charcoal/70 text-sm">
                  Each piece is individually hand-crafted with care and attention to detail. 
                  As a one-off artwork, this piece is completely unique and will never be replicated.
                </p>
              </div>

              <div className="flex gap-4 pt-6">
                <Button 
                  onClick={handleAddToCart}
                  className="flex-1 bg-nature-moss hover:bg-nature-forest text-nature-sage text-sm md:text-base py-3"
                  disabled={product.stock_status === 'sold'}
                >
                  <ShoppingCart className="h-4 w-4 md:h-5 md:w-5 mr-2" />
                  {product.stock_status === 'sold' ? 'Sold Out' : 'Add to Cart'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;
