import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileCloudService {

  constructor(private _http: HttpClient) { 

  }

  /**
   * Up Load image or vídeo / subir imagen y vídeo a Cloudinary
   */
  uploadImage(vals:any): Observable<any>{
      let data = vals;

      return this._http.post('https://api.cloudinary.com/v1_1/dxgpyrxsc/image/upload', data);

  }
  uploadVideo(vals:any): Observable<any>{
    let data = vals;

    return this._http.post('https://api.cloudinary.com/v1_1/dxgpyrxsc/video/upload', data);
  }

  /**
   * Download image or vídeo / obtener id y url de imagen o vídeo
   */
  downloadImage(){}
  downloadVideo(){}
}
