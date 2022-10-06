import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as RepositoriesActions from '../../store/actions';
import { AppStateInterface } from 'src/app/types/appState.interface';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { isLoadingSelector, issuesSelector } from '../../store/selectors';

@Component({
  selector: 'repository-detail',
  templateUrl: 'repository-detail.component.html',
})
export class RepositoryDetailComponent implements OnInit {
  issues$: Observable<any[]>;
  isLoading$: Observable<boolean>;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppStateInterface>
  ) {
    this.issues$ = this.store.select(issuesSelector);
    this.isLoading$ = this.store.select(isLoadingSelector);
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const { owner, repo } = params;
      this.store.dispatch(
        RepositoriesActions.getIssues({ owner, repository_name: repo })
      );
    });
  }
}
