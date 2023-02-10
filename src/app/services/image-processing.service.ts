import { FileHandle } from 'src/app/interfaces/file-handle.model';
import { Solicitud } from 'src/app/interfaces/solicitud';
import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class ImageProcessingService {

  constructor(private sanitizer:DomSanitizer) { }

  public createImage(ticket:Solicitud){
      const ticketImage:any[]=ticket.adjuntotickets

      const ticketImageToFileHandle:FileHandle[]=[]

      for(let i=0;i<ticketImage.length;i++){
          const imageFileData = ticketImage[i];
          const imageBlob = this.dataURItoBlob(imageFileData.picByte,imageFileData.type);
          const imageFile = new File([imageBlob],imageFileData.nombrefoto,{type: imageFileData.tipo});


          const finalFileHandle:FileHandle = {
            file: imageFile,
            url: this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(imageFile))
          };

          ticketImageToFileHandle.push(finalFileHandle);
      }

      ticket.adjuntotickets = ticketImageToFileHandle;
      return ticket;
  }

  public dataURItoBlob(picBytes:any,imageType:any){
    const byteString = window.atob(picBytes);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const intBArray = new Uint8Array(arrayBuffer);

    for(let i=0; i<byteString.length;i++){
        intBArray[i]=byteString.charCodeAt(i);

    }

    const blob = new Blob([intBArray],{type:imageType})
    return blob;
  }
}
