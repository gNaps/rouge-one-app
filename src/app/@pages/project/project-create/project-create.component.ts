import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AccordionModule } from 'primeng/accordion';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { take, tap } from 'rxjs';
import { ProjectFormComponent } from '../../../@components/project/project-form/project-form.component';
import { TopbarComponent } from '../../../@components/ui/topbar/topbar.component';
import { ProjectStore } from '../../../@core/services/projects/project.store';

@Component({
  selector: 'app-project-create',
  standalone: true,
  imports: [
    TopbarComponent,
    CardModule,
    ReactiveFormsModule,
    InputTextModule,
    InputTextareaModule,
    AccordionModule,
    InputSwitchModule,
    ButtonModule,
    ProjectFormComponent,
  ],
  templateUrl: './project-create.component.html',
  styleUrl: './project-create.component.sass',
})
export class ProjectCreateComponent {
  projectStore = inject(ProjectStore);
  router = inject(Router);

  projectForm = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    google_client_id: new FormControl(''),
    google_secret_id: new FormControl(''),
    facebook_client_id: new FormControl(''),
    facebook_secret_id: new FormControl(''),
    twitch_client_id: new FormControl(''),
    twitch_secret_id: new FormControl(''),
    github_client_id: new FormControl(''),
    github_secret_id: new FormControl(''),
    is_google_active: new FormControl(false),
    is_facebook_active: new FormControl(false),
    is_twitch_active: new FormControl(false),
    is_password_active: new FormControl(false),
    is_magic_link_active: new FormControl(false),
    redirect_url: new FormControl(''),
  });

  get is_google_active() {
    return this.projectForm.get('is_google_active')?.value;
  }

  get is_facebook_active() {
    return this.projectForm.get('is_facebook_active')?.value;
  }

  get is_twitch_active() {
    return this.projectForm.get('is_twitch_active')?.value;
  }

  get is_password_active() {
    return this.projectForm.get('is_password_active')?.value;
  }

  get is_magic_link_active() {
    return this.projectForm.get('is_magic_link_active')?.value;
  }

  onSave(project: any) {
    this.projectStore
      .createProject(project)
      .pipe(
        take(1),
        tap(() => {
          this.router.navigate(['/']);
        })
      )
      .subscribe();
  }
}
