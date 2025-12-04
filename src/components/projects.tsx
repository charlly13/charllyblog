import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Github, ExternalLink } from "lucide-react";

const projectsData: any[] = [];

export default function Projects() {
  return (
    <section id="projects" className="w-full py-16 md:py-24 lg:py-32 bg-card">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline text-primary">My Projects</h2>
          <p className="max-w-[900px] text-foreground/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            This section is currently under construction. Please check back later!
          </p>
        </div>
        {projectsData.length > 0 && (
          <div className="grid gap-8 mt-12 md:grid-cols-2 lg:grid-cols-3">
            {projectsData.map((project) => {
              const projectImage = PlaceHolderImages.find(p => p.id === project.id);
              return (
                <Card key={project.id} className="flex flex-col hover:border-primary/50 transition-colors duration-300">
                  <CardHeader>
                    <CardTitle className="font-headline">{project.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    {projectImage && (
                      <Image
                        src={projectImage.imageUrl}
                        alt={project.title}
                        data-ai-hint={project.imageHint}
                        width={600}
                        height={400}
                        className="rounded-lg object-cover mb-4"
                      />
                    )}
                    <p className="text-sm text-foreground/70">{project.description}</p>
                  </CardContent>
                  <CardFooter className="flex justify-start gap-4">
                    <Button variant="outline" asChild className="hover:bg-accent hover:text-accent-foreground">
                      <Link href={project.githubUrl} target="_blank">
                        <Github className="mr-2 h-4 w-4" /> GitHub
                      </Link>
                    </Button>
                    <Button variant="outline" asChild className="hover:bg-accent hover:text-accent-foreground">
                      <Link href={project.liveUrl} target="_blank">
                        <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
