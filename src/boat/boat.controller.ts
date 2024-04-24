import {Body, Controller, Get, Post} from '@nestjs/common';
import {BoatService} from "./boat.service";
import {BoatCreationDto} from "./dto/boatCreation.dto";

@Controller('boats')
export class BoatController {
    constructor(private BoatService: BoatService) {
    }

    @Post()
    async create(@Body() dto: BoatCreationDto){
        return await this.BoatService.create(dto);
    }

    @Get()
    async getAll(){
        return await this.BoatService.getAll()
    }

}
