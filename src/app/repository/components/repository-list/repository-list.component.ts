import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppStateInterface } from 'src/app/types/appState.interface';
import * as RepositoriesActions from '../../store/actions';
import {
  errorSelector,
  isLoadingSelector,
  repositoriesSelector,
  starredRepositoriesSelector,
  subscribedRepositoriesSelector,
} from '../../store/selectors';
import { RepositoryInterface } from '../../types/repository.interface';

@Component({
  selector: 'repository-list',
  templateUrl: './repository-list.component.html',
})
export class RepositoryListComponent implements OnInit {
  isLoading$: Observable<boolean>;
  error$: Observable<string | null>;
  repositories$: Observable<any[]>; // RepositoryInterface
  starredRepositories$: Observable<any[]>;
  subscribedRepositories$: Observable<any[]>;

  constructor(private store: Store<AppStateInterface>) {
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.error$ = this.store.pipe(select(errorSelector));
    this.repositories$ = this.store.pipe(select(repositoriesSelector));
    this.starredRepositories$ = this.store.pipe(
      select(starredRepositoriesSelector)
    );
    this.subscribedRepositories$ = this.store.pipe(
      select(subscribedRepositoriesSelector)
    );
  }

  ngOnInit(): void {
    this.store.dispatch(RepositoriesActions.getRepositories());
  }
}
