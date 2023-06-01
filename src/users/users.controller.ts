import { Body, Controller, Post } from '@nestjs/common';
import { ResponseStatusCode } from 'src/response/response.decorator';
import { UserService } from './users.service';
import { CreateUsersDto } from './dto/users.dto';
@Controller('user/')
@ResponseStatusCode()
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Post('addMultiple')
  async createMultipleUser(@Body() payload: CreateUsersDto) {
    return this.userService.createMultipleUser(payload);
  }
}
