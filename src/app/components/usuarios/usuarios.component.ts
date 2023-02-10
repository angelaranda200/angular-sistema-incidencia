import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Usuarios } from 'src/app/interfaces/usuarios';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { UsuariosdialogComponent } from './usuariosdialog/usuariosdialog.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nombre', 'apellido', 'celular','usuario','action'];
  dataSource!: MatTableDataSource<Usuarios>;

  usuarios:Usuarios[]=[];
  

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private usuarioService:UsuariosService,
              public dialog:MatDialog) { }

  ngOnInit(): void {
    this.getUsuarios();
    
  }

  openUsuarioDialog(){
    this.dialog.open(UsuariosdialogComponent,{
      width:'50%',
      height:'95%'
    }).afterClosed().subscribe(
      val=>{
        if(val=='save'){
          Swal.fire('Usuario Registrado',`El usuario fue registrado con exito`,'success')
          this.getUsuarios();
          console.log(val);
          
        }
      }
    )
  }

  updateUsuarioDialog(row:Usuarios){
    this.dialog.open(UsuariosdialogComponent,{
      width:'50%',
      height:'80%',
      data:row
    }).afterClosed().subscribe(
      val=>{
        if(val=='update'){
          Swal.fire('Usuario Actualizado',`El usuario fue actualizado con exito`,'success')
          this.getUsuarios();
          console.log(val);
          
        }
      }
    )
  }

  deleteUsuarios(id:number){
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
        this.usuarioService.deleteUsuario(id).subscribe(
          res=>{
            this.getUsuarios();
    
          },err=>{
            console.log(err);
            
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

  getUsuarios(){
    this.usuarioService.getUsuarios().subscribe(
      res=>{
        this.usuarios=res;
        this.dataSource = new MatTableDataSource(this.usuarios);
        this.dataSource.paginator = this.paginator;
        console.log(res);
        
      },
      err=>{
        console.log(err);
        
      }
    )
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
