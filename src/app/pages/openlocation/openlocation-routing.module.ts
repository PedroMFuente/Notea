import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OpenlocationPage } from './openlocation.page';

const routes: Routes = [
  {
    path: '',
    component: OpenlocationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OpenlocationPageRoutingModule {}
