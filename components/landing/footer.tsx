import { Shield } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="border bg-background mx-4 md:mx-20 my-6 rounded-xl">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-center text-sm text-muted-foreground">
        <div className="flex items-center gap-2 text-center">
          <Shield className="h-4 w-4 text-primary" />
          <span>Designed & Developed by Payal Yadav</span>
        </div>
      </div>
    </footer>
  );
};
