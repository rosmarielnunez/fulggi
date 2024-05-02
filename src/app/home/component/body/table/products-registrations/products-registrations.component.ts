import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ProductsService } from 'src/app/home/services/products.service';
import { FileCloudService } from 'src/app/home/services/file_cloud.service';

@Component({
  selector: 'app-products-registrations',
  templateUrl: './products-registrations.component.html',
  styleUrls: ['./products-registrations.component.scss'],
  providers:[FileCloudService]
})
export class ProductsRegistrationsComponent {
  formulary: FormGroup;
  imageFiles: File[] = [];
  videoFiles: File[] = [];

  constructor(private productsService: ProductsService,
              private toastr: ToastrService,
              private _fileCloudService: FileCloudService) {
        this.formulary = new FormGroup({
        productName: new FormControl('', Validators.required),
        flavor: new FormControl('', Validators.required),
        image: new FormControl(),
        video: new FormControl(),
        description: new FormControl('', Validators.required),
        price: new FormControl('', Validators.required),
        quantity: new FormControl('', Validators.required),
        type: new FormControl('', Validators.required),
        size: new FormControl('', Validators.required),
    }, {validators: this.validateForm});
  }

  async sendProduct() {
    console.log(this.formulary.value);
    const response = await this.productsService.addProduct(this.formulary.value);
    this.formulary.reset();
    console.log(response);
  }

  clearFormulary() {
    this.formulary.reset();
  }



  onSelect(event: any, type:string) {
    const files = event.addedFiles;
    if(type === 'image'){
      this.imageFiles.push(...files);
      console.log(event);
    } else if (type === 'video'){
      this.videoFiles.push(...files);
    }
  }

  onRemove(event: any, type: string) {
    console.log(event);
    if(type === 'image'){
      this.imageFiles.splice(this.imageFiles.indexOf(event), 1);
    } else if (type === 'video'){
      this.videoFiles.splice(this.videoFiles.indexOf(event), 1)
    }
  }

  onUploadImage(){
    if (this.imageFiles.length === 0){
      this.toastr.error('Por favor sube una imagen')
    }

    const data = new FormData;
    this.imageFiles.forEach(file => {
      data.append('file', file);
    });
    data.append('upload_preset', 'cloudinary_fulggi');
    data.append('cloud_name', 'dxgpyrxsc');

    this._fileCloudService.uploadImage(data).subscribe((response)=>{
      if (response){
        console.log(response)
      }
    });

  }

  onUploadVideo(){
    if (this.videoFiles.length === 0){
      this.toastr.error('Por favor subir vídeo')
    }
    const data = new FormData();
    this.videoFiles.forEach(file =>{
      data.append('file', file);
    });
    data.append('upload_preset', 'cloudinary_fulggi');
    data.append('cloud_name', 'dxgpyrxsc');
    this._fileCloudService.uploadVideo(data).subscribe((response)=>{
      if (response){
        console.log(response)
      }
    });
  }

  validateForm: ValidatorFn = (control: AbstractControl) =>{
    const productName = control.get('productName')?.value;
    const flavor = control.get('flavor')?.value;
    const description = control.get('description')?.value;
    const price = control.get('price')?.value;
    const quantity = control.get('quantity')?.value;
    const type = control.get('type')?.value;
    const size = control.get('size')?.value;

    if (productName && flavor && description && price && quantity && type && size) {
      return null; 
    } else {
      return { invalidForm: true }; 
    }
  }
}
