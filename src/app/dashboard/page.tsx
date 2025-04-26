import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import UserProfile from '@/components/auth/user-profile';

export const metadata = {
  title: 'Dashboard - Geometrik AI Course',
  description: 'Your personal dashboard for Geometrik AI Course',
};

export default async function DashboardPage() {
  const supabase = createClient();
  
  const { data: { session } } = await supabase.auth.getSession();
  
  // If user is not logged in, redirect to login page
  if (!session) {
    redirect('/login');
  }

  return (
    <div className="container max-w-7xl mx-auto py-12">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-8">
          <div className="bg-card rounded-lg shadow p-6">
            <h2 className="text-2xl font-semibold mb-4">Welcome back!</h2>
            <p className="text-muted-foreground mb-4">
              Here you can manage your account, track your progress, and access your courses.
            </p>
            <div className="border rounded-lg p-4 bg-muted/50">
              <h3 className="font-medium mb-2">Getting Started</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Complete your profile information</li>
                <li>Browse available courses</li>
                <li>Join the community discussions</li>
                <li>Track your learning progress</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="md:col-span-4">
          <UserProfile />
        </div>
      </div>
    </div>
  );
} 