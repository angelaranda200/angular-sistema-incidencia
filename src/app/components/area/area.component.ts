import  Swal  from 'sweetalert2';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Area } from 'src/app/interfaces/area';
import { AreaService } from 'src/app/services/area.service';
import { AreadialogComponent } from './areadialog/areadialog.component';

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.css']
})
export class AreaComponent implements OnInit {

  displayedColumns: string[] = ['id', 'nombre', 'correo', 'descripcion','action'];
  dataSource!: MatTableDataSource<Area>;

  areas:Area[]=[];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private areaService:AreaService,
              private dialog:MatDialog) { }

  ngOnInit(): void {
    this.getAreas();
  }

  getAreas(){
    this.areaService.getAreas().subscribe(
      res=>{
        this.areas=res;
        this.dataSource = new MatTableDataSource(this.areas);
        this.dataSource.paginator = this.paginator;
      }
    )
  }

  openAreaDialog(){
    this.dialog.open(AreadialogComponent,{
      width:'30%',
      height:'80%'
    }).afterClosed().subscribe(
      val=>{
        if(val=='save'){
          Swal.fire('Area Creado',`El area fue creado con exito`,'success')
          this.getAreas();
          console.log(val);
          
        }
      }
    )
  }

  updateAreaDialog(row:Area){
    this.dialog.open(AreadialogComponent,{
      width:'30%',
      height:'80%',
      data:row
    }).afterClosed().subscribe(
      val=>{
        if(val=='update'){
          Swal.fire('Area Actualizado',`El area fue actualizado con exito`,'success')
          this.getAreas();
          console.log(val);
          
        }
      }
    )
  }

  deleteArea(id:number){
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
        this.areaService.deleteArea(id).subscribe(
          res=>{
            this.getAreas();
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
