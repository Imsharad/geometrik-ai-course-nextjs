import SignupForm from '@/components/auth/signup-form';

export const metadata = {
  title: 'Sign Up - Geometrik AI Course',
  description: 'Create a new account for Geometrik AI Course',
};

export default function SignupPage() {
  return (
    <div className="container max-w-7xl mx-auto py-12">
      <div className="flex flex-col items-center justify-center min-h-[70vh]">
        <h1 className="text-3xl font-bold mb-8 text-center">
          Create Your Account
        </h1>
        <SignupForm />
      </div>
    </div>
  );
} 