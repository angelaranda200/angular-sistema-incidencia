import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Rol } from 'src/app/interfaces/rol';
import { RolService } from 'src/app/services/rol.service';
import { RoldialogComponent } from './roldialog/roldialog.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-rol',
  templateUrl: './rol.component.html',
  styleUrls: ['./rol.component.css']
})
export class RolComponent implements OnInit {

  displayedColumns: string[] = ['id', 'nombre','action'];
  dataSource!: MatTableDataSource<Rol>;

  roles:Rol[]=[];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private rolService:RolService,
              private dialog:MatDialog) { }

  ngOnInit(): void {
    this.getRoles();
  }

  getRoles(){
    this.rolService.getRoles().subscribe(
      res=>{
        this.roles=res
        this.dataSource = new MatTableDataSource(this.roles);
        this.dataSource.paginator = this.paginator;
      }
    )
  }

  openRolDialog(){
    this.dialog.open(RoldialogComponent,{
      width:'30%',
      height:'70%'
    }).afterClosed().subscribe(
      val=>{
        if(val=='save'){
          Swal.fire('Rol Creado',`El rol fue creado con exito`,'success')
          this.getRoles();
          console.log(val);
          
        }
      }
    )
  }

  updateRolDialog(row:Rol){
    this.dialog.open(RoldialogComponent,{
      width:'30%',
      height:'70%',
      data:row
    }).afterClosed().subscribe(
      val=>{
        if(val=='update'){
          Swal.fire('Rol Actualizado',`El rol fue actualizado con exito`,'success')
          this.getRoles();
          console.log(val);
          
        }
      }
    )
  }

  deleteRol(id:number){
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
        this.rolService.deleteRol(id).subscribe(
          res=>{
            this.getRoles();
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
