import {Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseInterceptors} from '@nestjs/common';
import {BoatService} from "./boat.service";
import {BoatCreationDto} from "./dto/boatCreation.dto";
import {FileInterceptor} from "@nestjs/platform-express";

@Controller('boats')
export class BoatController {
    constructor(private BoatService: BoatService) {
    }

    @Post()
    @UseInterceptors(FileInterceptor('image'))
    async create(@Body() dto: BoatCreationDto,
                 @UploadedFile() image){
        return await this.BoatService.create(dto, image);
    }

    @Get()
    async getAll(){
        return await this.BoatService.getAll()
    }

    @Put('/:id')
    async increaseBoatViews(@Param('id') id: string){
        return this.BoatService.increaseViews(id);
    }

    @Get("/:id")
    async getBoatById(@Param('id') id: string){
        return await this.BoatService.getBoatById(id)
    }
    @Delete("/:id")
    async deleteById(@Param('id') id: string){
        return await this.BoatService.deleteById(id)
    }

}
