import {Body, Controller, Get, Post, UploadedFile, UseInterceptors} from '@nestjs/common';
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

}
