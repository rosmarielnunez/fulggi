import { Component, inject } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'fulggi';
  firestore: Firestore = inject(Firestore);
  items$: Observable<any[]>;

  constructor(private translate: TranslateService) {
    translate.setDefaultLang('en');
    translate.use('es');
    const aCollection = collection(this.firestore, 'items')
    this.items$ = collectionData(aCollection);
  }
}