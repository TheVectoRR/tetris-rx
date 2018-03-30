import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TetrisComponentComponent } from './tetris-component.component';

describe('TetrisComponentComponent', () => {
  let component: TetrisComponentComponent;
  let fixture: ComponentFixture<TetrisComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TetrisComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TetrisComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
