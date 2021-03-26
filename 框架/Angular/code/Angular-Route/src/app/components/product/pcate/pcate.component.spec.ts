import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PcateComponent } from './pcate.component';

describe('PcateComponent', () => {
  let component: PcateComponent;
  let fixture: ComponentFixture<PcateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PcateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PcateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
