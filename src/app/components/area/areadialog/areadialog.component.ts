import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Area } from 'src/app/interfaces/area';
import { AreaService } from 'src/app/services/area.service';

@Component({
  selector: 'app-areadialog',
  templateUrl: './areadialog.component.html',
  styleUrls: ['./areadialog.component.css']
})
export class AreadialogComponent implements OnInit {

  accion:string='Agregar';
  submitted:boolean=false


  areaForm:FormGroup=this.fb.group({
    nombre:['',Validators.required],
    descripcion:['',Validators.required],
    email:['',[Validators.required,Validators.email]],
    status:['Ok',Validators.required],
    indicator:['si',Validators.required]
  })

  constructor(private fb:FormBuilder,
              private areaService:AreaService,
              private dialog:MatDialogRef<AreadialogComponent>,
              @Inject(MAT_DIALOG_DATA) public editData:Area) { }

  ngOnInit(): void {
    if(this.editData){
      this.accion='Actualizar'
      this.areaForm.controls['nombre'].setValue(this.editData.nombre);
      this.areaForm.controls['descripcion'].setValue(this.editData.descripcion);
      this.areaForm.controls['email'].setValue(this.editData.email);
      this.areaForm.controls['status'].setValue(this.editData.status);
      this.areaForm.controls['indicator'].setValue(this.editData.indicator);
    }
  }

  postArea(){
    if(!this.editData){
      this.submitted=true
      const {valid}=this.areaForm
      if(valid){
          this.areaService.postArea(this.areaForm.value).subscribe(
            res=>{
              this.areaForm.reset();
              this.dialog.close('save');
            }
          )
      }else{
        console.log(this.areaForm);
        
        return 
      }
    }else{
      this.putArea();
    }
  }

  putArea(){
    this.areaService.putArea(this.areaForm.value,this.editData.idArea).subscribe(
      res=>{
        this.areaForm.reset();
        this.dialog.close('update')
      }
    )
  }

}
