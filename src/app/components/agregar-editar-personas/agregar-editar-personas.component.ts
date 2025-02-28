import { Component } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Persona } from '../../interfaces/persona';





@Component({
  selector: 'app-agregar-editar-personas',
  standalone: true, // Indica que es un componente independiente
  imports: [MatDialogModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatIconModule, MatSelectModule,MatDatepickerModule,ReactiveFormsModule],
  providers: [provideNativeDateAdapter()],
  templateUrl: './agregar-editar-personas.component.html',
  styleUrl: './agregar-editar-personas.component.css'
})
export class AgregarEditarPersonasComponent {

  tipoDocumento: string[] = ['Cedula de ciudadania', 'Pasaporte'];

  form: FormGroup;


  constructor(public dialogRef: MatDialogRef<AgregarEditarPersonasComponent>,
    private fb:FormBuilder) {
      this.form = this.fb.group({
        nombre: [''],
        apellido: [''],
        correo: [''],
        tipoDocumento: [null],
        documento: [null],
        fechaNacimiento: [null],

      })


    }

  cancelar() {
    this.dialogRef.close();
  }
addEditPersona(){
  console.log(this.form)
  /*tambien podemos hacerlo con const nombre =this.form.value.nombre; */
  const persona: Persona = {
    nombre: this.form.value.nombre,
    apellido: this.form.value.apellido,
    correo: this.form.value.apellido,
    tipoDocumento: this.form.value.tipoDocumento,
    documento: this.form.value.documento,
    fechaNacimiento: this.form.value.fechaNacimiento
  }
  console.log(persona);

}

}
