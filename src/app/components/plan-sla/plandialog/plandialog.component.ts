import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PlanSla } from 'src/app/interfaces/plan-sla';
import { PlanslaService } from 'src/app/services/plansla.service';

@Component({
  selector: 'app-plandialog',
  templateUrl: './plandialog.component.html',
  styleUrls: ['./plandialog.component.css']
})
export class PlandialogComponent implements OnInit {

  accion:string='Agregar';
  submitted:boolean=false

  planForm:FormGroup=this.fb.group({
    nombre:['',Validators.required],
    periodo_de_gracia:['',Validators.required],
    status:['Ok',Validators.required],
    indicator:['si',Validators.required]
  })


  constructor(private fb:FormBuilder,
              private psService:PlanslaService,
              private dialog:MatDialogRef<PlandialogComponent>,
              @Inject(MAT_DIALOG_DATA) public editData:PlanSla) { }

  ngOnInit(): void {
    if(this.editData){
      this.accion='Actualizar'
      this.planForm.controls['nombre'].setValue(this.editData.nombre);
      this.planForm.controls['periodo_de_gracia'].setValue(this.editData.periodo_de_gracia);
      this.planForm.controls['status'].setValue(this.editData.status);
      this.planForm.controls['indicator'].setValue(this.editData.indicator);
    }
  }

  postPlan(){
    if(!this.editData){
      this.submitted=true
      const {valid} = this.planForm
      if(valid){
          this.psService.postPlanSla(this.planForm.value).subscribe(
            res=>{
              this.planForm.reset();
              this.dialog.close('save');
            }
          )
      }else{
        return
      }
    }else{
      this.putPlan();
    }
  }

  putPlan(){
    this.psService.putPlanSla(this.planForm.value,this.editData.idPlanSla).subscribe(
      res=>{
        this.planForm.reset();
        this.dialog.close('update');
      }
    )
  }
}
