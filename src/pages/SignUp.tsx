import { SignUp as ClerkSignUp } from "@clerk/clerk-react";
import { Logo } from "@/components/Logo";

export function SignUp() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Logo size={48} />
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          Create your MyStaticSite account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Start building beautiful static websites today
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <ClerkSignUp 
            appearance={{
              elements: {
                formButtonPrimary: 'bg-black hover:bg-gray-800 text-sm normal-case',
                card: 'shadow-none',
                headerTitle: 'hidden',
                headerSubtitle: 'hidden',
                socialButtonsBlockButton: 'border-gray-300 text-gray-700 hover:bg-gray-50',
                formFieldInput: 'border-gray-300 focus:border-black focus:ring-black',
                footerActionLink: 'text-black hover:text-gray-800'
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}
