import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common'; 
import { ListComponent } from './components/list/list.component';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { ModalComponent } from './components/modal/modal.component';
import { MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CommonModule,
    MdbFormsModule,
    ReactiveFormsModule,
  ],
  providers: [MdbModalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
