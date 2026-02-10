import { Component } from '@angular/core';
import { HeroComponent } from '../components/hero/hero.component';
import { ProjectsComponent } from '../components/projects/projects.component';
import { TimelineComponent } from '../components/timeline/timeline.component';
import { ContactComponent } from '../components/contact/contact.component';
import { TranslateModule } from '@ngx-translate/core';
import { RouteMeta } from '@analogjs/router';
import en from '../../../public/i18n/en.json';

// Function to resolve metadata based on language (defaults to 'en')
const getMetadata = (lang: string = 'en') => {
  // In a multi-lang setup, we would switch on 'lang' here
  const resources = { en };
  return resources.en.META;
};

export const routeMeta: RouteMeta = {
  title: getMetadata().TITLE,
  meta: [
    {
      name: 'description',
      content: getMetadata().DESCRIPTION,
    },
    {
      name: 'author',
      content: getMetadata().AUTHOR,
    },
    {
      name: 'keywords',
      content: getMetadata().KEYWORDS,
    },
    {
      name: 'robots',
      content: getMetadata().ROBOTS,
    },
    {
      name: 'theme-color',
      content: getMetadata().THEME_COLOR,
    },
    {
      property: 'og:title',
      content: getMetadata().OG_TITLE,
    },
    {
      property: 'og:description',
      content: getMetadata().OG_DESCRIPTION,
    },
    {
      property: 'og:image',
      content: getMetadata().OG_IMAGE,
    },
    {
      name: 'twitter:card',
      content: getMetadata().TWITTER_CARD,
    },
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
