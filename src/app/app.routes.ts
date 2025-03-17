import { Routes } from '@angular/router';
import { AppComponent } from './app.component';

export const routes: Routes = [
  {
    path: 'messages',
    loadChildren: () =>
      import('../app/pages/messages/message.route').then((m) => m.default),
  },
];
