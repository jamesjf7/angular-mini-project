import { Repository } from './repository.model';

export class RepositoriesState {
  repositories: Repository[] = [];
  issues: any[] = [];
  isLoading: boolean = false;
  error: string | null = null;
}
