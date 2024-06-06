import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {RoleService} from "./role.service";
import {RoleCreationDto} from "./dto/roleCreation.dto";

@Controller('roles')
export class RoleController {
    constructor(private roleService: RoleService) {
    }

    @Post()
    async create(@Body() dto: RoleCreationDto){
        return await this.roleService.create(dto);
    }

    @Get('/:value')
    async getRoleByValue(@Param('value') value: string){
        return await this.roleService.getRoleByValue(value);
    }

    @Get()
    async getAllRoles(){
        return await this.roleService.getAll();
    }
}
