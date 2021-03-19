import { Injectable, OnModuleInit } from '@nestjs/common';
import { EdgeCollection } from 'arangojs/collection';
import { ArangodbService } from '../../../arangodb/arangodb.service';
import { ObjectToAQL } from '../../../arangodb/providers/object-to-aql';
import { CreateCredentialDto } from '../dto/create-credential.dto';

@Injectable()
export class CredentialsRepository implements OnModuleInit {
  private repository: EdgeCollection;

  constructor(
    private readonly arangoService: ArangodbService,
    private readonly objectToAQL: ObjectToAQL,
  ) {}

  onModuleInit(): void {
    this.repository = this.arangoService.collection(
      'Credentials',
    ) as EdgeCollection<Credential>;
  }

  async create(createCredentialDto: CreateCredentialDto[]) {
    return await this.repository.saveAll(createCredentialDto, {
      returnNew: true,
    });
  }
}
