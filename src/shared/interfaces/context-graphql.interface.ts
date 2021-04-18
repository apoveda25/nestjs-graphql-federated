export interface IContextGraphQL {
  user: IContextUser;
}

interface IContextUser {
  _id: string;
  scopes: string[];
}
