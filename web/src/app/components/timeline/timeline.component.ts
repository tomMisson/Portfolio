import { Component, AfterViewInit, ElementRef, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LinkedInService } from '../../services/linkedin.service';
import { CertificationsComponent } from '../certifications/certifications.component';

@Component({
  selector: 'app-timeline',
  standalone: true,
  imports: [CommonModule, TranslateModule, CertificationsComponent],
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

  getDuration(period: string): string {
    const monthMap: Record<string, number> = {
      Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
      Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11
    };

    const parseDate = (str: string): Date => {
      if (str.trim().toLowerCase() === 'present') return new Date();
      const [mon, yr] = str.trim().split(' ');
      return new Date(parseInt(yr), monthMap[mon] ?? 0);
    };

    const [startStr, endStr] = period.split('-').map(s => s.trim());
    const start = parseDate(startStr);
    const end = parseDate(endStr);

    const totalMonths = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth()) + 1;
    const yrs = Math.floor(totalMonths / 12);
    const mos = totalMonths % 12;

    if (yrs && mos) return `${yrs} yr${yrs > 1 ? 's' : ''} ${mos} mo${mos > 1 ? 's' : ''}`;
    if (yrs) return `${yrs} yr${yrs > 1 ? 's' : ''}`;
    return `${mos} mo${mos > 1 ? 's' : ''}`;
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
