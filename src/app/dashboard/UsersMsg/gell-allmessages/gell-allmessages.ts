import { Component, OnInit } from '@angular/core';
import { ContactusServices } from '../../../core/services/contactus-services';
import { Icontactus } from '../../../core/model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gell-allmessages',
  imports: [CommonModule],
  templateUrl: './gell-allmessages.html',
  styleUrl: './gell-allmessages.css'
})
export class GellAllmessages implements OnInit {
  constructor(private _contactService: ContactusServices) {}
 messages: Icontactus[] = [];
  ngOnInit(): void {
    this._contactService.getAllMessages().subscribe({
      next: (res: any) => {
        this.messages = res.contactus; 
      },
      error: (err) => {
        console.error("Failed to fetch messages", err);
      }
    });
  }
}

