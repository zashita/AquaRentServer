import {Body, Controller, Get, Post} from '@nestjs/common';
import {UserService} from "./user.service";
import {UserCreationDto} from "./dto/userCreation.dto";

@Controller('users')
export class UserController {
    constructor(private userService: UserService) {
    }
    @Post()
    async create(@Body() dto: UserCreationDto){
        console.log(dto)
        return this.userService.createUser(dto)
    }

    @Get()
    async getAll(){
        return this.userService.getAllUsers()
    }
}
