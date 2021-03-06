import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DndModule } from 'ng2-dnd';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header.component';
import { ContactsComponent } from './contacts/contacts.component';
import { ContactListComponent } from './contacts/contact-list/contact-list.component';
import { ContactDetailComponent } from './contacts/contact-detail/contact-detail.component';
import { DocumentsComponent } from './documents/documents.component';
import { DocumentListComponent } from './documents/document-list/document-list.component';
import { DocumentItemComponent } from './documents/document-item/document-item.component';
import { DocumentDetailComponent } from './documents/document-detail/document-detail.component';
import { MessageItemComponent } from './messages/message-item/message-item.component';
import { MessageEditComponent } from './messages/message-edit/message-edit.component';
import { MessageListComponent } from './messages/message-list/message-list.component';
import { ContactItemComponent } from './contacts/contact-list/contact-item/contact-item.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { AppRoutingModule } from './app-routing.module';
import { DocumentViewComponent } from './documents/document-view/document-view.component';
import { DocumentEditComponent } from './documents/document-edit/document-edit.component';
import { WindRefService } from './wind-ref.service';
import { ContactEditComponent } from './contacts/contact-edit/contact-edit.component';
import { ContactsFilterPipe } from './contacts/contacts-filter.pipe';


@NgModule({
   declarations: [
      AppComponent,
      HeaderComponent,
      ContactsComponent,
      ContactListComponent,
      ContactDetailComponent,
      DocumentsComponent,
      DocumentListComponent,
      DocumentItemComponent,
      DocumentDetailComponent,
      MessageItemComponent,
      MessageEditComponent,
      MessageListComponent,
      ContactItemComponent,
      DropdownDirective,
      DocumentViewComponent,
      DocumentEditComponent,
      ContactEditComponent,
      ContactsFilterPipe
   ],
   imports: [
      BrowserModule, FormsModule, HttpClientModule, AppRoutingModule, DndModule.forRoot()
   ],
   providers: [],
   bootstrap: [AppComponent]
})
export class AppModule { }
