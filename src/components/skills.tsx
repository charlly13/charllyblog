import { Badge } from "@/components/ui/badge";

const skillsData = {
  "Cloud Computing": ["AWS", "Google Cloud"],
  "Cybersecurity": ["Network Security", "Penetration Testing"],
  "Tools & Technologies": ["Git"],
};

export default function Skills() {
  return (
    <section id="skills" className="w-full py-16 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline text-primary">Skills Matrix</h2>
          <p className="max-w-[900px] text-foreground/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            A collection of my technical skills and technologies I've worked with.
          </p>
        </div>
        <div className="grid gap-8 mt-12 md:grid-cols-2 lg:grid-cols-3">
          {Object.entries(skillsData).map(([category, skills]) => (
            <div key={category} className="p-6 rounded-lg border bg-card hover:border-primary/50 transition-colors duration-300">
              <h3 className="text-xl font-bold mb-4 font-headline text-primary/80">{category}</h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="text-sm px-3 py-1">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
