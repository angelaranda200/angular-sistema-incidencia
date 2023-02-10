import { Component, OnInit,Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EstadoTicket } from 'src/app/interfaces/estado-ticket';
import { EstadoTicketService } from 'src/app/services/estado-ticket.service';

@Component({
  selector: 'app-estadodialog',
  templateUrl: './estadodialog.component.html',
  styleUrls: ['./estadodialog.component.css']
})
export class EstadodialogComponent implements OnInit {

  accion:string='Agregar';

  estadoForm:FormGroup=this.fb.group({
    nombre:['',Validators.required],
    descripcion:['',Validators.required],
    status:['Ok',Validators.required],
    indicator:['si',Validators.required]
  })

  constructor(private fb:FormBuilder,
              private esS:EstadoTicketService,
              private dialog:MatDialogRef<EstadodialogComponent>,
              @Inject(MAT_DIALOG_DATA) public editData:EstadoTicket) { }

  ngOnInit(): void {
    if(this.editData){
      this.accion='Actualizar'
      this.estadoForm.controls['nombre'].setValue(this.editData.nombre);
      this.estadoForm.controls['descripcion'].setValue(this.editData.descripcion);
      this.estadoForm.controls['status'].setValue(this.editData.status);
      this.estadoForm.controls['indicator'].setValue(this.editData.indicator);
    }
  }

  postEstado(){
    if(!this.editData){
      if(this.estadoForm.valid){
          this.esS.postEstadoTicket(this.estadoForm.value).subscribe(
            res=>{
              this.estadoForm.reset();
              this.dialog.close('save')
            }
          )
      }
    }else{
        this.putEstado();
    }
  }

  putEstado(){
      this.esS.putEstadoTicket(this.estadoForm.value,this.editData.idEstadoTicket).subscribe(
        res=>{
          this.estadoForm.reset();
          this.dialog.close('update');
        }
      )
  }

}
