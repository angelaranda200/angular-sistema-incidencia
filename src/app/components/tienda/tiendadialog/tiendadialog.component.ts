import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Tienda } from 'src/app/interfaces/tienda';
import { TiendaService } from 'src/app/services/tienda.service';

@Component({
  selector: 'app-tiendadialog',
  templateUrl: './tiendadialog.component.html',
  styleUrls: ['./tiendadialog.component.css']
})
export class TiendadialogComponent implements OnInit {

  accion:string='Agregar';

  tiendaForm:FormGroup=this.fb.group({
    nombre_tienda:['',Validators.required],
    status:['Ok',Validators.required],
    indicator:['si',Validators.required]
  })

  constructor(private fb:FormBuilder,
              private tiendaService:TiendaService,
              private dialog:MatDialogRef<TiendadialogComponent>,
              @Inject(MAT_DIALOG_DATA) public editData:Tienda) { }

  ngOnInit(): void {
    if(this.editData){
      this.accion='Actualizar'
      this.tiendaForm.controls['nombre_tienda'].setValue(this.editData.nombre_tienda);
      this.tiendaForm.controls['status'].setValue(this.editData.status);
      this.tiendaForm.controls['indicator'].setValue(this.editData.indicator);
    }
  }
  postTienda(){
    if(!this.editData){
      if(this.tiendaForm.valid){
          this.tiendaService.postTienda(this.tiendaForm.value).subscribe(
            res=>{
              this.tiendaForm.reset();
              this.dialog.close('save');
            }
          )
      }
    }else{
      this.putTienda();
    }
  }

  putTienda(){
    this.tiendaService.putTienda(this.tiendaForm.value,this.editData.idTienda).subscribe(
      res=>{
        this.tiendaForm.reset();
        this.dialog.close('update');
      }
    )
  }

}
