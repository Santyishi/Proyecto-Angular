import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TitleService {
  private titleSubject = new BehaviorSubject<string>('Inicio');
  title$ = this.titleSubject.asObservable();

  setTitle(title: string) {
    this.titleSubject.next(title);
  }
}
