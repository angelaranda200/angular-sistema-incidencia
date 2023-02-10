import { Servicios } from './../../../interfaces/servicios';
import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiciosService } from 'src/app/services/servicios.service';

@Component({
  selector: 'app-serviciosdialog',
  templateUrl: './serviciosdialog.component.html',
  styleUrls: ['./serviciosdialog.component.css']
})
export class ServiciosdialogComponent implements OnInit {

  accion:string='Agregar';
  submitted:boolean=false
  servicioForm:FormGroup=this.fb.group({
    nombre:['',Validators.required],
    descripcion:['',Validators.required],
    status:['Ok',Validators.required],
    indicator:['si',Validators.required]
  })


  constructor(private fb:FormBuilder,
              private servicioService:ServiciosService,
              private dialog:MatDialogRef<ServiciosdialogComponent>,
              @Inject(MAT_DIALOG_DATA) public editData:Servicios) { }

  ngOnInit(): void {
    if(this.editData){
      this.accion='Actualizar'
      this.servicioForm.controls['nombre'].setValue(this.editData.nombre);
      this.servicioForm.controls['descripcion'].setValue(this.editData.descripcion);
      this.servicioForm.controls['status'].setValue(this.editData.status);
      this.servicioForm.controls['indicator'].setValue(this.editData.indicator);
    }
  }

  postServicio(){
    if(!this.editData){
      this.submitted=true
      const {valid} = this.servicioForm
      if(valid){
          this.servicioService.postServicio(this.servicioForm.value).subscribe(
            res=>{
              this.servicioForm.reset();
              this.dialog.close('save');
            }
          )
      }else{
        return
      }
    }else{
      this.putServicio();
    }
  }

  putServicio(){
      this.servicioService.putServicio(this.servicioForm.value,this.editData.idServicio).subscribe(
        res=>{
          this.servicioForm.reset();
          this.dialog.close('update');
        }
      )
  }

}
