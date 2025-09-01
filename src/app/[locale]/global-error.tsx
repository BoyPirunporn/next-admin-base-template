'use client';

import { Button } from '@/components/ui/button';
import logger from '@/lib/logger';
import { useEffect } from 'react';
export class AppError extends Error {
  statusCode: number;
  digest?: string;

  constructor(message: string, statusCode = 500, digest?: string) {
    super(message);
    this.name = "AppError";
    this.statusCode = statusCode;
    this.digest = digest;
  }
}

export class AuthError extends AppError {
  constructor(message = "Unauthorized", statusCode = 401) {
    super(message, statusCode);
    this.name = "AuthError";
  }
}

export class PermissionError extends AppError {
  constructor(message = "Forbidden", statusCode = 403) {
    super(message, statusCode);
    this.name = "PermissionError";
  }
}

export class ApiError extends AppError {
  constructor(message: string, statusCode = 500) {
    super(message, statusCode);
    this.name = "ApiError";
  }
}
export default function GlobalError({
  error,
  reset,
}: {
  error: AppError;
  reset: () => void;
}) {
  useEffect(() => {
    logger.error(error);
  }, [error]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-5">
      <h2 className="text-center text-primary text-2xl md:text-7xl font-bold">Oop!! {error.statusCode}</h2>
      <p className="text-md text-center">
        {error.message ?? "Something went wrong, Please contact to administrator."}
      </p>
      <Button
        onClick={
          () => window.location.href = "/"
        }
      >
        Go to Homepage
      </Button>
    </main>
  );
}