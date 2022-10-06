import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { RepositoryListComponent } from './components/repository-list/repository-list.component';
import { RepositoryComponent } from './components/repository/repository.component';
import { RepositoryService } from '../services/repository.service';
import { RepositoriesEffects } from './store/effects';
import { reducers } from './store/reducers';
import { RepositoryDetailComponent } from './components/repository-detail/repository-detail.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    StoreModule.forFeature('repositories', reducers),
    EffectsModule.forFeature([RepositoriesEffects]),
  ],
  providers: [RepositoryService],
  declarations: [
    RepositoryListComponent,
    RepositoryDetailComponent,
    RepositoryComponent,
  ],
  exports: [
    RepositoryListComponent,
    RepositoryDetailComponent,
    RepositoryComponent,
  ],
})
export class RepositoryModule {}
