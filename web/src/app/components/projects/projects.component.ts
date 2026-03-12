import { Component, AfterViewInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GithubService } from '../../services/github.service';
import { TranslateModule } from '@ngx-translate/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent implements AfterViewInit {
  public githubService = inject(GithubService);

  ngAfterViewInit() {
    gsap.registerPlugin(ScrollTrigger);
    setTimeout(() => this.initAnimations(), 500);
  }

  private initAnimations() {
    gsap.to('.project-card', {
      scrollTrigger: {
        trigger: '#projects',
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
      opacity: 1,
      y: 0,
      duration: 0.5,
      stagger: 0.08,
      ease: 'power3.out',
    });
  }
}
