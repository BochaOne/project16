import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TypeItemComponent } from './pages/type-item/type-item.component';
import { TypeListComponent } from './pages/type-list/type-list.component';
import { TypeLayoutComponent } from './shared/components/type-layout/type-layout.component';

const routes: Routes = [
  {
    path:'',
    component: TypeLayoutComponent,
    children: [
      {
        path:'', 
        component: TypeListComponent,
      },
      {
        path:'item/:id', 
        component: TypeItemComponent,
      },
      {
        path:'item', 
        component: TypeItemComponent,
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TypeRoutingModule { }
