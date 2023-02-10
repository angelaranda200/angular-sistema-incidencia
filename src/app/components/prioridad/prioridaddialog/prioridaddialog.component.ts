import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Prioridad } from 'src/app/interfaces/prioridad';
import { PrioridadService } from 'src/app/services/prioridad.service';

@Component({
  selector: 'app-prioridaddialog',
  templateUrl: './prioridaddialog.component.html',
  styleUrls: ['./prioridaddialog.component.css']
})
export class PrioridaddialogComponent implements OnInit {
  accion:string='Agregar';

  prioridadForm:FormGroup=this.fb.group({
    nombre:['',Validators.required],
    descripcion:['',Validators.required],
    status:['Ok',Validators.required],
    indicator:['si',Validators.required]
  })


  constructor(private fb:FormBuilder,
              private prioridadService:PrioridadService,
              private dialog:MatDialogRef<PrioridaddialogComponent>,
              @Inject(MAT_DIALOG_DATA) public editData:Prioridad) { }

  ngOnInit(): void {

    if(this.editData){
      this.accion='Actualizar'
      this.prioridadForm.controls['nombre'].setValue(this.editData.nombre);
      this.prioridadForm.controls['descripcion'].setValue(this.editData.descripcion);
      this.prioridadForm.controls['status'].setValue(this.editData.status);
      this.prioridadForm.controls['indicator'].setValue(this.editData.indicator);
    }
  }

  postPrioridad(){
    if(!this.editData){
      if(this.prioridadForm.valid){
          this.prioridadService.postPrioridad(this.prioridadForm.value).subscribe(
            res=>{
              this.prioridadForm.reset();
              this.dialog.close('save');
            }
          )
      }
    }else{
      this.putPrioridad();
    }
  }

  putPrioridad(){
    this.prioridadService.putPrioridad(this.prioridadForm.value,this.editData.idPrioridad).subscribe(
      res=>{
        this.prioridadForm.reset();
        this.dialog.close('update');
      }
    )
  }
  

}
