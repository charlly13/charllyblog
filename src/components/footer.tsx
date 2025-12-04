import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full py-6 border-t border-border/40">
      <div className="container flex flex-col items-center justify-center gap-4 px-4 md:px-6">
        <p className="text-sm text-foreground/60">
          © {new Date().getFullYear()} niechy. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
