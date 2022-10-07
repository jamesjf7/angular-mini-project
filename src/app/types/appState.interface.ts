import { RepositoriesState } from '../repository/shared/types/repositoriesState.model';

export class AppStateInterface {
  repositories: RepositoriesState = {} as RepositoriesState;
}
