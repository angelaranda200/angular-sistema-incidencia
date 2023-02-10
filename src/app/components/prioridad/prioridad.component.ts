import { Component, OnInit,ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Prioridad } from 'src/app/interfaces/prioridad';
import { PrioridadService } from 'src/app/services/prioridad.service';
import { PrioridaddialogComponent } from './prioridaddialog/prioridaddialog.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-prioridad',
  templateUrl: './prioridad.component.html',
  styleUrls: ['./prioridad.component.css']
})
export class PrioridadComponent implements OnInit {

  displayedColumns: string[] = ['id', 'nombre','descripcion','action'];
  dataSource!: MatTableDataSource<Prioridad>;

  prioridades:Prioridad[]=[];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private prioridadService:PrioridadService,
              private dialog:MatDialog) { }

  ngOnInit(): void {
    this.getPrioridades();
  }


  getPrioridades(){
    this.prioridadService.getPrioridad().subscribe(
      res=>{
        this.prioridades=res;
        this.dataSource = new MatTableDataSource(this.prioridades);
        this.dataSource.paginator = this.paginator;
      }
    )
  }

  openPrioridadDialog(){
    this.dialog.open(PrioridaddialogComponent,{
      width:'30%',
      height:'80%'
    }).afterClosed().subscribe(
      val=>{
        if(val=='save'){
          Swal.fire('Prioridad Creada',`La prioridad fue creada con exito`,'success')
          this.getPrioridades();
          console.log(val);
          
        }
      }
    )
  }

  updatePrioridadDialog(row:Prioridad){
    this.dialog.open(PrioridaddialogComponent,{
      width:'30%',
      height:'80%',
      data:row
    }).afterClosed().subscribe(
      val=>{
        if(val=='update'){
          Swal.fire('Prioridad Actualizada',`La prioridad fue actualizada con exito`,'success')
          this.getPrioridades();
          console.log(val);
          
        }
      }
    )
  }

  deletePrioridad(id:number){
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
        this.prioridadService.deletePrioridad(id).subscribe(
          res=>{
            this.getPrioridades();
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
