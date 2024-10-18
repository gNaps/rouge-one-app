import { CommonModule, DatePipe } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { TableLazyLoadEvent, TableModule } from 'primeng/table';
import { RoChipComponent } from '../../../@components/shared/ro-chip/ro-chip.component';
import { ApiResponse } from '../../../@core/models/api-response.model';
import { User } from '../../../@core/models/user.model';
import { ProjectStore } from '../../../@core/services/projects/project.store';
import { UserStore } from '../../../@core/services/users/user.store';

@Component({
  selector: 'app-project-people',
  standalone: true,
  imports: [
    CardModule,
    TableModule,
    CommonModule,
    ButtonModule,
    OverlayPanelModule,
    RoChipComponent,
    DatePipe,
  ],
  templateUrl: './project-people.component.html',
  styleUrl: './project-people.component.sass',
})
export class ProjectPeopleComponent {
  userStore = inject(UserStore);
  projectStore = inject(ProjectStore);

  users = signal<ApiResponse<User>>({ data: [], total: 0 });

  page: number = 1;
  size: number = 10;
  filter: string = '';
  sort?: any;
  loading: boolean = false;

  constructor() {
    effect(() => {
      if (this.projectStore.project()) {
        this.userStore.fetchPeople({
          page: this.page,
          take: this.size,
          filter: this.filter,
          sort: this.sort,
        });
      }
    });
  }

  ngOnInit() {
    this.users = this.userStore.userList;
  }

  onChangePage(event: TableLazyLoadEvent) {
    this.page = event.first! / event.rows! || 0;

    if (event.sortField) {
      this.sort = {
        field: event.sortField,
        order: event.sortOrder || 0,
      };
    } else {
      this.sort = null;
    }

    if (this.projectStore.project()) {
      this.userStore.fetchPeople({
        page: this.page,
        take: this.size,
        filter: this.filter,
        sort: this.sort,
      });
    }
  }

  create() {}
  update(u: User) {}
  remove(u: User) {}
}
