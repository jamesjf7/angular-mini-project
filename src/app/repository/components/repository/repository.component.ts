import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as RepositoriesActions from '../../store/actions';
import { AppStateInterface } from 'src/app/types/appState.interface';
import { RepositoryInterface } from '../../types/repository.interface';

@Component({
  selector: 'repository-item',
  templateUrl: 'repository.component.html',
})
export class RepositoryComponent implements OnInit {
  @Input() repository: any;
  @Input() starredRepositories: any;
  @Input() subscribedRepositories: any;

  isStarred: boolean = false;
  isSubscribed: boolean = false;

  constructor(private store: Store<AppStateInterface>) {}

  ngOnInit() {
    this.isStarred =
      this.starredRepositories.filter(
        (repo: any) => repo.name === this.repository.name
      ).length > 0;
    this.isSubscribed =
      this.subscribedRepositories.filter(
        (repo: any) => repo.name === this.repository.name
      ).length > 0;
  }

  subscribe(owner: string, repository_name: string) {
    const isSubscribed =
      this.subscribedRepositories.filter(
        (repo: any) => repo.name === repository_name
      ).length > 0;
    this.isSubscribed = !isSubscribed;
    if (isSubscribed) {
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
    const isStarred =
      this.starredRepositories.filter(
        (repo: any) => repo.name === repository_name
      ).length > 0;
    this.isStarred = !isStarred;
    if (isStarred) {
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
