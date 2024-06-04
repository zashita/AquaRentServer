import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import {MailerModule} from "@nestjs-modules/mailer";
import process from "process";
import {ConfigModule} from "@nestjs/config";

@Module({
  providers: [MailService],
  imports: [
  ],
  exports: [
      MailService
  ]
})
export class MailModule {}
