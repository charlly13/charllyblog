import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowDown } from "lucide-react";

export default function Hero() {
  return (
    <section id="home" className="relative h-screen flex items-center justify-center text-center overflow-hidden">
       <div className="absolute inset-0 bg-background/80 z-10" />
      <div className="container relative z-20 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl md:text-6xl lg:text-7xl font-headline">
          Nicole Charlly A. Matanguihan
        </h1>
        <p className="mt-3 max-w-md mx-auto text-lg text-foreground/80 sm:text-xl md:mt-5 md:max-w-3xl">
          A third-year IT student at New Era University passionate about cloud computing and cybersecurity.
        </p>
        <div className="mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center">
          <div className="space-y-4 sm:space-y-0 sm:mx-auto sm:inline-grid">
            <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Link href="#projects">
                View My Work <ArrowDown className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
