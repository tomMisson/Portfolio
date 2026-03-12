import { Component } from '@angular/core';
import { HeroComponent } from '../components/hero/hero.component';
import { ProjectsComponent } from '../components/projects/projects.component';
import { TimelineComponent } from '../components/timeline/timeline.component';
import { ContactComponent } from '../components/contact/contact.component';
import { TranslateModule } from '@ngx-translate/core';
import { RouteMeta } from '@analogjs/router';
import { SEO } from '../config/seo.config';

export const routeMeta: RouteMeta = {
  title: SEO.TITLE,
  meta: [
    { name: 'description',         content: SEO.DESCRIPTION },
    { name: 'author',              content: SEO.AUTHOR },
    { name: 'keywords',            content: SEO.KEYWORDS },
    { name: 'robots',              content: SEO.ROBOTS },
    { name: 'theme-color',         content: SEO.THEME_COLOR },
    { property: 'og:title',        content: SEO.TITLE },
    { property: 'og:description',  content: SEO.DESCRIPTION },
    { property: 'og:image',        content: SEO.OG_IMAGE },
    { property: 'og:url',          content: SEO.SITE_URL },
    { property: 'og:type',         content: SEO.OG_TYPE },
    { property: 'og:site_name',    content: SEO.SITE_NAME },
    { property: 'og:logo',         content: SEO.OG_LOGO },
    { name: 'twitter:card',        content: SEO.TWITTER_CARD },
    { name: 'twitter:title',       content: SEO.TITLE },
    { name: 'twitter:description', content: SEO.DESCRIPTION },
    { name: 'twitter:image',       content: SEO.OG_IMAGE },
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
