import { PassportModule } from "@nestjs/passport";
import { ConfigModule } from "@nestjs/config";
import { Module } from "@nestjs/common";
import { UserModule } from "./modules/users";
import { AuthModule } from "./modules/auth";
import { FileModule } from "./modules/file";
import { SelfModule } from "./modules/self";

@Module({
  imports: [
    UserModule,
    AuthModule,
    FileModule,
    PassportModule,
    SelfModule,
    ConfigModule.forRoot(),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
