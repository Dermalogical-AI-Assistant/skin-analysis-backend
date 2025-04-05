import { PassportModule } from "@nestjs/passport";
import { ConfigModule } from "@nestjs/config";
import { Module, OnModuleInit } from "@nestjs/common";
import { FileModule } from "./modules/file";
import { AnalysisModule } from "./modules/analysis";
import { KafkaConsumerService } from "./kafka/services/kafkaConsumer.service";
import { UserService } from "./modules/users/services";
import { UserTopic } from "./common/topic/user.topic";
import { KafkaModule } from "./kafka";
import { UserModule } from "./modules/users";

@Module({
  imports: [
    FileModule,
    PassportModule,
    AnalysisModule,
    KafkaModule,
    UserModule,
    ConfigModule.forRoot(),
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements OnModuleInit {
  constructor(
    private readonly kafkaConsumerService: KafkaConsumerService,
    private readonly userService: UserService,
  ) {}

  async onModuleInit() {
    this.kafkaConsumerService.registerHandler(UserTopic.CREATE_USER, async (message) => {
      await this.userService.createUser(message);
    });

    this.kafkaConsumerService.registerHandler(UserTopic.UPDATE_USER, async (message) => {
      await this.userService.updateUser(message);
    });

    this.kafkaConsumerService.registerHandler(UserTopic.DELETE_USER, async (message) => {
      await this.userService.deleteUserById(message);
    });
  }
}
