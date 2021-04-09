export interface ContextGraphQL {
  _id: string;
  role: string;
}

export interface IContextGraphQL {
  user: IContextUser;
}

interface IContextUser {
  _id: string;
  roleId: string;
}
