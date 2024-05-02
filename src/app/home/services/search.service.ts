import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class SearchService {
  private searchByLetterSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor() { }

  setSearchByLetter(value: string) {
    this.searchByLetterSubject.next(value);
  }

  getSearchByLetter(): Observable<string> {
    return this.searchByLetterSubject.asObservable();
  }
}
