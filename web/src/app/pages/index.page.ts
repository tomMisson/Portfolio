import { Component } from '@angular/core';
import { HeroComponent } from '../components/hero/hero.component';
import { ProjectsComponent } from '../components/projects/projects.component';
import { TimelineComponent } from '../components/timeline/timeline.component';
import { ContactComponent } from '../components/contact/contact.component';
import { TranslateModule } from '@ngx-translate/core';
import { RouteMeta } from '@analogjs/router';
import en from '../../../public/i18n/en.json';

interface MetaConfig {
  TITLE: string;
  DESCRIPTION: string;
  AUTHOR: string;
  KEYWORDS: string;
  ROBOTS: string;
  THEME_COLOR: string;
  CANONICAL: string;
  OG_TITLE: string;
  OG_DESCRIPTION: string;
  OG_IMAGE: string;
  OG_URL: string;
  OG_TYPE: string;
  OG_SITE_NAME: string;
  TWITTER_CARD: string;
  TWITTER_TITLE: string;
  TWITTER_DESCRIPTION: string;
  TWITTER_IMAGE: string;
}

// Function to resolve metadata based on language (defaults to 'en')
const getMetadata = (lang: string = 'en'): MetaConfig => {
  // In a multi-lang setup, we would switch on 'lang' here
  const resources = { en };
  return resources.en.META as MetaConfig;
};

const meta = getMetadata();

export const routeMeta: RouteMeta = {
  title: meta.TITLE,
  meta: [
    { name: 'description',         content: meta.DESCRIPTION },
    { name: 'author',              content: meta.AUTHOR },
    { name: 'keywords',            content: meta.KEYWORDS },
    { name: 'robots',              content: meta.ROBOTS },
    { name: 'theme-color',         content: meta.THEME_COLOR },
    { property: 'og:title',        content: meta.OG_TITLE },
    { property: 'og:description',  content: meta.OG_DESCRIPTION },
    { property: 'og:image',        content: meta.OG_IMAGE },
    { property: 'og:url',          content: meta.OG_URL },
    { property: 'og:type',         content: meta.OG_TYPE },
    { property: 'og:site_name',    content: meta.OG_SITE_NAME },
    { name: 'twitter:card',        content: meta.TWITTER_CARD },
    { name: 'twitter:title',       content: meta.TWITTER_TITLE },
    { name: 'twitter:description', content: meta.TWITTER_DESCRIPTION },
    { name: 'twitter:image',       content: meta.TWITTER_IMAGE },
  ],
};

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeroComponent, TimelineComponent, ProjectsComponent, ContactComponent, TranslateModule],
  templateUrl: './index.page.html',
  styleUrl: './index.page.css',
})                                                        

export default class Home {
  get currentYear() {
    return new Date().getFullYear();
  } 
}
