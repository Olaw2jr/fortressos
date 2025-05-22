"use client";

interface HeaderProps {
  title: string;
  description: string;
}

export function Header({ title, description }: HeaderProps) {
  return (
    <div className="flex flex-col items-center justify-center w-full gap-y-4">
      <h1 className="text-2xl font-semibold tracking-tight">
        {title}
      </h1>
      <p className="text-sm text-center text-muted-foreground">
        {description}
      </p>
    </div>
  );
}
