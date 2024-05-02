import { NgModule } from '@angular/core';
import { RouterModule , Routes} from "@angular/router";
import { HomeComponent } from './home/home.component';
import { ProductsRegistrationsComponent } from './home/component/body/table/products-registrations/products-registrations.component';
import { LoginComponent } from './home/component/header/login/login.component';
import { RegisterComponent } from './home/component/header/register/register.component';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard'
import { RecoverPasswordComponent } from './home/component/header/recover-password/recover-password.component';

const routes : Routes = [
    {path: '', pathMatch: 'full', redirectTo:'/home'},
    {path: 'home', component: HomeComponent},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'recover-password', component: RecoverPasswordComponent},
    {path: 'registrations', component: ProductsRegistrationsComponent},
    {path: '**', pathMatch: 'full', redirectTo:'/home'},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {}