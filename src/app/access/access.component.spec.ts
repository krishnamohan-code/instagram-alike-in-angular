import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessComponent } from './access.component';

describe('AcessoComponent', () => {
  let component: AccessComponent;
  let fixture: ComponentFixture<AccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
