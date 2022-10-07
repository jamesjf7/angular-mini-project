import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as RepositoriesActions from '../../store/actions';
import { AppStateInterface } from 'src/app/types/appState.interface';
import { RepositoryInterface } from '../../types/repository.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'repository-item',
  templateUrl: 'repository-item.component.html',
})
export class RepositoryItemComponent implements OnInit {
  @Input() repository: any;

  constructor(private store: Store<AppStateInterface>) {}

  ngOnInit() {}

  subscribe(owner: string, repository_name: string) {
    if (this.repository.is_subscribed) {
      this.store.dispatch(
        RepositoriesActions.unsubscribeRepository({
          owner,
          repository_name,
        })
      );
    } else {
      this.store.dispatch(
        RepositoriesActions.subscribeRepository({
          owner,
          repository_name,
        })
      );
    }
  }

  star(owner: string, repository_name: string) {
    if (this.repository.is_starred) {
      this.store.dispatch(
        RepositoriesActions.unstarRepository({ owner, repository_name })
      );
    } else {
      this.store.dispatch(
        RepositoriesActions.starRepository({ owner, repository_name })
      );
    }
  }
}
