import { Injectable } from '@angular/core';
import { Contact } from './contact.model';
// import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Subject } from 'rxjs';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';

@Injectable({
   providedIn: 'root'
})
export class ContactService {
   contacts: Contact[] = [];
   contactSelectedEvent = new Subject<Contact>();
   contactListChangedEvent = new Subject<Contact[]>();

   constructor(private http: HttpClient) {
   }


   addContact(newContact: Contact) {

      if (!newContact) {
         return;
      }

      const headers = new HttpHeaders({
         'Content-Type': 'application/json'
      });
      const contact = JSON.parse(JSON.stringify(newContact));
      this.http
         .post<{ message: string, contact: Contact }>(
            'http://localhost:3000/contacts',
            contact,
            { headers: headers }
         )
         .subscribe(response => {
            this.getContacts();
            this.contactListChangedEvent.next(this.contacts);
         });

   }

   getContact(id: string): Contact {
      for (const contact of this.contacts) {
         if (contact.id == id) {
            console.log("GETTING CONCACT: " + id);
            return contact;
         }
      }
      return null;
   }

   getContacts() {
      this.http.get<{ message: string, contacts: Contact[] }>('http://localhost:3000/contacts')
         .subscribe(
            // success function
            (res) => {
               this.contacts = res.contacts.sort(function (a, b) {
                  if (a.id > b.id) {
                     return 1;
                  } else if (a.id < b.id) {
                     return -1;
                  } else {
                     return 0;
                  }
               });
               this.contactListChangedEvent.next(this.contacts.slice());
            },
            (error: any) => {
               console.log("Error at contact.service.ts line 57: " + error.toString());
               return;
            }
         )
      return;
   }


   setContacts(contacts: Contact[]) {
      this.contacts = contacts;
      this.contactListChangedEvent.next(this.contacts.slice());
   }

   updateContact(originalContact: Contact, newContact: Contact) {
      if (typeof (newContact) === undefined ||
         newContact === null ||
         typeof (originalContact) === undefined ||
         originalContact === null) {
         return;
      }

      const headers = new HttpHeaders({
         'Content-Type': 'application/json'
      });

      console.log("UPDATING CONTACT WITH ID: " + originalContact.id);

      const contact = JSON.parse(JSON.stringify(newContact));
      this.http
         .put<{ message: string, contact: Contact, id: string }>(
            'http://localhost:3000/contacts/' + originalContact.id,
            contact,
            { headers: headers }
         )
         .subscribe(response => {
            this.getContacts();
            this.contactListChangedEvent.next(this.contacts);
         });
   }

   sortAndSend() {
      this.contacts.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
      this.contactListChangedEvent.next(this.contacts.slice());
   }

   deleteContact(contact: Contact) {
      if (typeof (contact) === undefined || contact === null) {
         return;
      }

      const pos = this.contacts.indexOf(contact);
      if (pos < 0) {
         return;
      }

      this.http.delete('http://localhost:3000/contacts/' + contact.id)
         .subscribe(
            (response: Response) => {
               this.contacts.splice(pos, 1);
               this.sortAndSend();
            }
         );
   }
}