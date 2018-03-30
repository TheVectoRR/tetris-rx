import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TetrisCanvasComponent } from './tetris-canvas.component';

describe('TetrisComponentComponent', () => {
  let component: TetrisCanvasComponent;
  let fixture: ComponentFixture<TetrisCanvasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TetrisCanvasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TetrisCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
