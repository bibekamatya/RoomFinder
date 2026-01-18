"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Logo from "@/components/Logo";
import Link from "next/link";
import ErrorMessage from "@/components/ui/errorMessage";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { useLoginHandler } from "@/hooks/handlers/useLoginHandler";

export default function LoginPage() {
  const {
    formData,
    setFormData,
    error,
    isPending,
    handleSubmit,
    handleGoogleSignIn,
  } = useLoginHandler();

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-b from-gray-50 via-white to-gray-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <div className="w-full max-w-md px-6">
        <Card className="border border-gray-200 dark:border-gray-800 shadow-lg">
          <CardHeader className="text-center pb-2">
            <Link href="/" className="flex flex-col items-center mb-4">
              <Logo size={60} href="" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-3">
                RoomFinder
              </h2>
            </Link>
            <CardTitle className="text-2xl">Welcome back</CardTitle>
            <CardDescription>Sign in to your account</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <Input
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, email: e.target.value }))
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Password</label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }))
                  }
                  required
                />
              </div>
              <div className="w-full flex justify-center">
                {error && <ErrorMessage message={error} className="text-xs" />}
              </div>
              <div className="flex justify-end">
                <Link
                  href="/forgot-password"
                  className="text-sm text-primary hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <Button
                type="submit"
                disabled={isPending}
                className="w-full bg-linear-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
              >
                {isPending ? "Signing in..." : "Sign In"}
              </Button>
            </form>

            <div className="text-center text-sm text-muted-foreground">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="text-primary hover:underline">
                Sign up
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
