
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import ProductForm from './ProductForm';
import ProductList from './ProductList';

const ProductManager = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const handleEdit = (product: any) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingProduct(null);
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white/95 backdrop-blur-sm border-nature-moss/20">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-nature-forest">Product Management</CardTitle>
            <Button
              onClick={() => setShowForm(true)}
              className="bg-nature-moss hover:bg-nature-forest text-nature-sage"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Product
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {showForm ? (
            <ProductForm
              product={editingProduct}
              onClose={handleCloseForm}
              onSuccess={handleCloseForm}
            />
          ) : (
            <ProductList onEdit={handleEdit} />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductManager;
