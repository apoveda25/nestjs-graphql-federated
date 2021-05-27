export interface IContextGraphQL {
  user: IContextUser;
}

export interface IContextUser {
  _id: string;
  active: boolean;
  emailActive: boolean;
  role: IContextRole;
  scopes: string[];
}

interface IContextRole {
  _id: string;
  _key: string;
  level: number;
}
