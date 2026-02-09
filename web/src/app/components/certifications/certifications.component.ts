import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LinkedInService } from '../../services/linkedin.service';

@Component({
  selector: 'app-certifications',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './certifications.component.html',
  styleUrl: './certifications.component.css'
})
export class CertificationsComponent {
  public linkedinService = inject(LinkedInService);
}
