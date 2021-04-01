import { Injectable } from '@nestjs/common';

@Injectable()
export class ScopesRepositoryFake {
  async getCollections(): Promise<void> {}

  async search(): Promise<void> {}

  async findAnd(): Promise<void> {}

  async findOr(): Promise<void> {}

  async create(): Promise<void> {}
}
