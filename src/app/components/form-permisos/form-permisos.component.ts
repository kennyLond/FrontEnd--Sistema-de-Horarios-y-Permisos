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
  id: number | undefined;

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
      id: [this.data?.id, Validators.required],
      tipo_permiso: [{ value: this.data?.tipo_permiso, disabled: true }, Validators.required],
      fecha_solicitud: [null, Validators.required]
    });
    dateAdapter.setLocale('es');
  }

  cancelar() {
    this.dialogRef.close(false);
  }

  addEditPermiso() {
    if (this.form.invalid) {
      return;
    }

    this._permisosService.verificarPersona(this.form.value.id).subscribe({
      next: (existe: boolean) => {
        if (!existe) {
          this.mensajeError('La persona no existe.');
          return;
        }

        this.loading = true;
        this._permisosService.crearPermiso(this.form.value).subscribe({
          next: () => {
            this.mensajeExito('Permiso solicitado');
            this.loading = false;
            this.dialogRef.close(true);
          },
          error: () => {
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
    this._snackBar.open(mensaje, 'Cerrar', { duration: 3000 });
  }

  mensajeError(mensaje: string) {
    this._snackBar.open(mensaje, 'Cerrar', { duration: 3000 });
  }
}