import { Component, AfterViewInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LinkedInService } from '../../services/linkedin.service';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-certifications',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './certifications.component.html',
  styleUrl: './certifications.component.css'
})
export class CertificationsComponent implements AfterViewInit {
  public linkedinService = inject(LinkedInService);

  ngAfterViewInit() {
    gsap.registerPlugin(ScrollTrigger);
    setTimeout(() => this.initAnimations(), 500);
  }

  private initAnimations() {
    gsap.to('.cert-item', {
      scrollTrigger: {
        trigger: '.cert-list',
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
      opacity: 1,
      y: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: 'power3.out',
    });
  }
}
