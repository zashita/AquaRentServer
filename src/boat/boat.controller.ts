import {Body, Controller, Delete, Get, Param, Post, Put, Query, UploadedFile, UseInterceptors} from '@nestjs/common';
import {BoatService} from "./boat.service";
import {BoatCreationDto} from "./dto/boatCreation.dto";
import {FileInterceptor} from "@nestjs/platform-express";
import {BoatTypes, MoveType} from "./boat.model";

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

    @Get('/filter')
    async filter(
        @Query('type') type?: BoatTypes,
        @Query('lakeName') lakeName?: string,
        @Query('captain') captain?: boolean,
        @Query('moveType') moveType?: MoveType

    ){
        return await this.BoatService.filter(type, moveType, lakeName, captain)
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
