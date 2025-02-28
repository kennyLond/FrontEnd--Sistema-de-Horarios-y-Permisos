import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { Component, ViewChild } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';



@NgModule({
  declarations: [],
  imports: [MatToolbarModule, MatCardModule, MatTableModule, CommonModule, MatPaginator, MatPaginatorModule,  MatSort, MatSortModule,MatFormFieldModule,MatInputModule,MatIconModule,MatTooltipModule,MatButtonModule,
    MatTableDataSource, Component, ViewChild ],
  exports:[MatToolbarModule, MatCardModule, MatTableModule, CommonModule, MatPaginator, MatPaginatorModule,  MatSort, MatSortModule,MatFormFieldModule,MatInputModule,MatIconModule,MatTooltipModule,MatButtonModule,
    MatTableDataSource, Component, ViewChild]
})
export class SharedModule { }
