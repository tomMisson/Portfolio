import { Component, AfterViewInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LinkedInService } from '../../services/linkedin.service';
import { Certification } from '../../models/linkedin.model';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export interface CertGroup {
  issuer: string;
  logo?: string;
  certs: Certification[];
}

@Component({
  selector: 'app-certifications',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './certifications.component.html',
  styleUrl: './certifications.component.css'
})
export class CertificationsComponent implements AfterViewInit {
  public linkedinService = inject(LinkedInService);

  get certGroups(): CertGroup[] {
    const groups = new Map<string, CertGroup>();

    for (const cert of this.linkedinService.certifications()) {
      const existing = groups.get(cert.issuer);
      if (existing) {
        existing.certs.push(cert);
      } else {
        groups.set(cert.issuer, {
          issuer: cert.issuer,
          logo: cert.logo,
          certs: [cert],
        });
      }
    }

    return Array.from(groups.values());
  }

  ngAfterViewInit() {
    gsap.registerPlugin(ScrollTrigger);
    setTimeout(() => this.initAnimations(), 500);
  }

  private initAnimations() {
    gsap.to('.cert-group', {
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
