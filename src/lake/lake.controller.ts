import {Body, Controller, Get, Post} from '@nestjs/common';
import {LakeService} from "./lake.service";

@Controller('lakes')
export class LakeController {
    constructor(private lakeService: LakeService) {

    }

    @Get()
    async getAll(){
        return this.lakeService.getAll()
    }

    @Post()
    async create(@Body() name: string){
        return this.lakeService.create(name)
    }

}
