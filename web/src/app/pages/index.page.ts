import { Component } from '@angular/core';
import { HeroComponent } from '../components/hero/hero.component';
import { ProjectsComponent } from '../components/projects/projects.component';
import { TimelineComponent } from '../components/timeline/timeline.component';
import { ContactComponent } from '../components/contact/contact.component';
import { TranslateModule } from '@ngx-translate/core';
import { RouteMeta } from '@analogjs/router';

export const routeMeta: RouteMeta = {
  title: 'Tom Misson | Senior Software Engineer',
  meta: [
    {
      name: 'description',
      content: 'Software Engineer specializing in .NET C#, Angular, React and IoT. Check out my projects and professional journey.',
    },
    {
      name: 'author',
      content: 'Tom Misson',
    },
    {
      name: 'keywords',
      content: 'Senior Software Engineer, Software Developer, .NET Developer, TypeScript, Automation, Portfolio, Manchester',
    },
    {
      name: 'robots',
      content: 'index, follow',
    },
    {
      name: 'theme-color',
      content: '#ff9800',
    },
    {
      property: 'og:title',
      content: 'Tom Misson | Senior Software Engineer',
    },
    {
      property: 'og:description',
      content: 'Senior Software Engineer specializing in Angular, .NET, and automation. Check out my projects and professional journey.',
    },
    {
      property: 'og:image',
      content: '/profile.jpg',
    },
    {
      name: 'twitter:card',
      content: 'summary_large_image',
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