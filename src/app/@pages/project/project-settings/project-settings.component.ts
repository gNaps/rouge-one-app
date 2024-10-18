import { Component, inject } from '@angular/core';
import { take, tap } from 'rxjs';
import { ProjectFormComponent } from '../../../@components/project/project-form/project-form.component';
import { ProjectStore } from '../../../@core/services/projects/project.store';

@Component({
  selector: 'app-project-settings',
  standalone: true,
  imports: [ProjectFormComponent],
  templateUrl: './project-settings.component.html',
  styleUrl: './project-settings.component.sass',
})
export class ProjectSettingsComponent {
  projectStore = inject(ProjectStore);

  // constructor() {
  //   effect(() => {
  //     this.project = this.projectStore.project();
  //     console.log('project', this.project);
  //   });
  // }

  onSave(project: any) {
    this.projectStore
      .updateProject(this.projectStore.projectId(), project)
      .pipe(
        take(1),
        tap(() => {})
      )
      .subscribe();
  }
}
