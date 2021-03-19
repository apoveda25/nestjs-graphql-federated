import { Injectable, OnModuleInit } from '@nestjs/common';
import { aql } from 'arangojs/aql';
import { DocumentCollection } from 'arangojs/collection';
import { ArangodbService } from '../../../arangodb/arangodb.service';
import { ObjectToAQL } from '../../../arangodb/providers/object-to-aql';

@Injectable()
export class RolesRepository implements OnModuleInit {
  private repository: DocumentCollection;

  constructor(
    private readonly arangoService: ArangodbService,
    private readonly objectToAQL: ObjectToAQL,
  ) {}

  onModuleInit(): void {
    this.repository = this.arangoService.collection(
      'Roles',
    ) as DocumentCollection;
  }

  async find(_id: string): Promise<unknown> {
    const cursor = await this.arangoService.query(aql`
      FOR doc IN ${this.repository}
      FILTER doc._key == ${_id} || doc._id == ${_id}
      RETURN doc
    `);

    return await cursor.reduce((acc: any, cur: any) => cur || acc, null);
  }
}
