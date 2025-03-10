import {
  Controller,
  Delete,
  Param,
  UseGuards,
} from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { DeleteAnalysisByIdCommand } from "./deleteAnalysisById.command";
import { DeleteAnalysisByIdRequestParam } from "./deleteAnalysisById.request-param";
import { AuthenGuard } from "src/common/guard/authen.guard";

@ApiTags("Analysis")
@Controller({
  path: "analysis",
  version: "1",
})
@ApiBearerAuth()
@UseGuards(AuthenGuard)
export class DeleteAnalysisByIdEndpoint {
  constructor(protected commandBus: CommandBus) {}

  @ApiOperation({ description: "Delete Analysis by id" })
  @Delete(":id")
  public delete(@Param() { id }: DeleteAnalysisByIdRequestParam): Promise<void> {
    return this.commandBus.execute<DeleteAnalysisByIdCommand, void>(
      new DeleteAnalysisByIdCommand(id)
    );
  }
}
