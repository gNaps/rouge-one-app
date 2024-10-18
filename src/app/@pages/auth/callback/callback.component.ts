import { Component, Input, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../@core/services/auth.service';

@Component({
  selector: 'app-callback',
  standalone: true,
  imports: [],
  templateUrl: './callback.component.html',
  styleUrl: './callback.component.sass',
})
export class CallbackComponent {
  @Input() token: string = '';

  authService = inject(AuthService);
  router = inject(Router);

  ngOnInit() {
    const token = this.authService.decodeJwt(this.token);
    this.authService.setCurrentUser(token);
    this.router.navigate(['/']);
  }
}
