import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, of, tap, forkJoin } from 'rxjs';
import { Experience, Certification } from '../models/linkedin.model';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LinkedInService {
  private http = inject(HttpClient);
  private translate = inject(TranslateService);
  
  experience = signal<Experience[]>([]);
  certifications = signal<Certification[]>([]);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);

  constructor() {
    this.fetchData();
  }

  fetchData() {
    this.loading.set(true);
    
    forkJoin({
      exp: this.http.get<Experience[]>('/experience.json'),
      certs: this.http.get<Certification[]>('/certs.json')
    }).pipe(
      tap(({ exp, certs }) => {
        this.experience.set(exp);
        this.certifications.set(certs);
        this.loading.set(false);
      }),
      catchError(err => {
        this.error.set('Failed to load portfolio data');
        this.loading.set(false);
        return of({ exp: [], certs: [] });
      })
    ).subscribe();
  }

  get skills() {
    const skills = new Array<string>();
    
    this.translate.get('TIMELINE.SKILLS.LIST').subscribe((res: string[]) => {
      skills.push(...res);
    });

    return skills;
  }
}
