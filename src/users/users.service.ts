import { Injectable, Logger, HttpStatus } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersDocument } from 'src/database/entities/users.entity';
import { Repository } from 'typeorm';
import { CreateUsersDto } from './dto/users.dto';
import { ResponseService } from 'src/response/response.service';

@Injectable()
export class UserService {
  constructor(
    private readonly datasource: DataSource,
    @InjectRepository(UsersDocument)
    private readonly usersRepo: Repository<UsersDocument>,
    private readonly responseService: ResponseService,
  ) {}

  private readonly logger = new Logger(UserService.name);

  async createMultipleUser(data: CreateUsersDto) {
    const queryRunner = this.datasource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      console.log(data);
      for (const query in data.cmd_chain) {
        const cmd = data.cmd_chain[query].cmd;
        await queryRunner.query(cmd);
      }

      const result = queryRunner.commitTransaction();
      return {
        status: HttpStatus.OK,
        dbState: result,
      };
    } catch (err) {
      await queryRunner.rollbackTransaction();
      return {
        status: HttpStatus.BAD_REQUEST,
        dbState: err.message,
      };
    } finally {
      await queryRunner.release();
    }
  }
}
