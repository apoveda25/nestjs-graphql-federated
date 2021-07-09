export interface IEdge<T = Record<string, any>> {
  _id: string;
  _key: string;
  _from: string;
  _to: string;
  createdBy: string;
  createdAt: number;
  vertex: T;
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
