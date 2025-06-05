import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { TitleService } from '../app/core/services/title.services'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone:false 
})
export class AppComponent {
  constructor(private router: Router, private titleService: TitleService) {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => {
          let route = this.router.routerState.root;
          while (route.firstChild) route = route.firstChild;
          return route.snapshot.data['title'] || 'Sin título';
        })
      )
      .subscribe(title => this.titleService.setTitle(title));
  }
}
