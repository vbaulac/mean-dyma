import { NgModule } from '@angular/core';
import { MatToolbarModule, 
  MatButtonModule, 
  MatInputModule,
  MatFormFieldModule,
  MatCardModule,
  MatIconModule} from '@angular/material';

  const MODULES = [
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule
  ]

@NgModule({
  declarations: [],
  imports: MODULES,
  exports: MODULES
})
export class MaterialModule { }
