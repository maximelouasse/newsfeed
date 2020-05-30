import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsSelectorComponent } from './news-selector.component';

describe('NewsSelectorComponent', () => {
  let component: NewsSelectorComponent;
  let fixture: ComponentFixture<NewsSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
