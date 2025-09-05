import { Component } from '@angular/core';
import { WebSettService } from '../../../core/services/web-sett-service';
import { IWebsiteSetting } from '../../../core/model';
import { Form, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-web-sett',
  imports: [ReactiveFormsModule],
  templateUrl: './add-web-sett.html',
  styleUrl: './add-web-sett.css'
})
export class AddWebSett {

  constructor(private _webSettService:WebSettService) { }
  settings:FormGroup=new FormGroup({
    email: new FormControl(''),
    phone: new FormControl(''),
    facebook: new FormControl(''),
    instagram: new FormControl(''),
  });
 
  onSubmit() {
    const formdata = new FormData();
    formdata.append('email', this.settings.value.email);
    formdata.append('phone', this.settings.value.phone);
    formdata.append('facebook', this.settings.value.facebook);
    formdata.append('instagram', this.settings.value.instagram);
    this._webSettService.addWebsettings(this.settings.value).subscribe(res=>console.log(res));
  }

}
