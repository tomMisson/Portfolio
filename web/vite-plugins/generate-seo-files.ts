import type { Plugin, ResolvedConfig } from 'vite';
import { writeFileSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { SEO } from '../src/app/config/seo.config';

interface Experience {
  company: string;
  role: string;
  period: string;
  description: string;
}

interface Certification {
  name: string;
  issuer: string;
  date: string;
}

interface I18n {
  TIMELINE?: { SKILLS?: { LIST?: string[] } };
}

function generateRobotsTxt(): string {
  return [
    'User-agent: *',
    'Allow: /',
    '',
    `Sitemap: ${SEO.SITE_URL}/sitemap.xml`,
    '',
  ].join('\n');
}

function generateSitemapXml(): string {
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    '  <url>',
    `    <loc>${SEO.SITE_URL}/</loc>`,
    '    <changefreq>monthly</changefreq>',
    '    <priority>1.0</priority>',
    '  </url>',
    '</urlset>',
    '',
  ].join('\n');
}

function generateLlmsTxt(experience: Experience[], certs: Certification[], skills: string[]): string {
  const experienceLines = experience.map(
    e => `- ${e.company} — ${e.role} (${e.period}) — ${e.description}`,
  );

  const education = certs.filter(c => c.issuer === 'Manchester Metropolitan University');
  const certifications = certs.filter(c => c.issuer !== 'Manchester Metropolitan University');

  return [
    `# ${SEO.SITE_NAME} — Portfolio`,
    '',
    `> ${SEO.TAGLINE}`,
    '',
    '## About',
    '',
    SEO.BIO,
    '',
    `- [Portfolio](${SEO.SITE_URL}/)`,
    `- [LinkedIn](${SEO.LINKEDIN_URL})`,
    `- [GitHub](${SEO.GITHUB_URL})`,
    '',
    '## Experience',
    '',
    ...experienceLines,
    '',
    '## Education',
    '',
    ...education.map(e => `- ${e.name} — ${e.issuer} (${e.date})`),
    '',
    '## Skills',
    '',
    skills.join(', '),
    '',
    '## Certifications',
    '',
    ...certifications.map(c => `- ${c.name} — ${c.issuer} (${c.date})`),
    '',
  ].join('\n');
}

export function generateSeoFiles(): Plugin {
  let config: ResolvedConfig;

  return {
    name: 'generate-seo-files',

    configResolved(resolved) {
      config = resolved;
    },

    buildStart() {
      const pub = resolve(config.root, 'public');

      const experience: Experience[] = JSON.parse(readFileSync(resolve(pub, 'experience.json'), 'utf-8'));
      const certs: Certification[]   = JSON.parse(readFileSync(resolve(pub, 'certs.json'), 'utf-8'));
      const en: I18n                 = JSON.parse(readFileSync(resolve(pub, 'i18n/en.json'), 'utf-8'));
      const skills = en.TIMELINE?.SKILLS?.LIST ?? [];

      writeFileSync(resolve(pub, 'robots.txt'),  generateRobotsTxt());
      writeFileSync(resolve(pub, 'sitemap.xml'), generateSitemapXml());
      writeFileSync(resolve(pub, 'llms.txt'),    generateLlmsTxt(experience, certs, skills));

      config.logger.info('  ✓ robots.txt, sitemap.xml, llms.txt generated from seo.config.ts');
    },
  };
}
