import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RepositoryDetailComponent } from './repository/components/repository-detail/repository-detail.component';
import { RepositoryListComponent } from './repository/components/repository-list/repository-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'repository', pathMatch: 'full' },
  { path: 'repository', component: RepositoryListComponent },
  { path: 'repository/:owner/:repo', component: RepositoryDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
