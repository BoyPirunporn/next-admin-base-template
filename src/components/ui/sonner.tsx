"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner, ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group "
      
      style={{
        "--normal-bg": "var(--primary)",
        "--normal-text": "var(--primary-foreground)",
        "--normal-border": "var(--border)",

        "--success-bg": "var(--success)",
        "--success-text": "var(--success-foreground)",
        "--success-border": "var(--border)",

        "--destructive-bg": "var(--destructive)",
        "--destructive-text": "var(--destructive-foreground)",
        "--destructive-border": "var(--border)",

        "--warning-bg": "var(--warning)",
        "--warning-text": "var(--warning-foreground)",
        "--warning-border": "var(--border)",

        "--info-bg": "var(--info)",
        "--info-text": "var(--info-foreground)",
        "--info-border": "var(--border)",
      } as React.CSSProperties}
      {...props}
    />
  );
};

export { Toaster };
