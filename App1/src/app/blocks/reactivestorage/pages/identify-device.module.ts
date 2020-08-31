import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { IdentifyDevicePage } from './identify-device.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: IdentifyDevicePage
      }
    ])
  ],
  declarations: [IdentifyDevicePage]
})
export class IdentifyDevicePageModule {}
