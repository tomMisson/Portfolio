import { Component, AfterViewInit, OnDestroy, ElementRef, ViewChild, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent implements AfterViewInit, OnDestroy {
  @ViewChild('content') content!: ElementRef;
  @ViewChild('avatar') avatar!: ElementRef;
  @ViewChild('scrollChevron') scrollChevron!: ElementRef;
  @ViewChild('networkCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;

  private ctx!: CanvasRenderingContext2D;
  private particles: Particle[] = [];
  private animationId: number = 0;
  private resizeObserver!: ResizeObserver;

  // Configuration
  private readonly particleCount = 40; 
  private readonly connectionDistance = 200; 
  private readonly maxConnections = 2;
  private readonly speed = 0.15;

  constructor(
    private translate: TranslateService,
    private ngZone: NgZone
  ) {
    translate.use('en');
  }

  ngAfterViewInit() {
    this.initAnimations();
    setTimeout(() => this.initCanvas(), 300);
  }

  ngOnDestroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  }

  private initAnimations() {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 1 } });
    
    // Initial Entrance
    tl.fromTo('.hero-text', 
      { y: 50, opacity: 0 }, 
      { y: 0, opacity: 1, stagger: 0.2, delay: 0.5 }
    );

    tl.fromTo(this.avatar.nativeElement,
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1.2 },
      "-=0.8"
    );

    // Fade in Chevron
    tl.fromTo(this.scrollChevron.nativeElement,
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 },
      "-=0.5"
    );

    // Subtle Floating Animation for Avatar
    gsap.to(this.avatar.nativeElement, {
      y: 20,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut"
    });

    // Bouncing Animation for Chevron
    gsap.to(this.scrollChevron.nativeElement, {
      y: 10,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut"
    });
  }

  private initCanvas() {
    const canvas = this.canvasRef.nativeElement;
    const context = canvas.getContext('2d');
    if (!context) return;
    this.ctx = context;
    
    this.resizeCanvas();
    this.resizeObserver = new ResizeObserver(() => this.resizeCanvas());
    const parent = canvas.parentElement;
    if (parent) {
      this.resizeObserver.observe(parent);
    }
    
    this.ngZone.runOutsideAngular(() => this.animate());
  }

  private resizeCanvas() {
    const canvas = this.canvasRef.nativeElement;
    const parent = canvas.parentElement;
    if (parent) {
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
      if (canvas.width > 0 && canvas.height > 0) {
        this.createParticles();
      }
    }
  }

  private createParticles() {
    const canvas = this.canvasRef.nativeElement;
    this.particles = [];
    for (let i = 0; i < this.particleCount; i++) {
      this.particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * this.speed,
        vy: (Math.random() - 0.5) * this.speed
      });
    }
  }

  private animate() {
    const canvas = this.canvasRef.nativeElement;
    const ctx = this.ctx;
    if (!canvas || !ctx) return;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const isDark = document.documentElement.classList.contains('dark') || 
                   window.matchMedia('(prefers-color-scheme: dark)').matches;
    const color = isDark ? '255, 255, 255' : '0, 0, 0'; 
    
    this.particles.forEach((p, i) => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, 1.2, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${color}, 0.2)`;
      ctx.fill();

      let connections = 0;
      for (let j = i + 1; j < this.particles.length; j++) {
        if (connections >= this.maxConnections) break;

        const p2 = this.particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < this.connectionDistance) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(${color}, ${(1 - dist / this.connectionDistance) * 0.15})`;
          ctx.lineWidth = 0.8;
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
          connections++;
        }
      }
    });

    this.animationId = requestAnimationFrame(() => this.animate());
  }
}