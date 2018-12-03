import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule, 
         MatButtonModule, 
         MatInputModule,
         MatFormFieldModule,
         MatCardModule} from '@angular/material';

const MODULES = [
  FlexLayoutModule,
  MatButtonModule,
  MatInputModule,
  MatFormFieldModule,
  MatCardModule,
  MatToolbarModule
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ...MODULES
  ],
  exports: MODULES
})
export class LayoutModule { }
