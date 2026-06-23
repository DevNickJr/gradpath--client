// app/components/AuthGuard.tsx
'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { PageLoader } from '../shared/loading-spinner';

interface AuthGuardProps {
  children: React.ReactNode;
  isLoading: boolean;
  isAuthenticated: boolean;
}

const ROUTES = { LOGIN: '/login' }; // Adjust path to match your config

export default function AuthGuard({ children, isLoading, isAuthenticated }: AuthGuardProps) {
  const router = useRouter()
  const pathname = usePathname();
  const searchParams = useSearchParams(); 

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      const queryString = searchParams.toString();
      const completePath = queryString ? `${pathname}?${queryString}` : pathname;
      
      // URL-encode the path so special characters (?, &) don't break the new URL
      const encodedPath = encodeURIComponent(completePath);
      
      router.push(`${ROUTES.LOGIN}?path=${encodedPath}`);
    }
  }, [isAuthenticated, isLoading, pathname, searchParams, router]);

  // Prevent flashing unauthenticated content while checking auth status
  if (isLoading || !isAuthenticated) {
    return <PageLoader /> 
  }

  return <>{children}</>;
}
