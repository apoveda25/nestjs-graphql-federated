export interface IEdge {
  _id: string;
  _key: string;
  _from: string;
  _to: string;
}

export interface IEdgeFilter {
  _from?: string;
  _to?: string;
}

export interface IEdgeSearchInput {
  direction: 'ANY' | 'INBOUNT' | 'OUTBOUNT';
  startVertexId: string;
  collections: string[];
}
