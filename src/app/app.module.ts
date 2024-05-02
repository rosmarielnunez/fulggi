// Module
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app.routing';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { HttpClient , HttpClientModule } from '@angular/common/http';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgxDropzoneModule } from 'ngx-dropzone';

// Firebase
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getAuth, provideAuth } from '@angular/fire/auth';

// Component
import { AppComponent } from './app.component';
import { HeaderComponent } from './home/component/header/header.component';
import { FooterComponent } from './home/component/footer/footer.component';
import { HomeComponent } from './home/home.component';
import { BodyComponent } from './home/component/body/body.component';
import { LoginComponent } from './home/component/header/login/login.component';
import { ProductsRegistrationsComponent } from './home/component/body/table/products-registrations/products-registrations.component';
import { RegisterComponent } from './home/component/header/register/register.component';
import { RecoverPasswordComponent } from './home/component/header/recover-password/recover-password.component';
import { SpinnerComponent } from './home/sharet/spinner/spinner.component';

//Translate
import { TranslateModule , TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

//Pipe
import { SearchPipe } from './home/pipe/search.pipe';


export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    BodyComponent,
    ProductsRegistrationsComponent,
    LoginComponent,
    RegisterComponent,
    RecoverPasswordComponent,
    SpinnerComponent,
    SearchPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
    MatCardModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatButtonModule,
    MatFormFieldModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    HttpClientModule,
    NgxDropzoneModule,
    MatMenuModule,
    MatPaginatorModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
    provideFirebaseApp(() => initializeApp({"projectId":"fulggi","appId":"1:345904769512:web:02065d40cd1f5fb26f5c5d","storageBucket":"fulggi.appspot.com","apiKey":"AIzaSyBfpTKvQp5CFFYEPIjwSqrH7Qhb_tyyn1s","authDomain":"fulggi.firebaseapp.com","messagingSenderId":"345904769512","measurementId":"G-RE7E4WKJEB"})),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth())
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

 }
