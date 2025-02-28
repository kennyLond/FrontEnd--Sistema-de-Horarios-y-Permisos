import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgregarEditarPersonasComponent } from './agregar-editar-personas.component';

describe('AgregarEditarPersonasComponent', () => {
  let component: AgregarEditarPersonasComponent;
  let fixture: ComponentFixture<AgregarEditarPersonasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregarEditarPersonasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarEditarPersonasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
