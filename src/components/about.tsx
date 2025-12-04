import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

export default function About() {
  return (
    <section id="about" className="w-full py-16 md:py-24 lg:py-32 bg-background">
      <div className="container grid items-center gap-8 px-4 md:px-6 lg:grid-cols-2 lg:gap-16">
        <div className="space-y-4">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline text-primary">About Me</h2>
          <p className="text-foreground/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            I am a dedicated and ambitious third-year IT student at New Era University, with a strong focus on cloud technologies and cybersecurity. My coursework has provided me with a solid foundation in network security, ethical hacking, and cloud infrastructure management.
          </p>
          <p className="text-foreground/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            I am passionate about building secure and scalable cloud-based solutions and constantly exploring new security challenges. My goal is to leverage my skills in a dynamic environment where I can contribute to protecting digital assets and infrastructure.
          </p>
        </div>
        <div className="flex justify-center">
          <Card className="w-full max-w-sm overflow-hidden rounded-lg shadow-lg">
            <CardContent className="p-0">
              <Image
                src="/images/profile.jpg"
                alt="Profile picture"
                width={400}
                height={400}
                className="object-cover w-full h-full"
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
