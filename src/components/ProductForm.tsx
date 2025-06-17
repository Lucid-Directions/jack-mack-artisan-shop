
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { Image, Upload, X } from 'lucide-react';

interface ProductFormProps {
  product?: any;
  onClose: () => void;
  onSuccess: () => void;
}

const ProductForm = ({ product, onClose, onSuccess }: ProductFormProps) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: product?.title || '',
    description: product?.description || '',
    price: product?.price || '',
    wood_type: product?.wood_type || '',
    category: product?.category || 'one-off-art',
    stock_status: product?.stock_status || 'available',
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>(product?.image_url || '');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async (file: File) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `product-images/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('products')
      .upload(filePath, file);

    if (uploadError) {
      throw uploadError;
    }

    const { data } = supabase.storage
      .from('products')
      .getPublicUrl(filePath);

    return data.publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    try {
      let imageUrl = product?.image_url || '';

      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      }

      const productData = {
        ...formData,
        price: formData.price ? parseFloat(formData.price) : null,
        image_url: imageUrl,
        created_by: user.id,
      };

      if (product) {
        const { error } = await supabase
          .from('products')
          .update(productData)
          .eq('id', product.id);

        if (error) throw error;

        toast({
          title: 'Success',
          description: 'Product updated successfully!',
        });
      } else {
        const { error } = await supabase
          .from('products')
          .insert([productData]);

        if (error) throw error;

        toast({
          title: 'Success',
          description: 'Product created successfully!',
        });
      }

      onSuccess();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-nature-forest">
          {product ? 'Edit Product' : 'Add New Product'}
        </h3>
        <Button
          type="button"
          variant="ghost"
          onClick={onClose}
          className="text-nature-charcoal hover:text-nature-forest"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="title" className="text-nature-forest">Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="border-nature-moss/30 focus:border-nature-moss"
              required
            />
          </div>

          <div>
            <Label htmlFor="price" className="text-nature-forest">Price (£)</Label>
            <Input
              id="price"
              type="number"
              step="0.01"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="border-nature-moss/30 focus:border-nature-moss"
            />
          </div>

          <div>
            <Label htmlFor="wood_type" className="text-nature-forest">Wood Type</Label>
            <Input
              id="wood_type"
              value={formData.wood_type}
              onChange={(e) => setFormData({ ...formData, wood_type: e.target.value })}
              className="border-nature-moss/30 focus:border-nature-moss"
              placeholder="e.g., Black Walnut, Cherry, Oak"
            />
          </div>

          <div>
            <Label htmlFor="category" className="text-nature-forest">Category</Label>
            <Select
              value={formData.category}
              onValueChange={(value) => setFormData({ ...formData, category: value })}
            >
              <SelectTrigger className="border-nature-moss/30 focus:border-nature-moss">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="one-off-art">One-Off Art</SelectItem>
                <SelectItem value="kitchenware">Kitchenware</SelectItem>
                <SelectItem value="finishing-products">Finishing Products</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="stock_status" className="text-nature-forest">Stock Status</Label>
            <Select
              value={formData.stock_status}
              onValueChange={(value) => setFormData({ ...formData, stock_status: value })}
            >
              <SelectTrigger className="border-nature-moss/30 focus:border-nature-moss">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="sold">Sold</SelectItem>
                <SelectItem value="reserved">Reserved</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="description" className="text-nature-forest">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="border-nature-moss/30 focus:border-nature-moss min-h-[120px]"
              placeholder="Describe the piece, its dimensions, unique features..."
            />
          </div>

          <div>
            <Label htmlFor="image" className="text-nature-forest">Product Image</Label>
            <div className="space-y-4">
              {imagePreview && (
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-48 object-cover rounded-md border border-nature-moss/30"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={() => {
                      setImagePreview('');
                      setImageFile(null);
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="image"
                  className="flex flex-col items-center justify-center w-full h-32 border-2 border-nature-moss/30 border-dashed rounded-lg cursor-pointer bg-nature-sage/50 hover:bg-nature-sage/70"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-8 h-8 mb-4 text-nature-moss" />
                    <p className="mb-2 text-sm text-nature-charcoal">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-nature-charcoal/60">PNG, JPG or JPEG</p>
                  </div>
                  <input
                    id="image"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-4 justify-end">
        <Button
          type="button"
          variant="outline"
          onClick={onClose}
          className="border-nature-moss text-nature-moss hover:bg-nature-moss hover:text-nature-sage"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={loading}
          className="bg-nature-moss hover:bg-nature-forest text-nature-sage"
        >
          {loading ? 'Saving...' : (product ? 'Update Product' : 'Create Product')}
        </Button>
      </div>
    </form>
  );
};

export default ProductForm;
