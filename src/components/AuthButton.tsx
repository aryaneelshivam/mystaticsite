import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { UserAvatar } from './UserAvatar';

export function AuthButton() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return <div className="w-8 h-8 bg-muted rounded-full animate-pulse" />;
  }

  if (user) {
    return <UserAvatar />;
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => navigate('/auth')}
    >
      Sign In
    </Button>
  );
}