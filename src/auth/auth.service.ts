import { Injectable } from '@nestjs/common';
import {UserService} from "../user/user.service";
import {UserCreationDto} from "../user/dto/userCreation.dto";

@Injectable()
export class AuthService {
    constructor(private userService: UserService) {
    }

    async login(dto: UserCreationDto){

    }
}
