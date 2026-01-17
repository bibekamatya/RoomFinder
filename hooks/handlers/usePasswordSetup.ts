import { useState, useTransition } from "react";
import { setPassword } from "@/lib/actions/password";
import { useRouter } from "next/navigation";

export const usePasswordSetup = () => {
  const [password, setPasswordValue] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    startTransition(async () => {
      const result = await setPassword(password);
      
      if (result.error) {
        setError(result.error);
      } else {
        setSuccess(true);
        setTimeout(() => router.push("/"), 2000);
      }
    });
  };

  return {
    password,
    setPasswordValue,
    confirmPassword,
    setConfirmPassword,
    error,
    success,
    isPending,
    handleSubmit,
  };
};
