
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { LogOut, User } from 'lucide-react';

const AuthButton = () => {
  const { user, signOut, loading } = useAuth();

  if (loading) {
    return (
      <Button variant="ghost" size="sm" disabled>
        Loading...
      </Button>
    );
  }

  if (user) {
    return (
      <div className="flex items-center space-x-2">
        <div className="flex items-center space-x-1 text-nature-charcoal">
          <User className="h-4 w-4" />
          <span className="text-sm font-medium">Welcome, Jack</span>
        </div>
        <Button
          size="sm"
          onClick={signOut}
          className="bg-nature-moss hover:bg-nature-forest text-nature-sage"
        >
          <LogOut className="h-4 w-4 mr-1" />
          Sign Out
        </Button>
      </div>
    );
  }

  return null; // Don't show sign in button here anymore
};

export default AuthButton;
