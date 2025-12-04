import fs from 'fs';
import path from 'path';

type Learning = {
  id: string;
  title: string;
  content: string;
};

const staticData: Learning[] = [
  {
    id: 'cloud-deployment-strategies',
    title: 'Cloud Deployment Strategies',
    content:
      "I've gained hands-on experience with various cloud deployment models, including blue-green deployments, canary releases, and rolling updates. This knowledge allows me to ensure minimal downtime and seamless updates for cloud-native applications on platforms like AWS and Google Cloud.",
  },
  {
    id: 'advanced-persistent-threat-defense',
    title: 'Advanced Persistent Threat (APT) Defense',
    content:
      "My studies in cybersecurity have equipped me with the skills to identify and mitigate Advanced Persistent Threats. I can analyze threat intelligence, implement layered security controls, and utilize endpoint detection and response (EDR) tools to protect networks from sophisticated attackers.",
  },
  {
    id: 'secure-software-development-lifecycle',
    title: 'Secure Software Development Lifecycle (SSDLC)',
    content:
      "I am proficient in integrating security into every phase of the software development lifecycle. From threat modeling in the design phase to static and dynamic analysis during development and testing, I focus on building security in from the start to create robust and resilient applications.",
  },
];

function loadMarkdownLearnings(): Learning[] {
  try {
    const dir = path.join(process.cwd(), 'content', 'learnings');
    if (!fs.existsSync(dir)) return [];

    return fs
      .readdirSync(dir)
      .filter((f) => f.endsWith('.md') || f.endsWith('.html'))
      .map((filename) => {
        const full = path.join(dir, filename);
        const raw = fs.readFileSync(full, 'utf8');

        let content = raw;
        const meta: Record<string, string> = {};
        const isHtml = filename.endsWith('.html');

        if (raw.startsWith('---')) {
          const end = raw.indexOf('\n---', 3);
          if (end !== -1) {
            const front = raw.slice(3, end + 1).trim();
            content = raw.slice(end + 5).trim();
            front.split(/\r?\n/).forEach((line) => {
              const idx = line.indexOf(':');
              if (idx !== -1) {
                const key = line.slice(0, idx).trim();
                const val = line.slice(idx + 1).trim().replace(/^"|"$/g, '');
                meta[key] = val;
              }
            });
          }
        }

        const id = meta['id'] || filename.replace(/\.(md|html)$/, '');
        const title = meta['title'] || filename.replace(/\.(md|html)$/, '').replace(/-/g, ' ');

        return { id, title, content } as Learning;
      });
  } catch (err) {
    return [];
  }
}

export const learningsData: Learning[] = [...staticData, ...loadMarkdownLearnings()];
