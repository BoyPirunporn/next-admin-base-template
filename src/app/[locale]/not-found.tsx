'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation'; // Use Next.js router for client-side navigation

// A simple lock icon component (can be replaced with an SVG or icon library)
const LockIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="120"
    height="120"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-gray-300"
  >
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
  </svg>
);

const NotFound = () => {
  const router = useRouter();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 text-center p-4">
      <LockIcon />
      <h1 className="text-4xl md:text-5xl font-bold text-primary mt-4">
        Access Denied
      </h1>
      <p className="max-w-md text-muted-foreground">
        Sorry, you don't have the key for this page, or the page doesn't exist. Please contact your administrator if you believe this is an error.
      </p>
      <Button
        onClick={() => router.push("/")} // Use router.push for faster, client-side navigation
        className="mt-4"
      >
        Return to Dashboard
      </Button>
    </main>
  );
};

export default NotFound;