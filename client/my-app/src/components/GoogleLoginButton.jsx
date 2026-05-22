"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (options: any) => void;
          renderButton: (element: HTMLElement, options: any) => void;
          cancel: () => void;
        };
      };
    };
  }
}

export default function GoogleLoginButton() {
  const { setUser } = useAuth();
  const router = useRouter();

  const handleGoogleLogin = async (credentialResponse: any) => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: credentialResponse.credential,
        }),
        credentials: "include",
      });

      const data = await response.json();

      if (response.ok && data.confirmation) {
        setUser(data.user);
        toast.success("Successfully logged in with Google!");
        router.push("/");
      } else {
        toast.error(data.message || "Google login failed");
      }
    } catch (error) {
      console.error("Google login error:", error);
      toast.error("Failed to login with Google");
    }
  };

  return (
    <div
      id="google-button"
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "1rem",
      }}
    />
  );
}
