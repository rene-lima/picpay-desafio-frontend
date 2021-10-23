import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./modules/home/home.component";

const routes: Routes = [
    {
        path: 'home',
        component: HomeComponent,
        canLoad: [],
        canActivate: []
    },
    {
        path: 'login',
        loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule),
        canLoad: [],
        canActivate: []
    },    
    {
        path: 'payment',
        loadChildren: () => import('./modules/payment/payment.module').then(m => m.PaymentModule),
        canLoad: [],
        canActivate: []
    },
    { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
    exports: [RouterModule]
})

export class AppRoutingModule { }