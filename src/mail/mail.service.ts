import { Injectable } from '@nestjs/common';
import {MailerService} from "@nestjs-modules/mailer";
import process from "process";

@Injectable()
export class MailService {
    constructor(private readonly mailerService: MailerService) {
    }

    async sendMail(to: string, message: string){
        try {
            await this.mailerService.sendMail(
                {
                    from: `Сервис для аренды водного траспорта AquaRent<aquarent.bot@gmail.com>`,
                    to,
                    text: message
                }
            )
        }
        catch (e){
            console.log(e)
        }
    }
}
