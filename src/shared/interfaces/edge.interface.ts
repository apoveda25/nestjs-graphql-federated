export interface IEdge {
  _id: string;
  _key: string;
  _from: string;
  _to: string;
  createdBy: string;
  createdAt: number;
}

export interface IEdgeFilter {
  _id?: string;
  _key?: string;
  _from?: string;
  _to?: string;
  createdBy?: string;
}

export interface IEdgeSearchInput {
  collections: string[];
  direction: 'OUTBOUND' | 'INBOUND' | 'ANY';
  startVertexId: string;
}
