import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OpenlocationPageRoutingModule } from './openlocation-routing.module';

import { OpenlocationPage } from './openlocation.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OpenlocationPageRoutingModule,
    TranslateModule
  ],
  declarations: [OpenlocationPage],
  exports:[TranslateModule]
})
export class OpenlocationPageModule {}
