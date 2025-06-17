
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Header from '@/components/Header';
import ProductManager from '@/components/ProductManager';

const Admin = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-nature-sage flex items-center justify-center">
        <div className="text-nature-charcoal">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-nature-sage">
      <Header />
      <div className="pt-24 pb-8">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-4xl font-playfair font-bold text-nature-forest mb-2">
              Admin Dashboard
            </h1>
            <p className="text-nature-charcoal/70">
              Manage your woodturning products and portfolio
            </p>
          </div>
          <ProductManager />
        </div>
      </div>
    </div>
  );
};

export default Admin;
