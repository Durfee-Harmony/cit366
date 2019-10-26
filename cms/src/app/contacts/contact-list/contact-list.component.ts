import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
   selector: 'cms-contact-list',
   templateUrl: './contact-list.component.html',
   styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
   @Input() contact: Contact;
   contacts: Contact[] = [];
   constructor(private contactService: ContactService) { }

   ngOnInit() {
      this.contactService.contactChangedEvent
         .subscribe(
            (contacts: Contact[]) => {
               this.contacts = contacts;
            }
         );
      this.contacts = this.contactService.getContacts();
   }

   onContactSelected(contact: Contact) {
      this.contactService.contactSelectedEvent.emit(contact);
   }

}
