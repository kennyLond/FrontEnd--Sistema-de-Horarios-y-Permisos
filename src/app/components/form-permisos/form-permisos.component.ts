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
  documentName: string = '';
  operacion: string = 'Solicitar ';
  id: number | undefined;
  selectedFile: File | null = null;

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
      personaId: [this.data?.persona_id, Validators.required],
      tipoPermiso: [this.data?.tipo_permiso, Validators.required],
      descripcion: [this.data?.descripcion, Validators.required],
      estadoPermiso: ['pendiente', Validators.required], //estado siempre pendiente
      fechaSolicitud: [null, Validators.required],
      documento: [null] // no se necesita validador required, ya que se sube con un input type file, y se envia por formData
    });
    dateAdapter.setLocale('es');
  }

  ngOnInit(): void {}

  cancelar() {
    this.dialogRef.close(false);
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      this.documentName = this.selectedFile.name;
    }
  }

  subirArchivo(): void {
    console.log("Archivo seleccionado:", this.documentName);
  }

  getTipoPermisoNombre(tipoPermiso: string): string {
    switch (tipoPermiso) {
      case 'vacaciones':
        return 'Vacaciones';
      case 'enfermedad':
        return 'Enfermedad';
      case 'familiar':
        return 'Familiar';
      default:
        return tipoPermiso;
    }
  }

  addEditPermiso() {
    if (this.form.invalid) {
      return;
    }

    const formData = new FormData();
    formData.append('personaId', this.form.value.personaId);
    formData.append('tipoPermiso', this.getTipoPermisoNombre(this.form.value.tipoPermiso));
    formData.append('descripcion', this.form.value.descripcion);
    formData.append('estadoPermiso', this.form.value.estadoPermiso);
    formData.append('fechaSolicitud', this.form.value.fechaSolicitud);
    if (this.selectedFile) {
      formData.append('documento', this.selectedFile, this.selectedFile.name);
    }

    this.loading = true;

    this._permisosService.subirDocumento(formData).subscribe({
      next: (response: any) => {
        this.mensajeExito('Permiso');
        this.loading = false;
        this.dialogRef.close(true);
      },
      error: (error: any) => {
        this.mensajeError('Permiso');
        this.loading = false;
      }
    });
  }

  mensajeExito(operacion: string) {
    this._snackBar.open(`${operacion} realizado con éxito.`, 'Cerrar', {
      duration: 3000
    });
  }

  mensajeError(operacion: string) {
    this._snackBar.open(`${operacion} no pudo realizarse.`, 'Cerrar', {
      duration: 3000
    });
  }
}