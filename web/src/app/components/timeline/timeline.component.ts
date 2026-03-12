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

  ngAfterViewInit() {
    gsap.registerPlugin(ScrollTrigger);
    
    setTimeout(() => this.initTimelineAnimations(), 500);
  }

  private initTimelineAnimations() {
    gsap.to('.timeline-item', {
      scrollTrigger: {
        trigger: '#journey',
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      },
      opacity: 1,
      x: 0,
      duration: 1,
      stagger: 0.2,
      ease: 'power3.out'
    });

    gsap.to('.parallax-card', {
      scrollTrigger: {
        trigger: '.parallax-card',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      },
      y: -80,
      ease: 'none'
    });
  }
}
