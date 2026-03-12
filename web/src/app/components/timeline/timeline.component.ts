import { Component, AfterViewInit, ElementRef, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LinkedInService } from '../../services/linkedin.service';
import { CertificationsComponent } from '../certifications/certifications.component';
import { EmploymentDurationPipe } from '../../pipes/employment-duration.pipe';

@Component({
  selector: 'app-timeline',
  standalone: true,
  imports: [CommonModule, TranslateModule, CertificationsComponent, EmploymentDurationPipe],
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.css'
})
export class TimelineComponent implements AfterViewInit {
  public linkedinService = inject(LinkedInService);
  @ViewChild('journey') journeySection!: ElementRef;

  get now(): Date { return new Date(); }

  ngAfterViewInit() {
    gsap.registerPlugin(ScrollTrigger);
    
    setTimeout(() => this.initTimelineAnimations(), 500);
  }

  private initTimelineAnimations() {
    // Each timeline item gets its own trigger so they fire individually on scroll
    gsap.utils.toArray<HTMLElement>('.timeline-item').forEach((item) => {
      gsap.fromTo(item,
        { opacity: 0, x: 20 },
        {
          scrollTrigger: {
            trigger: item,
            start: 'top 88%',
            toggleActions: 'play none none reverse',
          },
          opacity: 1,
          x: 0,
          duration: 0.6,
          ease: 'power3.out',
        }
      );
    });

    // Skills card fades up
    gsap.fromTo('.skills-card',
      { opacity: 0, y: 24 },
      {
        scrollTrigger: {
          trigger: '.skills-card',
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out',
      }
    );

    // Skill pills stagger in after the card appears
    gsap.fromTo('.skill-pill',
      { opacity: 0, scale: 0.75 },
      {
        scrollTrigger: {
          trigger: '.skills-card',
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
        opacity: 1,
        scale: 1,
        duration: 0.25,
        stagger: 0.04,
        ease: 'back.out(1.4)',
      }
    );

    gsap.to('.parallax-card', {
      scrollTrigger: {
        trigger: '.parallax-card',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
      y: -80,
      ease: 'none',
    });
  }
}
