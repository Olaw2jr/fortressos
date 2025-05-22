"use client";

import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Loader2 } from "lucide-react";

export function Social() {
  const [isLoading, setIsLoading] = useState<string | null>(null);

  const onClick = async (provider: "google" | "github") => {
    setIsLoading(provider);
    
    try {
      await signIn(provider, {
        callbackUrl: "/dashboard"
      });
    } catch (error) {
      console.error("Social sign in error:", error);
    } finally {
      setIsLoading(null);
    }
  };

  return (
    <div className="flex items-center w-full gap-x-2">
      <Button
        variant="outline"
        className="w-full"
        onClick={() => onClick("google")}
        disabled={!!isLoading}
      >
        {isLoading === "google" ? (
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
        ) : (
          <FcGoogle className="w-5 h-5 mr-2" />
        )}
        Google
      </Button>
      <Button
        variant="outline"
        className="w-full"
        onClick={() => onClick("github")}
        disabled={!!isLoading}
      >
        {isLoading === "github" ? (
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
        ) : (
          <FaGithub className="w-5 h-5 mr-2" />
        )}
        GitHub
      </Button>
    </div>
  );
}
