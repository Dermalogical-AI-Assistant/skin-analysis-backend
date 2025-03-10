import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { CreateAnalysisCommand } from "./createAnalysis.command";
import { CreateAnalysisRequestBody } from "./createAnalysis.request-body";
import { AuthenGuard } from "src/common/guard/authen.guard";
import { LoginUserDto } from "src/common/dto/loginUser.dto";
import { RequestUser } from "src/common/decorator/requestUser.decorator";

@ApiTags("Analysis")
@Controller({
  path: "analysis",
  version: "1",
})
@ApiBearerAuth()
@UseGuards(AuthenGuard)
export class CreateAnalysisEndpoint {
  constructor(protected commandBus: CommandBus) {}

  @ApiOperation({ description: "Create an Analysis" })
  @Post()
  public create(@Body() body: CreateAnalysisRequestBody, @RequestUser() user: LoginUserDto): Promise<LoginUserDto> {
    return this.commandBus.execute<CreateAnalysisCommand>(
      new CreateAnalysisCommand(user.id, body)
    );
  }
}
