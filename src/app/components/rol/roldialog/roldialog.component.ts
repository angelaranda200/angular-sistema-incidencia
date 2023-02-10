import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Rol } from 'src/app/interfaces/rol';
import { RolService } from 'src/app/services/rol.service';

@Component({
  selector: 'app-roldialog',
  templateUrl: './roldialog.component.html',
  styleUrls: ['./roldialog.component.css']
})
export class RoldialogComponent implements OnInit {

  accion:string='Agregar';

  rolForm:FormGroup=this.fb.group({
    nombreRole:[''.toUpperCase(),Validators.required],
    
  })


  constructor(private fb:FormBuilder,
              private rolService:RolService,
              private dialog:MatDialogRef<RoldialogComponent>,
              @Inject(MAT_DIALOG_DATA) public editData:Rol) { }

  ngOnInit(): void {
    if(this.editData){
      this.accion='Actualizar'
      this.rolForm.controls['nombreRole'].setValue(this.editData.nombreRole);
    }
  }

  postRol(){
    if(!this.editData){
      if(this.rolForm.valid){
          this.rolService.postRol(this.rolForm.value).subscribe(
            res=>{
              this.rolForm.reset();
              this.dialog.close('save');
            }
          )
      }
    }else{
      this.putRol();
    }
  }

  putRol(){
    this.rolService.putRol(this.rolForm.value,this.editData.idRole).subscribe(
      res=>{
        this.rolForm.reset();
        this.dialog.close('update');
      }
    )
  }

}
