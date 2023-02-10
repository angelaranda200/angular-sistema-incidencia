import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Incidencia } from 'src/app/interfaces/incidencia';
import { IncidenciaService } from 'src/app/services/incidencia.service';
import { IncidenciadialogComponent } from './incidenciadialog/incidenciadialog.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-incidencia',
  templateUrl: './incidencia.component.html',
  styleUrls: ['./incidencia.component.css']
})
export class IncidenciaComponent implements OnInit {

  displayedColumns: string[] = ['id', 'nombre', 'descripcion','action'];
  dataSource!: MatTableDataSource<Incidencia>;

  incidencias:Incidencia[]=[];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private incidenciaService:IncidenciaService,
              private dialog:MatDialog) { }

  ngOnInit(): void {
    this.getIncidencias();
  }

  getIncidencias(){
    this.incidenciaService.getIncidencia().subscribe(
      res=>{
        this.incidencias=res;
        this.dataSource = new MatTableDataSource(this.incidencias);
        this.dataSource.paginator = this.paginator;
      }
    )
  }

  openIncidenciaDialog(){
    this.dialog.open(IncidenciadialogComponent,{
      width:'30%',
      height:'80%'
    }).afterClosed().subscribe(
      val=>{
        if(val=='save'){
          Swal.fire('Incidencia Creada',`La incidencia fue creada con exito`,'success')
          this.getIncidencias();
          console.log(val);
          
        }
      }
    )
  }

  updateIncidenciaDialog(row:Incidencia){
    this.dialog.open(IncidenciadialogComponent,{
      width:'30%',
      height:'80%',
      data:row
    }).afterClosed().subscribe(
      val=>{
        if(val=='update'){
          Swal.fire('Incidencia Actualizada',`La incidencia fue actualizada con exito`,'success')
          this.getIncidencias();
          console.log(val);
          
        }
      }
    )
  }

  deleteIncidencia(id:number){
    Swal.fire({
      title: 'Estas seguro de eliminar?',
      text: "Ya no se podra revertir la accion",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.incidenciaService.deleteIncidencia(id).subscribe(
          res=>{
            this.getIncidencias();
          }
        )
        Swal.fire(
          'Eliminado!',
          'El ticket fue eliminado.',
          'success'
        )
      }
    })
    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
