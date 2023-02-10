import { Component, OnInit, Inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Area } from 'src/app/interfaces/area';
import { Rol } from 'src/app/interfaces/rol';
import { Servicios } from 'src/app/interfaces/servicios';
import { Usuarios } from 'src/app/interfaces/usuarios';
import { AreaService } from 'src/app/services/area.service';
import { RolService } from 'src/app/services/rol.service';
import { ServiciosService } from 'src/app/services/servicios.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-usuariosdialog',
  templateUrl: './usuariosdialog.component.html',
  styleUrls: ['./usuariosdialog.component.css']
})
export class UsuariosdialogComponent implements OnInit {

  accion:string='Agregar';
  hide = true;
  areas:Area[]=[];
  roles:Rol[]=[];
  servicios:Servicios[]=[];

  errores!: string[];
  submitted:boolean=false

  usuarioForm:FormGroup = this.fb.group({
    username:['',Validators.required],
    nombres:['',Validators.required],
    apellidos:['',Validators.required],
    password:['',Validators.required],
    email:['',[Validators.required,Validators.email]],
    telefono:['',[Validators.required,Validators.minLength(7)]],
    celular:['',[Validators.required,Validators.minLength(9)]],
    status:['Ok',Validators.required],
    fecha_creado:[''],
    indicator:['si',Validators.required],
    area:['',Validators.required],
    usuarioRoles:['',Validators.required],
    servicio:['',Validators.required]
  })

  constructor(private fb:FormBuilder,
              private areaService:AreaService,
              private rolService:RolService,
              private servicioService:ServiciosService,
              private usuarioService:UsuariosService,
              private dialog:MatDialogRef<UsuariosdialogComponent>,
              @Inject(MAT_DIALOG_DATA) public editData:Usuarios) { }

  ngOnInit(): void {
    this.getAreas();
    this.getRoles();
    this.getServicios();
    
    

    if(this.editData){
        this.accion='Actualizar';
        this.usuarioForm.controls['username'].setValue(this.editData.username);
        this.usuarioForm.controls['nombres'].setValue(this.editData.nombres);
        this.usuarioForm.controls['apellidos'].setValue(this.editData.apellidos);
        this.usuarioForm.controls['password'].setValue(this.editData.password);
        this.usuarioForm.controls['email'].setValue(this.editData.email);
        this.usuarioForm.controls['telefono'].setValue(this.editData.telefono);
        this.usuarioForm.controls['celular'].setValue(this.editData.celular);
        this.usuarioForm.controls['status'].setValue(this.editData.status);
        this.usuarioForm.controls['fecha_creado'].setValue(this.editData.fecha_creado);
        this.usuarioForm.controls['indicator'].setValue(this.editData.indicator);
        this.usuarioForm.controls['area'].setValue(this.editData.area);
        this.usuarioForm.controls['usuarioRoles'].setValue(this.editData.usuarioRoles);
        this.usuarioForm.controls['servicio'].setValue(this.editData.servicio);
    }

  }

  getAreas(){
    this.areaService.getAreas().subscribe(
      res=>{
        this.areas=res;
      },
      err=>{
        console.log(err);
        
      }
    )
  }

  getRoles(){
    this.rolService.getRoles().subscribe(
      res=>{
        this.roles=res;
      },
      err=>{
        console.log(err);
        
      }
    )
  }

  getServicios(){
    this.servicioService.getServicios().subscribe(
      res=>{
        this.servicios=res;
      },
      err=>{
        console.log(err);
        
      }
    )
  }

  postUsuario(){
    
    if(!this.editData){
      this.submitted=true
      const {valid,value} = this.usuarioForm
      if(valid){
        this.dialog.close('save');
        
          this.usuarioService.postUsuarios(this.usuarioForm.value).subscribe(
            res=>{
              console.log(res);
              alert('agregado')
              this.usuarioForm.reset();
              this.dialog.close('save');
            },
            err=>{
                this.errores = err.error.errors as string[];
                console.error('Código del error desde el backend: '+err.status);
                console.error(err.error.errors);
            }
          )
          
          
      }else {
        console.log(value);
        console.log(this.usuarioForm.invalid);
        return
      }
    }else{
      this.putUsuario();
    }
  }

  putUsuario(){
    this.usuarioService.putUsuario(this.usuarioForm.value,this.editData.idUsuario).subscribe(
      res=>{
        this.usuarioForm.reset();
        this.dialog.close('update');
      },
      err=>{
        console.log(err);
        
      }
    )
  }

  compararArea(o1:Area,o2:Area):boolean{
    if(o1 === undefined && o2 === undefined){
      return true;
    }
      return o1 === null || o2 === null || o1 === undefined || o2 === undefined   ? false : o1.idArea === o2.idArea;
  }

  compararRol(o1:Rol,o2:Rol):boolean{
    if(o1 === undefined && o2 === undefined){
      return true;
    }
      return o1 === null || o2 === null || o1 === undefined || o2 === undefined   ? false : o1.idRole === o2.idRole;
  }

  compararServicios(o1:Servicios,o2:Servicios):boolean{
    if(o1 === undefined && o2 === undefined){
      return true;
    }
      return o1 === null || o2 === null || o1 === undefined || o2 === undefined   ? false : o1.idServicio === o2.idServicio;
  }

 
  erroresDeValidacion(){
    this.errores?.length > 0 
  }
 

  
}
