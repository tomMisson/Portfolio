import { Component, AfterViewInit, inject, signal } from '@angular/core';
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
  private openGroups = signal<Record<string, boolean>>({});

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

  isOpen(issuer: string): boolean {
    return this.openGroups()[issuer] ?? false;
  }

  toggleGroup(issuer: string, event: Event): void {
    const body = (event.currentTarget as HTMLElement).nextElementSibling as HTMLElement;
    if (!body) return;

    if (this.isOpen(issuer)) {
      this.animateClose(body, () => {
        this.openGroups.update((groups) => ({ ...groups, [issuer]: false }));
      });
    } else {
      this.openGroups.update((groups) => ({ ...groups, [issuer]: true }));
      this.animateOpen(body);
    }
  }

  ngAfterViewInit() {
    gsap.registerPlugin(ScrollTrigger);
    setTimeout(() => this.initAnimations(), 500);
  }

  private animateOpen(body: HTMLElement): void {
    gsap.fromTo(
      body,
      { height: 0 },
      {
        height: body.scrollHeight,
        duration: 0.35,
        ease: 'power2.out',
        onComplete: () => gsap.set(body, { height: 'auto' }),
      }
    );
  }

  private animateClose(body: HTMLElement, onComplete: () => void): void {
    gsap.fromTo(
      body,
      { height: body.offsetHeight },
      {
        height: 0,
        duration: 0.3,
        ease: 'power2.in',
        onComplete,
      }
    );
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
