import { useUser, useClerk } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { User, LogOut } from "lucide-react";

export function AuthButton() {
  const { isSignedIn, user } = useUser();
  const { signOut } = useClerk();

  if (isSignedIn) {
    return (
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="text-sm font-medium text-foreground">
            {user?.firstName || user?.emailAddresses[0]?.emailAddress}
          </span>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => signOut()}
          className="flex items-center space-x-1"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => window.location.href = '/sign-in'}
      >
        Sign In
      </Button>
      <Button
        size="sm"
        onClick={() => window.location.href = '/sign-up'}
      >
        Sign Up
      </Button>
    </div>
  );
}
