import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Mail } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="w-full py-16 md:py-24 lg:py-32 bg-card">
      <div className="container px-4 md:px-6">
        <Card className="max-w-2xl mx-auto border-border">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline text-primary">Contact Me</CardTitle>
            <CardDescription className="text-foreground/80 md:text-xl/relaxed pt-2">
              The best way to reach me is by email.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center">
              <a href="mailto:nicolecharlly.matanguihan@neu.edu.ph" className="inline-flex items-center gap-2 text-lg font-medium text-primary hover:underline">
                <Mail className="h-5 w-5" />
                nicolecharlly.matanguihan@neu.edu.ph
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
