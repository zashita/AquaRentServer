import { Injectable } from '@nestjs/common';
import {InjectModel, SequelizeModule} from "@nestjs/sequelize";
import {Lake} from "./lake.model";

@Injectable()
export class LakeService {
    constructor(@InjectModel(Lake) private lakeRepository: typeof Lake) {
    }
    async getAll(){
        const lakes = this.lakeRepository.findAll({include: {all: true}});
        return lakes
    }

    async create(name: string){
        const lake = this.lakeRepository.create(name)
        return lake;
    }

    async getById(id: string){
        const lake = await this.lakeRepository.findOne({where: {id}})
        return lake;
    }

}
