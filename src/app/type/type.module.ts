import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TypeRoutingModule } from './type-routing.module';
import { TypeLayoutComponent } from './shared/components/type-layout/type-layout.component';


@NgModule({
  declarations: [
    TypeLayoutComponent
  ],
  imports: [
    CommonModule,
    TypeRoutingModule
  ]
})
export class TypeModule { }
