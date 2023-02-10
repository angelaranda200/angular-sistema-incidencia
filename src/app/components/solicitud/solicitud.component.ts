import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Solicitud } from 'src/app/interfaces/solicitud';
import { SolicitudService } from 'src/app/services/solicitud.service';
import { SolictudformComponent } from './solictudform/solictudform.component';
import Swal from 'sweetalert2';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html',
  styleUrls: ['./solicitud.component.css']
})
export class SolicitudComponent implements OnInit {
  displayedColumns: string[] = ['id', 'fecha', 'estado', 'usuario','empresa','prioridad','action'];
  dataSource!: MatTableDataSource<Solicitud>;

  solicitudes:Solicitud[]=[];

  user:any = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private solicitudService:SolicitudService,
              private router:Router,
              public dialog:MatDialog,
              public loginService:LoginService) { }

  ngOnInit(): void {
    this.getSolictudes();
    this.user = this.loginService.getUser();
  }

  /*openSolicitudDialog(){
    this.dialog.open(SolictudformComponent,{
      width:'100%',
      height:'90&'
    }).afterClosed().subscribe(
      val=>{
        if(val=='save'){
          this.getSolictudes();
        }
      }
    )
  }*/

  /*updateSolicitudDialog(row:Solicitud){
    this.dialog.open(SolictudformComponent,{
      width:'100%',
      height:'90&',
      data:row
    }).afterClosed().subscribe(
      val=>{
        if(val=='update'){
          this.getSolictudes();
        }
      }
    )
  }*/


  getSolictudes(){
    this.solicitudService.getSolicitud().subscribe(
      res=>{
        this.solicitudes=res;
        this.dataSource = new MatTableDataSource(this.solicitudes);
        this.dataSource.paginator = this.paginator;
      }
    )
  }

  editTicket(idTicket:number){
    console.log(idTicket);
    this.router.navigateByUrl(`/dashboard/solicitud/form/${idTicket}`)
    
  }

  detailTicket(idTicket:number){
    this.router.navigateByUrl(`/dashboard/solicitud/details/${idTicket}`)
  }

  deleteTicket(idTicket:number){
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
        this.solicitudService.deleteSolicitud(idTicket).subscribe(
          res=>{
            this.getSolictudes();
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
