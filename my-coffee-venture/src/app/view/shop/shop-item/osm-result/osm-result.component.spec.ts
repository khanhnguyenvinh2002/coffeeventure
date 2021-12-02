import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OsmResultComponent } from './osm-result.component';

describe('OsmResultComponent', () => {
  let component: OsmResultComponent;
  let fixture: ComponentFixture<OsmResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OsmResultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OsmResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
