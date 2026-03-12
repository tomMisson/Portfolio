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

export const routeMeta: RouteMeta = {
  title: getMetadata().TITLE,
  meta: [
    { name: 'description',        content: getMetadata().DESCRIPTION },
    { name: 'author',             content: getMetadata().AUTHOR },
    { name: 'keywords',           content: getMetadata().KEYWORDS },
    { name: 'robots',             content: getMetadata().ROBOTS },
    { name: 'theme-color',        content: getMetadata().THEME_COLOR },
    { property: 'og:title',       content: getMetadata().OG_TITLE },
    { property: 'og:description', content: getMetadata().OG_DESCRIPTION },
    { property: 'og:image',       content: getMetadata().OG_IMAGE },
    { property: 'og:url',         content: getMetadata().OG_URL },
    { property: 'og:type',        content: getMetadata().OG_TYPE },
    { property: 'og:site_name',   content: getMetadata().OG_SITE_NAME },
    { name: 'twitter:card',       content: getMetadata().TWITTER_CARD },
    { name: 'twitter:title',      content: getMetadata().TWITTER_TITLE },
    { name: 'twitter:description', content: getMetadata().TWITTER_DESCRIPTION },
    { name: 'twitter:image',      content: getMetadata().TWITTER_IMAGE },
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
