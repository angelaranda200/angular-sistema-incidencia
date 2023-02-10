import { Component, OnInit,ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PlanSla } from 'src/app/interfaces/plan-sla';
import { PlanslaService } from 'src/app/services/plansla.service';
import { PlandialogComponent } from './plandialog/plandialog.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-plan-sla',
  templateUrl: './plan-sla.component.html',
  styleUrls: ['./plan-sla.component.css']
})
export class PlanSlaComponent implements OnInit {

  displayedColumns: string[] = ['id', 'nombre', 'periodo','action'];
  dataSource!: MatTableDataSource<PlanSla>;
  planSla:PlanSla[]=[];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private psS:PlanslaService,
              private dialog:MatDialog) { }

  ngOnInit(): void {
    this.getPlanSla();
  }

  getPlanSla(){
    this.psS.getPlanSla().subscribe(
      res=>{
        this.planSla=res;
        this.dataSource = new MatTableDataSource(this.planSla);
        this.dataSource.paginator = this.paginator;
      }
    )
  }

  openPSDialog(){
    this.dialog.open(PlandialogComponent,{
      width:'30%',
      height:'80%'
    }).afterClosed().subscribe(
      val=>{
        if(val=='save'){
          Swal.fire('Plan Sla Creada',`El plan sla fue creado con exito`,'success')
          this.getPlanSla();
          console.log(val);
          
        }
      }
    )
  }

  updatePSDialog(row:PlanSla){
    this.dialog.open(PlandialogComponent,{
      width:'30%',
      height:'80%',
      data:row
    }).afterClosed().subscribe(
      val=>{
        if(val=='update'){
          Swal.fire('Plan Sla Creado',`El plan sla fue actualizado con exito`,'success')
          this.getPlanSla();
          console.log(val);
          
        }
      }
    )
  }

  deletePS(id:number){
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
        this.psS.deletePlanSla(id).subscribe(
          res=>{
            this.getPlanSla();
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
