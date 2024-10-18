import { Routes } from '@angular/router';
import { LayoutComponent } from './@components/ui/layout/layout.component';
import { AuthGuard } from './@core/guards/auth.guard';
import { AutoLoginGuard } from './@core/guards/auto-login.guard';
import { CallbackComponent } from './@pages/auth/callback/callback.component';
import { SignInComponent } from './@pages/auth/sign-in/sign-in.component';
import { SignUpComponent } from './@pages/auth/sign-up/sign-up.component';
import { DashboardComponent } from './@pages/dashboard/dashboard.component';
import { ProjectCreateComponent } from './@pages/project/project-create/project-create.component';
import { ProjectDetailComponent } from './@pages/project/project-detail/project-detail.component';
import { ProjectPeopleComponent } from './@pages/project/project-people/project-people.component';
import { ProjectPermissionsComponent } from './@pages/project/project-permissions/project-permissions.component';
import { ProjectRolesComponent } from './@pages/project/project-roles/project-roles.component';
import { ProjectSettingsComponent } from './@pages/project/project-settings/project-settings.component';

export const routes: Routes = [
  {
    path: 'auth',
    children: [
      {
        path: 'sign-up',
        component: SignUpComponent,
        canActivate: [AutoLoginGuard],
      },
      {
        path: 'sign-in',
        component: SignInComponent,
        canActivate: [AutoLoginGuard],
      },
      {
        path: 'callback',
        component: CallbackComponent,
        canActivate: [AutoLoginGuard],
      },
    ],
  },
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'create',
    component: ProjectCreateComponent,
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'projects',
        canActivate: [AuthGuard],
        children: [
          {
            path: ':id',
            component: ProjectDetailComponent,
            children: [
              {
                path: '',
                component: ProjectSettingsComponent,
                canActivate: [AuthGuard],
              },
              {
                path: 'people',
                component: ProjectPeopleComponent,
                canActivate: [AuthGuard],
              },
              {
                path: 'permissions',
                component: ProjectPermissionsComponent,
                canActivate: [AuthGuard],
              },
              {
                path: 'roles',
                component: ProjectRolesComponent,
                canActivate: [AuthGuard],
              },
            ],
          },
        ],
      },
    ],
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
