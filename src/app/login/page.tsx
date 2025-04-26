import LoginForm from '@/components/auth/login-form';

export const metadata = {
  title: 'Sign In - Geometrik AI Course',
  description: 'Sign in to your Geometrik AI Course account',
};

export default function LoginPage() {
  return (
    <div className="container max-w-7xl mx-auto py-12">
      <div className="flex flex-col items-center justify-center min-h-[70vh]">
        <h1 className="text-3xl font-bold mb-8 text-center">
          Sign In to Your Account
        </h1>
        <LoginForm />
      </div>
    </div>
  );
} 