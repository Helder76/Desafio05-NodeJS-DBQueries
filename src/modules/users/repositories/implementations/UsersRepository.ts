import { getRepository, Repository } from 'typeorm';

import { IFindUserWithGamesDTO, IFindUserByFullNameDTO } from '../../dtos';
import { User } from '../../entities/User';
import { IUsersRepository } from '../IUsersRepository';

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async findUserWithGamesById({
    user_id,
  }: IFindUserWithGamesDTO): Promise<User> {
    // Complete usando ORM
    const user = await
      this
        .repository
        .findOneOrFail({
          relations: ['games'],
          where: { id: user_id }
        });
    return user;
  }

  async findAllUsersOrderedByFirstName(): Promise<User[]> {
    // Complete usando raw query
    return this
      .repository
      .query(`
        SELECT    US.* 
        FROM      users US 
        ORDER BY  US.first_name
      `);
  }

  async findUserByFullName({
    first_name,
    last_name,
  }: IFindUserByFullNameDTO): Promise<User[] | undefined> {
    // Complete usando raw query
    return this
      .repository
      .query(`
          SELECT  US.* 
          FROM    users US 
          WHERE   US.first_name ILIKE $1 
                  AND US.last_name ILIKE $2
        `
        , [first_name, last_name]);
  }
}
