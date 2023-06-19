import { Component } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-qrgenerate',
  templateUrl: './qrgenerate.component.html',
  styleUrls: ['./qrgenerate.component.css']
})
export class QrgenerateComponent {
  qrcode: string = "";

  async ngOnInit(){    
    try {
    const response = await this.qrcode12();
    console.log(response)
    this.qrcode = response.data.qrCodeUrl
  } catch (error) {
    console.error(error);
  }

  }

  async generateQRCode(): Promise<void> {

    try {
      const response = await this.qrcode12();
      console.log(response)
      this.qrcode = response.data.qrCodeUrl
    } catch (error) {
      console.error(error);
    }
    
  }

  async qrcode12() {
    const apiUrl = `https://finalgina.fly.dev/api/generar-codigo-qr`;
    return axios.get<{ qrCodeUrl: string }>(apiUrl);
  }
}
