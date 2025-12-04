import Link from "next/link";
import { learningsData } from "@/lib/learnings-data";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

export default function Learnings() {
  return (
    <section id="learnings" className="w-full py-16 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline text-primary">
            What I've Learned
          </h2>
          <p className="max-w-[900px] text-foreground/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            A deeper dive into the concepts and technologies I've been focusing on.
          </p>
        </div>
        <div className="max-w-3xl mx-auto mt-12 grid gap-6">
          {learningsData.map((item) => (
            <Link href={`/learnings/${item.id}`} key={item.id}>
                <Card className="flex justify-between items-center hover:border-primary/50 transition-colors duration-300 p-4">
                  <div>
                    <CardTitle className="font-headline text-lg">{item.title}</CardTitle>
                  </div>
                  <ArrowRight className="h-5 w-5 text-primary" />
                </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
