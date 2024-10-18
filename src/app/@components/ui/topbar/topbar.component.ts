import { CommonModule } from '@angular/common';
import { Component, Input, effect, inject, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { MenuModule } from 'primeng/menu';
import { SidebarModule } from 'primeng/sidebar';
import { AuthService } from '../../../@core/services/auth.service';
import { ProjectStore } from '../../../@core/services/projects/project.store';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [
    CommonModule,
    SidebarModule,
    SidebarComponent,
    DropdownModule,
    MenuModule,
    ReactiveFormsModule,
    ButtonModule,
  ],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.sass',
})
export class TopbarComponent {
  @Input() showDropDownProjects = true;

  sidebarVisible = false;
  selectedProject = new FormControl<any>(null);
  user: any;
  projects = signal<any[]>([]);

  authService = inject(AuthService);
  router = inject(Router);
  projectStore = inject(ProjectStore);

  items: MenuItem[] = [
    {
      label: 'account',
    },
    {
      label: 'logout',
    },
  ];

  constructor() {
    effect(
      () => {
        this.selectedProject.setValue(
          this.projects().find(
            (p) => Number(this.projectStore.projectId()) === p.id
          ),
          { emitEvent: false }
        );
      },
      { allowSignalWrites: true }
    );
  }

  ngOnInit() {
    this.user = this.authService.currentUser();
    this.projects = this.projectStore.projectList;

    if (!this.projects.length && this.showDropDownProjects) {
      this.projectStore.fetchProjects();
    }

    this.selectedProject.valueChanges.subscribe((project) => {
      window.location.href = `/projects/${project.id}`;
    });
  }

  onSignout() {
    this.authService.signOut();
    this.router.navigate(['/auth', '/sign-in']);
  }

  onCreateProject() {
    this.router.navigate(['/create']);
  }

  onClose() {
    this.sidebarVisible = false;
  }
}
