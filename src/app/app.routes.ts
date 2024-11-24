import { Routes } from '@angular/router';
import { CaptureListComponent } from './capture-list/capture-list.component';
import { CaptureDetailComponent } from './capture-detail/capture-detail.component';
import { WriteComponent } from './write/write.component';

export const routes: Routes = [
  {
    component: CaptureListComponent,
    path: 'capture',
  },
  {
    component: CaptureDetailComponent,
    path: 'capture/:letter',
  },
  {
    component: WriteComponent,
    path: 'write',
  },
  { path: '**', redirectTo: 'capture' },
];
