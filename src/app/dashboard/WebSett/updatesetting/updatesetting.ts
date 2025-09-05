import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { WebSettService } from '../../../core/services/web-sett-service';
import { IWebsiteSetting } from '../../../core/model';

@Component({
  selector: 'app-updatesetting',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './updatesetting.html',
  styleUrl: './updatesetting.css'
})
export class Updatesetting implements OnInit {
  setting!:IWebsiteSetting
  myForm: FormGroup = new FormGroup({
    email: new FormControl(''),
    phone: new FormControl(''),
    facebook: new FormControl(''),
    instagram: new FormControl('')
  });

  constructor(private _webService: WebSettService) {}

  ngOnInit(): void {
    this._webService.getWebsettings().subscribe(res => {
      const s = res[0];
      this.setting = s;
      this.myForm.patchValue({
        email: s.email,
        phone: s.phone,
        facebook: s.facebook,
        instagram: s.instagram
      });
    });
    console.log("Form values before submit:", this.myForm.value);
  }
  

  onSubmit() {
    const formData = new FormData();

    formData.append('email', this.myForm.value.email);
    formData.append('phone', this.myForm.value.phone);
    formData.append('facebook', this.myForm.value.facebook);
    formData.append('instagram', this.myForm.value.instagram);
      this._webService.updateWebsettings(this.setting._id ,this.myForm.value).subscribe({
      next: (res) => {
        alert('Website settings updated!');
        console.log(res, this.setting._id);
      },
      error: (err) => {
        alert('Update failed');
        console.error(err);
      }
    });
};
  
}
