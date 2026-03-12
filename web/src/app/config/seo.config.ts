const SITE_URL = 'https://tommisson.uk';

export const SEO = {
  // Core
  SITE_URL,
  SITE_NAME:    'Tom Misson',
  TITLE:        'Tom Misson | Software Engineer',
  DESCRIPTION:  'Software Engineer specializing in .NET C#, Angular, React and IoT. Check out my projects and professional journey.',
  KEYWORDS:     'Software Engineer, Software Developer, .NET Developer, TypeScript, Angular, React, Automation, Portfolio, Manchester',
  AUTHOR:       'Tom Misson',
  ROBOTS:       'index, follow',
  THEME_COLOR:  '#ff9800',
  OG_TYPE:      'website',
  TWITTER_CARD: 'summary_large_image',
  OG_IMAGE:     `${SITE_URL}/images/profile.jpg`,
  OG_LOGO:      `${SITE_URL}/images/profile.jpg`,

  // Social
  LINKEDIN_URL: 'https://www.linkedin.com/in/tommisson/',
  GITHUB_URL:   'https://github.com/tomMisson',

  // llms.txt profile content
  TAGLINE: 'Software Engineer specialising in .NET, Angular, TypeScript, and event-driven distributed architecture. Based in Manchester, UK.',
  BIO:     'Software Engineer with experience building enterprise-grade, full-stack applications across the travel, e-commerce, and IoT sectors.',
} as const;
