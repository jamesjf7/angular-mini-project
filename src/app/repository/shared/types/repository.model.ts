export class Repository {
  id: number = 0;
  stargazersCount: number = 0;
  name: string = '';
  description: string = '';
  isSubscribed: boolean = false;
  isStarred: boolean = false;
  owner: User = {
    login: '',
  };
}

export class User {
  login: string = '';
}
