import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { EstadoTicket } from 'src/app/interfaces/estado-ticket';
import { EstadoTicketService } from 'src/app/services/estado-ticket.service';
import { EstadodialogComponent } from './estadodialog/estadodialog.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-estado-ticket',
  templateUrl: './estado-ticket.component.html',
  styleUrls: ['./estado-ticket.component.css']
})
export class EstadoTicketComponent implements OnInit {

  displayedColumns: string[] = ['id', 'nombre','descripcion','action'];
  dataSource!: MatTableDataSource<EstadoTicket>;

  estadoTickets:EstadoTicket[]=[];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private etS:EstadoTicketService,
              private dialog:MatDialog) { }

  ngOnInit(): void {
    this.getEstadoTicket();
  }

  getEstadoTicket(){
    this.etS.getEstadoTicket().subscribe(
      res=>{
        this.estadoTickets=res;
        this.dataSource = new MatTableDataSource(this.estadoTickets);
        this.dataSource.paginator = this.paginator;
      }
    )
  }

  openETDialog(){
    this.dialog.open(EstadodialogComponent,{
      width:'30%',
      height:'80%'
    }).afterClosed().subscribe(
      val=>{
        if(val=='save'){
          Swal.fire('Estado Ticket Creado',`El estado ticket fue creado con exito`,'success')
          this.getEstadoTicket();
          console.log(val);
          
        }
      }
    )
  }

  updateETDialog(row:EstadoTicket){
    this.dialog.open(EstadodialogComponent,{
      width:'30%',
      height:'80%',
      data:row
    }).afterClosed().subscribe(
      val=>{
        if(val=='update'){
          Swal.fire('Estado Ticket Actualizado',`El estado ticket fue actualizado con exito`,'success')
          this.getEstadoTicket();
          console.log(val);
          
        }
      }
    )
  }

  deleteET(id:number){
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
        this.etS.delete(id).subscribe(
          res=>{
            this.getEstadoTicket();
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
