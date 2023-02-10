import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Tienda } from 'src/app/interfaces/tienda';
import { TiendaService } from 'src/app/services/tienda.service';
import { TiendadialogComponent } from './tiendadialog/tiendadialog.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.css']
})
export class TiendaComponent implements OnInit {

  displayedColumns: string[] = ['id', 'nombre','action'];
  dataSource!: MatTableDataSource<Tienda>;

  tiendas:Tienda[]=[];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private tiendaService:TiendaService,
              private dialog:MatDialog) { }

  ngOnInit(): void {
    this.getTiendas();
  }

  getTiendas(){
    this.tiendaService.getTienda().subscribe(
      res=>{
        this.tiendas=res;
        this.dataSource = new MatTableDataSource(this.tiendas);
        this.dataSource.paginator = this.paginator;
      }
    )
  }

  openTiendaDialog(){
    this.dialog.open(TiendadialogComponent,{
      width:'30%',
      height:'70%'
    }).afterClosed().subscribe(
      val=>{
        if(val=='save'){
          Swal.fire('Empresa Registrada',`La empresa fue registrada con exito`,'success')
          this.getTiendas();
          console.log(val);
          
        }
      }
    )
  }

  updateTiendaDialog(row:Tienda){
    this.dialog.open(TiendadialogComponent,{
      width:'30%',
      height:'70%',
      data:row
    }).afterClosed().subscribe(
      val=>{
        if(val=='update'){
          Swal.fire('Empresa Actualizada',`La empresa fue actualizada con exito`,'success')
          this.getTiendas();
          console.log(val);
          
        }
      }
    )
  }

  deleteTienda(id:number){
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
        this.tiendaService.deleteTienda(id).subscribe(
          res=>{
            this.getTiendas();
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
