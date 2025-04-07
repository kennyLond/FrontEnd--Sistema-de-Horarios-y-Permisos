import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateAdapter, provideNativeDateAdapter } from '@angular/material/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Persona } from '../../interfaces/persona';
import { CommonModule } from '@angular/common';
import { PersonaService } from '../../services/persona.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Dialog } from '@angular/cdk/dialog';

@Component({
    selector: 'app-agregar-editar-personas',
    standalone: true,
    imports: [MatDialogModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatIconModule, MatSelectModule, MatDatepickerModule,
        ReactiveFormsModule, CommonModule, MatProgressSpinnerModule],
    providers: [provideNativeDateAdapter()],
    templateUrl: './agregar-editar-personas.component.html',
    styleUrls: ['./agregar-editar-personas.component.css']
})
export class AgregarEditarPersonasComponent {

    tipoDocumento: string[] = ['CC', 'Pasaporte'];
    form: FormGroup;
    maxDate: Date;
    loading: boolean = false;
    operacion: string = 'Agregar ';
    id: number | undefined;

    constructor(public dialogRef: MatDialogRef<AgregarEditarPersonasComponent>,
        private fb: FormBuilder, private _personaService: PersonaService, private _snackBar: MatSnackBar, private dateAdapter: DateAdapter<any>, @Inject(MAT_DIALOG_DATA) public data: any) {
        this.maxDate = new Date();
        this.form = this.fb.group({
            nombre: ['', [Validators.required, Validators.maxLength(20)]],
            apellido: ['', Validators.required],
            correo: ['', [Validators.required, Validators.email]],
            tipoDocumento: [null, Validators.required],
            num_documento: [null, [Validators.required, Validators.pattern("^[0-9]*$")]], // Cambiado a num_documento
            fechaNacimiento: [null, Validators.required],
        });
        dateAdapter.setLocale('es');
    }

    ngOnInit(): void {
        this.id = this.data?.id;
        this.esEditar(this.id);
    }

    esEditar(id: number | undefined) {
        if (id !== undefined) {
            this.operacion = 'Editar ';
            this.getPersona(id);
        }
    }

    getPersona(id: number) {
        this._personaService.getPersona(id).subscribe(data => {
            const fechaNacimiento = new Date(data.fechaNacimiento);
            this.form.setValue({
                nombre: data.nombre,
                apellido: data.apellido,
                correo: data.correo,
                tipoDocumento: data.tipoDocumento,
                num_documento: data.num_documento, // Cambiado a num_documento
                fechaNacimiento: fechaNacimiento,
            });
        });
    }

    cancelar() {
        this.dialogRef.close(false);
    }

    addEditPersona() {
        if (this.form.invalid) {
            return;
        }

        let fechaNacimiento = this.form.value.fechaNacimiento;

        if (typeof fechaNacimiento === 'string') {
            fechaNacimiento = new Date(fechaNacimiento);
        }

        if (fechaNacimiento instanceof Date && !isNaN(fechaNacimiento.getTime())) {
            fechaNacimiento = fechaNacimiento.toISOString().slice(0, 10);
        } else {
            console.error("La fecha de nacimiento no es válida");
            return;
        }

        const persona: Persona = {
            nombre: this.form.value.nombre,
            apellido: this.form.value.apellido,
            correo: this.form.value.correo,
            tipoDocumento: this.form.value.tipoDocumento,
            num_documento: this.form.value.num_documento, // Cambiado a num_documento
            fechaNacimiento: fechaNacimiento
        };

        this.loading = true;

        if (this.id == undefined) {
            this._personaService.addPersona(persona).subscribe(() => {
                this.mensajeExito('agregada');
            });
        } else {
            this._personaService.updatePersona(this.id, persona).subscribe(data => {
                this.mensajeExito('actualizada');
            });
        }

        this.loading = false;
        this.dialogRef.close(true);
    }

    mensajeExito(operacion: string) {
        this._snackBar.open(`La persona fue ${operacion} con éxito`, '', {
            duration: 2000
        });
    }
}