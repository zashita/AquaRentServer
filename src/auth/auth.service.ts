import {HttpCode, HttpException, HttpStatus, Injectable, UnauthorizedException} from '@nestjs/common';
import {UserService} from "../user/user.service";
import {UserCreationDto} from "../user/dto/userCreation.dto";
import {JwtService} from "@nestjs/jwt";
import * as bcrypt from "bcryptjs";
import {User} from "../user/user.model";

@Injectable()
export class AuthService {
    constructor(private userService: UserService,
                private jwtService: JwtService) {
    }

    async login(dto: UserCreationDto){
        const user = await this.validateUser(dto)
        return await this.generateToken(user)
    }

    async registration(dto: UserCreationDto){
        const candidate = await this.userService.getUserByEmail(dto.email);
        if(candidate){
            throw new HttpException('Пользователь с таким email уже зарегистрирован', HttpStatus.BAD_REQUEST);
        } else{
            const hashedPassword = await bcrypt.hash(dto.password, 5);
            const user = await this.userService.createUser({...dto, password: hashedPassword})
            return await this.generateToken(user)
        }
    }

    private async generateToken(user: User){
        const roleValues = user.roles?.map((role) => role.value)
        const payload = {email: user.email, id: user.id, roles: roleValues}
        return{
            token: this.jwtService.sign(payload)
        }
    }
    private async validateUser(dto: UserCreationDto){
        const user = await this.userService.getUserByEmail(dto.email);
        let passwordEquals = false
        if(user){
            passwordEquals = await bcrypt.compare(dto.password, user.password)
        }
        if(user && passwordEquals){
            return user
        }
        throw new UnauthorizedException({message: 'Неверные данные'})
    }
}
