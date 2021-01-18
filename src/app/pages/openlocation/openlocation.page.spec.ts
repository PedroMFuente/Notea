import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OpenlocationPage } from './openlocation.page';

describe('OpenlocationPage', () => {
  let component: OpenlocationPage;
  let fixture: ComponentFixture<OpenlocationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenlocationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OpenlocationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
