import { Component } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Persona } from '../../interfaces/persona';
import { CommonModule } from '@angular/common';
import { PersonaService } from '../../services/persona.service';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';





@Component({
  selector: 'app-agregar-editar-personas',
  standalone: true, // Indica que es un componente independiente
  imports: [MatDialogModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatIconModule, MatSelectModule,MatDatepickerModule,
    ReactiveFormsModule,CommonModule,MatProgressSpinnerModule],
  providers: [provideNativeDateAdapter()],
  templateUrl: './agregar-editar-personas.component.html',
  styleUrl: './agregar-editar-personas.component.css'
})
export class AgregarEditarPersonasComponent {

  tipoDocumento: string[] = ['CC', 'Pasaporte'];
  form: FormGroup;
  maxDate: Date;
  loading: boolean = false;

  constructor(public dialogRef: MatDialogRef<AgregarEditarPersonasComponent>,
    private fb:FormBuilder, private _personaService: PersonaService,  private _snackBar: MatSnackBar) {
      this.maxDate =new Date();
      this.form = this.fb.group({
        nombre: ['',[Validators.required,Validators.maxLength(20) ]],
        apellido: ['',Validators.required],
        correo: ['', [Validators.required, Validators.email]],
        tipoDocumento: [null ,Validators.required],
        documento: [null,[Validators.required,Validators.pattern("^[0-9]*$")]],
        fechaNacimiento: [null,Validators.required],

      })
    }

  cancelar() {
    this.dialogRef.close(false);
  }
addEditPersona(){

  if(this.form.invalid){
    return;
  }
  /*tambien podemos hacerlo con const nombre =this.form.value.nombre; */
  const persona: Persona = {
    nombre: this.form.value.nombre,
    apellido: this.form.value.apellido,
    correo: this.form.value.apellido,
    tipoDocumento: this.form.value.tipoDocumento,
    documento: this.form.value.documento,
    fechaNacimiento: this.form.value.fechaNacimiento.toISOString().slice(0,10)
  }

  this.loading = true;

  this._personaService.addPersona(persona).subscribe(() =>{
    this.loading = false;
    this.mensajeExito();
    this.dialogRef.close(true);
  })
}
mensajeExito() {
  this._snackBar.open('La persona fue agregada con éxito', '', {
    duration: 2000
  });
}

}
