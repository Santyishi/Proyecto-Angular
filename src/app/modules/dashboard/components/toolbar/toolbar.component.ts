import { Component, EventEmitter, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Usuario } from '../../../../core/services/auth.service';
import { selectUser } from '../../../../state/auth/auth.selectors';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  standalone: false
})
export class ToolbarComponent {
  @Output() drawerToggle = new EventEmitter();
  user$: Observable<Usuario | null>;
  currentTitle: string = '';

  constructor(private store: Store, private router: Router, private route: ActivatedRoute) {
    this.user$ = this.store.select(selectUser);
    this.user$.subscribe(user => console.log('Toolbar user:', user));

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => {
        let child = this.route.firstChild;
        while (child?.firstChild) {
          child = child.firstChild;
        }
        return child?.snapshot.data['title'] || '';
      })
    ).subscribe(title => {
      this.currentTitle = title;
    });
  }
}
