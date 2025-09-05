// import { Component } from '@angular/core';
// import { Form, FormGroup, ReactiveFormsModule } from '@angular/forms';

// @Component({
//   selector: 'app-contactus',
//   imports: [ReactiveFormsModule],
//   templateUrl: './contactus.html',
//   styleUrl: './contactus.css'
// })
// export class Contactus {
//   contactForm: FormGroup= new FormGroup({
    
//   });


// }
import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactusServices } from '../../core/services/contactus-services';
import { IWebsiteSetting } from '../../core/model';
import { CommonModule } from '@angular/common';
import { WebSettService } from '../../core/services/web-sett-service';

@Component({
  selector: 'app-contactus',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './contactus.html',
  styleUrl: './contactus.css'
})
export class Contactus {
  websiteInfo?: IWebsiteSetting;
  isSubmitting = false;

  constructor(private _contactService: ContactusServices, private _webSettService:WebSettService) {}

  contactForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    subject: new FormControl('', Validators.required),
    message: new FormControl('', Validators.required)
  });

  // ngOnInit(): void {
  //   this.contactService.getWebsettings().subscribe(res=> this.websiteInfo = res);
  //   console.log(this.websiteInfo);
  // }

  ngOnInit(): void {
  this._webSettService.getWebsettings().subscribe(res => {
    console.log("API Response:", res);
    this.websiteInfo = res[0]; // take the first settings object
    console.log("Assigned websiteInfo:", this.websiteInfo);
  });
}


  submit(): void {
    if (this.contactForm.invalid) return;

    this.isSubmitting = true;

    // send contact form
    this._contactService.createContactus({
      category: this.contactForm.get('category')?.value,
      message: this.contactForm.get('message')?.value,
      subject: this.contactForm.get('subject')?.value
    }).subscribe({
      next: (res) => {
        alert('Message sent successfully!');
        this.contactForm.reset();
        this.isSubmitting = false;
      },
      error: (err) => {
        console.error('Error sending message:', err);
        alert('Something went wrong, please try again.');
        this.isSubmitting = false;
      }
    });
  }
}
