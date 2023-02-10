import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Incidencia } from 'src/app/interfaces/incidencia';
import { PlanSla } from 'src/app/interfaces/plan-sla';
import { IncidenciaService } from 'src/app/services/incidencia.service';
import { PlanslaService } from 'src/app/services/plansla.service';

@Component({
  selector: 'app-incidenciadialog',
  templateUrl: './incidenciadialog.component.html',
  styleUrls: ['./incidenciadialog.component.css']
})
export class IncidenciadialogComponent implements OnInit {

  accion:string='Agregar';

  incidenciaForm:FormGroup=this.fb.group({
    nombre:['',Validators.required],
    descripcion:['',Validators.required],
    status:['Ok',Validators.required],
    indicator:['si',Validators.required],
    plan_sla:['',Validators.required]
  })

  planSla:PlanSla[]=[];


  constructor(private fb:FormBuilder,
              private incidenciaService:IncidenciaService,
              private planSlaService:PlanslaService,
              private dialog:MatDialogRef<IncidenciadialogComponent>,
              @Inject(MAT_DIALOG_DATA) public editData:Incidencia) { }

  ngOnInit(): void {
    if(this.editData){
      this.accion='Actualizar'
      this.incidenciaForm.controls['nombre'].setValue(this.editData.nombre);
      this.incidenciaForm.controls['descripcion'].setValue(this.editData.descripcion);
      this.incidenciaForm.controls['status'].setValue(this.editData.status);
      this.incidenciaForm.controls['indicator'].setValue(this.editData.indicator);
      this.incidenciaForm.controls['plan_sla'].setValue(this.editData.plan_sla);
    }

    this.getPlanSla();
  }

  getPlanSla(){
    this.planSlaService.getPlanSla().subscribe(
      res=>{
        this.planSla=res;
      }
    )
  }

  postIncidencia(){
    if(!this.editData){
      if(this.incidenciaForm.valid){
        this.incidenciaService.postIncidencia(this.incidenciaForm.value).subscribe(
          res=>{
            this.incidenciaForm.reset();
            this.dialog.close('save');
          }
        )
      }
    }else{
      this.putIncidencia();
    }
  }

  putIncidencia(){
    this.incidenciaService.putIncidencia(this.incidenciaForm.value,this.editData.idIncidencia).subscribe(
      res=>{
        this.incidenciaForm.reset();
        this.dialog.close('update')
      }
    )
  }

  compararArea(o1:PlanSla,o2:PlanSla):boolean{
    if(o1 === undefined && o2 === undefined){
      return true;
    }
      return o1 === null || o2 === null || o1 === undefined || o2 === undefined   ? false : o1.idPlanSla === o2.idPlanSla;
  }

}
