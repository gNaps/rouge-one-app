import { DestroyRef, Injectable, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';
import { ApiResponse } from '../../models/api-response.model';
import { User } from '../../models/user.model';
import { ProjectStore } from '../projects/project.store';
import { UserApiService } from './user-api.service';

@Injectable({
  providedIn: 'root',
})
export class UserStore {
  userList = signal<ApiResponse<User>>({ data: [], total: 0 });
  user = signal<User | null>(null);

  projectStore = inject(ProjectStore);
  userApi = inject(UserApiService);
  destroyRef = inject(DestroyRef);

  setPeopleList(data: ApiResponse<User>) {
    this.userList.set(data);
  }

  fetchPeople({ page, take, filter, sort }: any) {
    console.log('FETCH PEOPLE');
    console.log({ page, take, filter, sort });
    this.userApi
      .findAll({
        projectCode: this.projectStore.project()?.tenant_code ?? '',
        page,
        take,
        filter,
        sort,
      })
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        tap((data) => {
          this.setPeopleList(data);
        })
      )
      .subscribe();
  }

  // fetchProject() {
  //   this.projectApi
  //     .findOne(this.projectId())
  //     .pipe(
  //       takeUntilDestroyed(this.destroyRef),
  //       tap((project) => {
  //         this.setProject(project);
  //       })
  //     )
  //     .subscribe();
  // }

  // createProject(project: Partial<Project>) {
  //   return this.projectApi.create(project);
  // }

  // updateProject(projectId: number, project: Partial<Project>) {
  //   return this.projectApi.update(projectId, project);
  // }
}
