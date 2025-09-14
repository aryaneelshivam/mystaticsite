# Clerk Authentication Setup

## ⚠️ **AUTHENTICATION CURRENTLY DISABLED**

The Clerk authentication has been temporarily disabled. To re-enable it:

1. Uncomment the ClerkProvider in `src/main.tsx`
2. Uncomment the AuthButton import and usage in `src/components/WebsiteBuilder.tsx`
3. Ensure your environment variables are set up correctly

## Environment Variables

Create a `.env.local` file in the root directory and add your Clerk publishable key:

```bash
VITE_CLERK_PUBLISHABLE_KEY=pk_test_ZW5vdWdoLWRvZy05NS5jbGVyay5hY2NvdW50cy5kZXYk
```

✅ **Environment file has been created with your key!**

## Getting Your Clerk Keys

1. Go to [clerk.com](https://clerk.com) and create an account
2. Create a new application
3. Go to the "API Keys" section in your dashboard
4. Copy the "Publishable key" and add it to your `.env.local` file

## Features Available (When Enabled)

- ✅ User authentication with Clerk
- ✅ Sign-in and Sign-up pages
- ✅ Authentication button in the header
- ✅ User profile display when signed in
- ✅ Sign-out functionality

## Routes Available (When Enabled)

- `/sign-in` - Sign in page
- `/sign-up` - Sign up page

## Components Available (When Enabled)

- `AuthButton` - Authentication button component
- `SignIn` - Sign in page component
- `SignUp` - Sign up page component

## To Re-enable Authentication

1. **Uncomment in `src/main.tsx`:**
   ```tsx
   import { ClerkProvider } from "@clerk/clerk-react";
   // ... other imports
   
   createRoot(document.getElementById("root")!).render(
     <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
       <App />
     </ClerkProvider>
   );
   ```

2. **Uncomment in `src/components/WebsiteBuilder.tsx`:**
   ```tsx
   import { AuthButton } from './AuthButton';
   // ... in the header section
   <AuthButton />
   ```

The authentication components are ready to be re-enabled when needed!
