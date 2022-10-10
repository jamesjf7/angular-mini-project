import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RepositoryDetailPageComponent } from './repository/components/repository-detail-page/repository-detail-page.component';
import { RepositoryListComponent } from './repository/components/repository-list/repository-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'repository', pathMatch: 'full' },
  { path: 'repository', component: RepositoryListComponent },
  { path: 'repository/:owner/:repo', component: RepositoryDetailPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
