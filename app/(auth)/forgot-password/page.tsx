"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Logo from "@/components/Logo";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { verifyUserAndResetPassword } from "@/lib/actions/password";
import { useRouter } from "next/navigation";
import ErrorMessage from "@/components/ui/errorMessage";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    const result = await verifyUserAndResetPassword(email, mobile, newPassword);

    if (result.error) {
      setError(result.error);
      setLoading(false);
      return;
    }

    toast.success("Password reset successful! Please login.");
    setTimeout(() => router.push("/login"), 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <div className="w-full max-w-md px-6">
        <Card className="border border-gray-200 dark:border-gray-800 shadow-lg">
          <CardHeader className="text-center pb-2">
            <Link href="/" className="flex flex-col items-center mb-4">
              <Logo size={60} href="" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-3">RoomFinder</h2>
            </Link>
            <CardTitle className="text-2xl">Reset Password</CardTitle>
            <CardDescription>Enter your email and mobile to reset password</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <Input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Mobile</label>
                <Input
                  type="tel"
                  placeholder="9812345678"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  required
                  pattern="[0-9]{10}"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">New Password</label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  minLength={6}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Confirm Password</label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  minLength={6}
                />
              </div>
              {error && (
                <div className="flex justify-center">
                  <ErrorMessage message={error} className="text-xs" />
                </div>
              )}
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
              >
                {loading ? "Resetting..." : "Reset Password"}
              </Button>
            </form>
            <div className="text-center text-sm text-muted-foreground">
              <Link href="/login" className="text-primary hover:underline">
                Back to Sign In
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
