import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {RoleService} from "./role.service";
import {RoleCreationDto} from "./dto/roleCreation.dto";

@Controller('roles')
export class RoleController {
    constructor(private roleService: RoleService) {
    }

    @Post()
    create(@Body() dto: RoleCreationDto){
        return this.roleService.create(dto);
    }

    @Get('/:value')
    getRoleByValue(@Param('value') value: string){
        return this.roleService.getRoleByValue(value);
    }

    @Get()
    getAllRoles(){
        return this.roleService.getAll();
    }
}
