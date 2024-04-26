import {Body, Controller, Post} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {UserCreationDto} from "../user/dto/userCreation.dto";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {
    }

    @Post('/login')
    login(@Body() dto: UserCreationDto){
        return this.authService.login(dto)
    }

    @Post('/registration')
    registration(@Body() dto: UserCreationDto){
        return this.authService.registration(dto)
    }
}
