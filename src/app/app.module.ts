import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './pages/main/main.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AboutComponent } from './pages/about/about.component';
import { TypeItemComponent } from './type/pages/type-item/type-item.component';
import { TypeListComponent } from './type/pages/type-list/type-list.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    HeaderComponent,
    AboutComponent,
    TypeItemComponent,
    TypeListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
