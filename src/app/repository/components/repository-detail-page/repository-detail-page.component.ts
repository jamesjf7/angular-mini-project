import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as REPOSITORIES from '../../shared/store/reducers';
import { AppState } from 'src/app/shared/types/appState.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'repository-detail-page',
  templateUrl: 'repository-detail-page.component.html',
})
export class RepositoryDetailPageComponent implements OnInit {
  issues$: Observable<any[]>;
  isLoading$: Observable<boolean>;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>
  ) {
    this.issues$ = this.store.select(REPOSITORIES.issuesSelector);
    this.isLoading$ = this.store.select(REPOSITORIES.isLoadingSelector);
  }

  ngOnInit() {
    const { owner, repo } = this.route.snapshot.params;
    this.store.dispatch(
      REPOSITORIES.getIssues({ owner, repository_name: repo })
    );
  }
}
