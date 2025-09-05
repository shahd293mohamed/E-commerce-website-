import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { ProfileService } from '../../core/services/profile-service';
import { Auth } from '../../core/services/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './profile.html',
  styleUrls: ['./profile.css']
})
export class Profile implements OnInit {
  user: any;
  orders: any[] = [];
  activeSection: string = 'orders';
  selectedRating: number = 0;

  profileForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    phone: new FormControl(''),
    address: new FormControl('')
  });

  constructor(
    private profileService: ProfileService,
    private auth: Auth
  ) {}

  ngOnInit(): void {
    const loggedUser = this.auth.islogedin();
    if (loggedUser?.id) {
      this.loadUser(loggedUser.id);
      this.loadOrders(loggedUser.id);
    }
  }

  loadUser(id: string): void {
    this.profileService.getUser(id).subscribe((res) => {
      this.user = res;
      this.profileForm.patchValue({
        name: res.name,
        email: res.email,
        phone: res.phone || '',
        address: res.address || ''
      });
    });
  }

  loadOrders(id: string): void {
    this.profileService.getUserOrders(id).subscribe((res) => {
      this.orders = res;
    });
  }

  setActiveSection(section: string): void {
    this.activeSection = section;
  }

  onSubmit(): void {
    const userId = this.auth.islogedin()?.id;
    if (!userId) return;

    this.profileService.updateUser(userId, this.profileForm.value).subscribe({
      next: (res) => {
        alert('Profile updated!');
        console.log('Updated user:', res);
      },
      error: (err) => {
        alert('Update failed');
        console.error(err);
      }
    });
  }

  setRating(rating: number): void {
    this.selectedRating = rating;
  }

  submitReview(): void {
    alert(`Thanks for rating us ${this.selectedRating} stars!`);
  }
  getImageUrl(imgPath: string): string {
  if (!imgPath) return 'assets/default.jpg';
  return 'http://localhost:3000/' + imgPath.replace(/\\/g, '/');
}
signOut() {
  this.auth.logout(); 
  alert("You have been signed out!");
}

}