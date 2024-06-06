import {Body, Controller, Post} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {UserCreationDto} from "../user/dto/userCreation.dto";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {
    }

    @Post('/login')
    async login(@Body() dto: UserCreationDto){
        return await this.authService.login(dto)
    }

    @Post('/registration')
    async registration(@Body() dto: UserCreationDto){
        return await this.authService.registration(dto)
    }

    @Post('/registration/admin')
    async registrationAdmin(@Body() dto: UserCreationDto){
        return await this.authService.registrationAdmin(dto)
    }
}
