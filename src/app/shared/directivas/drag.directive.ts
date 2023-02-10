import { Directive, HostBinding, HostListener, Output } from '@angular/core';
import {EventEmitter} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FileHandle } from 'src/app/interfaces/file-handle.model';
import Swal from 'sweetalert2';

@Directive({
  selector: '[appDrag]'
})
export class DragDirective {


  @Output() files: EventEmitter<FileHandle> = new EventEmitter();

  @HostBinding("style.background") private background = "#eee";

  constructor(private sanitizer:DomSanitizer) { }

  @HostListener("dragover", ["$event"])
  public onDragOver(evt:DragEvent){
    evt.preventDefault();
    evt.stopPropagation();
    this.background ="#999";

  }

  @HostListener("dragleave", ["$event"])
  public onDragLeave(evt:DragEvent){
    evt.preventDefault();
    evt.stopPropagation();
    this.background="#eee"
  }

  @HostListener("drop", ["$event"])
  public onDrop(evt:DragEvent){
    evt.preventDefault();
    evt.stopPropagation();
    this.background="#eee";

    let fileHandle:FileHandle=null;
    
    const file = evt.dataTransfer.files[0];
    const url = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file));

    // if(fileHandle?.file?.type ==".JPG"){
      
    //   fileHandle={file,url};
    //   this.files.emit(fileHandle);
    // }else{
    //   alert("No es un archivo JPG")

    // }

    var archivoInput = file
    var archivoRuta = archivoInput.type
    //var extPermitidas = /(.JPG)$/i
    var extPermitidas = "image/jpeg"
    if(archivoInput.type != extPermitidas){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Asegurate de haber seleccionado un archivo JPG!',
      })
      //alert("Asegurate de haber seleccionado un archivo JPG")
      archivoInput = null
      return false
    }else{
      fileHandle={file,url};
      this.files.emit(fileHandle);
      return true
    }

    // fileHandle={file,url};
    //   this.files.emit(fileHandle);

    console.log(fileHandle.file.type);
    

  }

}
