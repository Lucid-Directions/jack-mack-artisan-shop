
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2, Image } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface ProductListProps {
  onEdit: (product: any) => void;
}

const ProductList = ({ onEdit }: ProductListProps) => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: 'Failed to fetch products',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Product deleted successfully',
      });

      fetchProducts();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="text-nature-charcoal">Loading products...</div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-8">
        <Image className="h-12 w-12 mx-auto text-nature-moss/50 mb-4" />
        <h3 className="text-lg font-medium text-nature-forest mb-2">No products yet</h3>
        <p className="text-nature-charcoal/60">Start by adding your first woodturning piece!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-nature-forest mb-4">
        Products ({products.length})
      </h3>
      
      <div className="grid gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="flex items-center gap-4 p-4 border border-nature-moss/20 rounded-lg bg-nature-sage/30"
          >
            <div className="flex-shrink-0">
              {product.image_url ? (
                <img
                  src={product.image_url}
                  alt={product.title}
                  className="w-16 h-16 object-cover rounded-lg border border-nature-moss/30"
                />
              ) : (
                <div className="w-16 h-16 bg-nature-moss/20 rounded-lg flex items-center justify-center">
                  <Image className="h-6 w-6 text-nature-moss/50" />
                </div>
              )}
            </div>

            <div className="flex-grow">
              <h4 className="font-semibold text-nature-forest">{product.title}</h4>
              <p className="text-sm text-nature-charcoal/70 line-clamp-2">{product.description}</p>
              <div className="flex gap-2 mt-2">
                <Badge variant="outline" className="border-nature-moss text-nature-moss">
                  {product.category?.replace('-', ' ')}
                </Badge>
                <Badge
                  variant={product.stock_status === 'available' ? 'default' : 'secondary'}
                  className={
                    product.stock_status === 'available'
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-500 text-white'
                  }
                >
                  {product.stock_status}
                </Badge>
                {product.price && (
                  <Badge variant="outline" className="border-nature-forest text-nature-forest">
                    £{product.price}
                  </Badge>
                )}
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onEdit(product)}
                className="border-nature-moss text-nature-moss hover:bg-nature-moss hover:text-nature-sage"
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => deleteProduct(product.id)}
                className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
