import {Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseInterceptors} from '@nestjs/common';
import {UserService} from "./user.service";
import {UserCreationDto} from "./dto/userCreation.dto";
import {FileInterceptor} from "@nestjs/platform-express";

@Controller('users')
export class UserController {
    constructor(private userService: UserService) {
    }
    // @Post()
    // async create(@Body() dto: UserCreationDto){
    //     console.log(dto)
    //     return this.userService.createUser(dto)
    // }
    // @Post('/admin')
    // async createAdmin(@Body() dto: UserCreationDto){
    //     console.log(dto)
    //     return this.userService.createAdmin(dto)
    // }

    @Get()
    async getAll(){
        return this.userService.getAllUsers()
    }

    @Get('/notConfirmed')
    async getNotConfirmed(){
        return this.userService.getNotConfirmed()
    }

    @Put('/seller/:id')
    async makeSeller(@Param('id') id: string){
        return this.userService.setSeller(id)
    }

    @Get('/:id')
    async getUserProfile(@Param('id') id: string){
        return this.userService.getUserProfile(id);
    }

    @Put('/changePicture/:id')
    @UseInterceptors(FileInterceptor('image'))
    async changePicture(@Param('id') id: string, @UploadedFile() image){
        console.log(image)
        return await this.userService.changePicture(id, image)
    }

    @Delete('/:id')
    async deleteUserById(@Param('id') id: string){
        return this.userService.deleteUserById(id)
    }

    @Put('/setStatusWaiting/:id')
    async setUserWaitingForStatusConfirmationTrue(@Param('id') id: string){
        return this.userService.setUserWaitingForStatusConfirmationTrue(id);
    }

    @Put('/setStatusWaitingFalse/:id')
    async setUserWaitingForStatusConfirmationFalse(@Param('id') id: string){
        return this.userService.setUserWaitingForStatusConfirmationFalse(id);
    }


}
