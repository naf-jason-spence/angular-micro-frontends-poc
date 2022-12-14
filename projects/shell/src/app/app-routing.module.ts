import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes,
} from '@angular/router';

import { loadRemoteModule } from '@angular-architects/module-federation';
import { OktaCallbackComponent } from '@okta/okta-angular';

import { environment } from '../environments/environment';
import { ProductsComponent } from './products/products.component';

const routes: Routes = [
  { path: '', component: ProductsComponent },
  { path: 'basket', loadChildren: () => loadRemoteModule({
      type: 'module',
      remoteEntry: `${environment.mfe.mfeBasket}/remoteEntry.js`,
      exposedModule: './Module'
    }).then(m => m.BasketModule)
  },
  { path: 'profile', loadChildren: () => loadRemoteModule({
      type: 'module',
      remoteEntry: `${environment.mfe.mfeProfile}/remoteEntry.js`,
      exposedModule: './Module'
    }).then(m => m.ProfileModule) },
  { path: 'login/callback', component: OktaCallbackComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
