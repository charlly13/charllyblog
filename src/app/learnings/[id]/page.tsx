import Header from '@/components/header';
import Footer from '@/components/footer';
import { learningsData } from '@/lib/learnings-data';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function LearningPage({ params }: { params: { id: string } }) {
  const learning = learningsData.find((item) => item.id === params.id);

  if (!learning) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow py-16 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <Button asChild variant="ghost" className="mb-8">
              <Link href="/#learnings">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Learnings
              </Link>
            </Button>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline text-primary mb-6">
              {learning.title}
            </h1>
            <div className="prose prose-lg max-w-none text-foreground/80">
              <p>{learning.content}</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
