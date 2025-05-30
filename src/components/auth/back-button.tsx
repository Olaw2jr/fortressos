"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

interface BackButtonProps {
  label: string;
  href: string;
}

export function BackButton({
  label,
  href,
}: BackButtonProps) {
  return (
    <Button
      variant="link"
      className="w-full font-normal"
      size="sm"
      asChild
    >
      <Link href={href}>
        {label}
      </Link>
    </Button>
  );
}
