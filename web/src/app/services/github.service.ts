import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GithubProject } from '../models/project.model';
import { catchError, map, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GithubService {
  private http = inject(HttpClient);
  private readonly username = 'tomMisson';
  private readonly apiUrl = `https://api.github.com/users/${this.username}/repos`;

  // Signal to hold the projects
  projects = signal<GithubProject[]>([]);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);

  constructor() {
    this.fetchProjects();
  }

  fetchProjects() {
    this.loading.set(true);
    this.http.get<GithubProject[]>(this.apiUrl, {
      params: {
        sort: 'updated',
        per_page: '10'
      }
    }).pipe(
      // We can filter for specific topics or starred status here if needed
      tap(repos => {
        this.projects.set(repos.slice(0, 6)); // Limit to 6 projects for display
        this.loading.set(false);
      }),
      catchError(err => {
        this.error.set('Failed to fetch projects from GitHub');
        this.loading.set(false);
        return of([]);
      })
    ).subscribe();
  }
}
