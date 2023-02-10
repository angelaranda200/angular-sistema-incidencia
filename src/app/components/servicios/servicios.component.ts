import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Servicios } from 'src/app/interfaces/servicios';
import { ServiciosService } from 'src/app/services/servicios.service';
import { ServiciosdialogComponent } from './serviciosdialog/serviciosdialog.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.css']
})
export class ServiciosComponent implements OnInit {

  displayedColumns: string[] = ['id', 'nombre','descripcion','action'];
  dataSource!: MatTableDataSource<Servicios>;

  servicios:Servicios[]=[];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private servcioService:ServiciosService,
              private dialog:MatDialog) { }

  ngOnInit(): void {
    this.getServicios();
  }



  getServicios(){
    this.servcioService.getServicios().subscribe(
      res=>{
        this.servicios=res;
        this.dataSource = new MatTableDataSource(this.servicios);
        this.dataSource.paginator = this.paginator;
      }
    )
  }

  openServiciosDialog(){
    this.dialog.open(ServiciosdialogComponent,{
      width:'30%',
      height:'80%'
    }).afterClosed().subscribe(
      val=>{
        if(val=='save'){
          Swal.fire('Servicio Creado',`El servicio fue creado con exito`,'success')
          this.getServicios();
          console.log(val);
          
        }
      }
    )
  }

  updateServiciosDialog(row:Servicios){
    this.dialog.open(ServiciosdialogComponent,{
      width:'30%',
      height:'80%',
      data:row
    }).afterClosed().subscribe(
      val=>{
        if(val=='update'){
          Swal.fire('Servicio Actualizado',`El servicio fue actualizado con exito`,'success')
          this.getServicios();
          console.log(val);
          
        }
      }
    )
  }

  deleteServicios(id:number){
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
        this.servcioService.deleteServicio(id).subscribe(
          res=>{
            this.getServicios();
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
