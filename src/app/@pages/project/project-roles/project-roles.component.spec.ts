import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectRolesComponent } from './project-roles.component';

describe('ProjectRolesComponent', () => {
  let component: ProjectRolesComponent;
  let fixture: ComponentFixture<ProjectRolesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectRolesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProjectRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
