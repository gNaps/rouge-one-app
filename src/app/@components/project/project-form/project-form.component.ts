import { Component, EventEmitter, Output, effect, input } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AccordionModule } from 'primeng/accordion';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';

@Component({
  selector: 'app-project-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CardModule,
    ReactiveFormsModule,
    InputTextModule,
    InputTextareaModule,
    AccordionModule,
    InputSwitchModule,
    ButtonModule,
  ],
  templateUrl: './project-form.component.html',
  styleUrl: './project-form.component.sass',
})
export class ProjectFormComponent {
  project = input<any>();

  @Output() save = new EventEmitter<any>();

  projectForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
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
    redirect_url: new FormControl('', [Validators.required]),
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

  constructor() {
    effect(() => {
      this.projectForm.patchValue(this.project());
    });
  }

  onSave() {
    this.save.emit(this.projectForm.value);
  }
}
