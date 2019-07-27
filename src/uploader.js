import { upload, download } from './service';

export default class Uploader {
  constructor() {
    this.imageButton = document.getElementById('chooseImgButton');
    this.imageButton.addEventListener('change', this._uploadData);
  }

  /*

    1. Gunakan tombol #chooseImgButton untuk memilih file gambar untuk diupload
    2. Tampilkan gambar sebagai background elemen #preview
    3. Gunakan service.upload() untuk upload gambar dalam bentuk file JSON. 
       Server akan memberi respon dalam bentuk JSON juga. Di dalamnya ada info tentang ID JSON yang diupload.
    4. Gunakan service.download() untuk mendownload JSON dari URL di atas. 
       Silakan baca dokumentasi di https://jsonbin.io/api-reference/bins/read. 
    5. Tampilkan file base64 yang ada di dalam file JSON di atas sebagai background elemen #uploaded-image

    Contoh hasil akhir: https://www.dropbox.com/s/gypiplh5utq62re/img-uploader.mp4?dl=0
    
    Catatan: Anda hanya perlu mengedit file ini saja.
  */
  _uploadData = e => {
    const fileUpload = URL.createObjectURL(e.target.files[0]);
    console.log(fileUpload);
    this.elementPreview = document.getElementById('preview');
    this.elementPreview.style.background = `url(${fileUpload})`;
    this.elementPreview.style.backgroundPosition = 'center';
    this.elementPreview.style.backgroundRepeat = 'no-repeat';

    upload(fileUpload)
      .then(response => {
        this._displayData(response.data.id);
      })
      .catch(err => {
        console.log(err);
      });
  };

  _displayData = id => {
    this.displayUploaded = document.getElementById('uploaded-image');
    download(id)
      .then(response => {
        this.displayUploaded.style.background = `url(${response.data.img})`;
        this.displayUploaded.style.backgroundPosition = 'center';
        this.displayUploaded.style.backgroundRepeat = 'no-repeat';
      })
      .catch(err => {
        console.log(err);
      });
  };
}
