# Clerk Authentication Setup

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

## Features Added

- ✅ User authentication with Clerk
- ✅ Sign-in and Sign-up pages
- ✅ Authentication button in the header
- ✅ User profile display when signed in
- ✅ Sign-out functionality

## Routes Added

- `/sign-in` - Sign in page
- `/sign-up` - Sign up page

## Components Added

- `AuthButton` - Authentication button component
- `SignIn` - Sign in page component
- `SignUp` - Sign up page component

The authentication is now fully integrated into the MyStaticSite application!
