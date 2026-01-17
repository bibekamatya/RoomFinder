import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { syncLocalFavorites } from "@/lib/actions";

export const useLoginHandler = () => {
  const INITIAL_STATE = {
    email: process.env.NODE_ENV === "development" ? "dev@gmail.com" : "",
    password: process.env.NODE_ENV === "development" ? "000000" : "",
  };

  const [formData, setFormData] = useState(INITIAL_STATE);
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsPending(true);

    try {
      const result = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (result?.error) {
        setError(result.error === "CredentialsSignin" 
          ? "Invalid email or password" 
          : result.error);
        setIsPending(false);
      } else if (result?.ok) {
        const session = await fetch("/api/auth/session").then((res) => res.json());
        const role = session?.user?.role;

        // Sync localStorage favorites to DB
        const localFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        if (localFavorites.length > 0) {
          await syncLocalFavorites(localFavorites);
          localStorage.removeItem('favorites');
        }

        // Check for redirect parameter
        const urlParams = new URLSearchParams(window.location.search);
        const redirect = urlParams.get('redirect');

        if (redirect) {
          router.push(redirect);
        } else if (role === "admin") {
          router.push("/dashboard/admin");
        } else if (role === "owner") {
          router.push("/dashboard");
        } else {
          router.push("/");
        }
        
        router.refresh();
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
      setIsPending(false);
    }
  };

  const handleGoogleSignIn = () => {
    signIn("google", { callbackUrl: "/owner" });
  };

  return {
    formData,
    setFormData,
    error,
    isPending,
    handleSubmit,
    handleGoogleSignIn,
  };
};
