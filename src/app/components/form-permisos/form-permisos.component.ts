import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PermisosService } from '../../services/permisos.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DateAdapter, provideNativeDateAdapter } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';

@Component({
  selector: 'app-form-permisos',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatOptionModule,
  ],
  templateUrl: './form-permisos.component.html',
  styleUrls: ['./form-permisos.component.css'],
  providers: [provideNativeDateAdapter()]
})
export class FormPermisosComponent {
  form: FormGroup;
  loading: boolean = false;
  maxDate: Date;
  operacion: string = 'Solicitar';

  constructor(
    public dialogRef: MatDialogRef<FormPermisosComponent>,
    private fb: FormBuilder,
    private _permisosService: PermisosService,
    private _snackBar: MatSnackBar,
    private dateAdapter: DateAdapter<any>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.maxDate = new Date();
    this.form = this.fb.group({
      id: [null, [Validators.required, Validators.pattern('^[0-9]+$')]],
      tipo_permiso: [this.data?.tipo_permiso || '', Validators.required], // ✅ Ahora se enviará correctamente
      fecha_solicitud: [this.data?.fecha_solicitud || '', Validators.required]
    });
    
    
    dateAdapter.setLocale('es');
  }

  cancelar() {
    this.dialogRef.close(false);
  }

  addEditPermiso() {
    if (this.form.invalid) {
      this.mensajeError('Por favor, completa todos los campos correctamente.');
      return;
    }

    const id = Number(this.form.value.id);
    if (!id) {
      this.mensajeError('El ID es inválido.');
      return;
    }

    console.log("Fecha antes de enviar:", this.form.value.fecha_solicitud);
    const fechaFormateada = new Date(this.form.value.fecha_solicitud)
      .toISOString().slice(0, 10);

    // Agregar console.log para verificar el valor de tipo_permiso
    console.log('Valor de tipo_permiso:', this.data?.tipo_permiso);

    this._permisosService.verificarPersona(id).subscribe({
      next: (existe: boolean) => {
        if (!existe) {
          this.mensajeError('La persona no existe.');
          return;
        }

        const permiso = {
          persona_id: id,
          tipo_permiso: this.data?.tipo_permiso || 'pendiente', // Usar directamente this.data?.tipo_permiso
          estado_permiso: 'pendiente',
          documento: 'pendiente',
          fecha_solicitud: fechaFormateada
        };

        console.log('🚀 Datos enviados al backend:', JSON.stringify(permiso, null, 2));

        this.loading = true;
        this._permisosService.crearPermiso(permiso).subscribe({
          next: () => {
            this.mensajeExito('Permiso solicitado correctamente.');
            this.loading = false;
            this.dialogRef.close(true);
          },
          error: (err) => {
            console.error('Error en la petición:', err);
            this.loading = false;
            this.mensajeError('Error al solicitar el permiso.');
          }
        });
      },
      error: () => {
        this.mensajeError('Error al verificar la persona.');
      }
    });
  }

  mensajeExito(mensaje: string) {
    this._snackBar.open(mensaje, '', { duration: 3000 });
  }

  mensajeError(mensaje: string) {
    this._snackBar.open(mensaje, '', { duration: 3000 });
  }
}