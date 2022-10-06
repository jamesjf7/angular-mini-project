import { RepositoryInterface } from './repository.interface';

export interface RepositoriesStateInterface {
  repositories: RepositoryInterface[];
  starredRepositories: RepositoryInterface[];
  subscribedRepositories: RepositoryInterface[];
  issues: any[];
  isLoading: boolean;
  error: string | null;
}
