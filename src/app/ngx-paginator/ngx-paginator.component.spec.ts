import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxPaginator } from './ngx-paginator.component';

describe('NgxPaginatorComponent', () => {
  let component: NgxPaginator;
  let fixture: ComponentFixture<NgxPaginator>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxPaginator ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxPaginator);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
