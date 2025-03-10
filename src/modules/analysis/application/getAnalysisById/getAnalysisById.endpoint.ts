import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { QueryBus } from "@nestjs/cqrs";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { GetAnalysisByIdQuery } from "./getAnalysisById.query";
import { GetAnalysisByIdRequestParam } from "./getAnalysisById.request-param";
import { GetAnalysisByIdQueryResponse } from "./getAnalysisById.response";
import { AuthenGuard } from "src/common/guard/authen.guard";
import { RequestUser } from "src/common/decorator/requestUser.decorator";
import { user } from "firebase-functions/v1/auth";
import { LoginUserDto } from "src/common/dto/loginUser.dto";

@ApiTags("Analysis")
@Controller({
  path: "analysis",
  version: "1",
})
@ApiBearerAuth()
@UseGuards(AuthenGuard)
export class GetAnalysiByIdEndpoint {
  constructor(protected queryBus: QueryBus) {}

  @ApiOperation({ description: "Get Analysis by id" })
  @Get(":id")
  public get(
    @Param() { id }: GetAnalysisByIdRequestParam, @RequestUser() user: LoginUserDto
  ): Promise<GetAnalysisByIdQueryResponse> {
    return this.queryBus.execute<GetAnalysisByIdQuery, GetAnalysisByIdQueryResponse>(
      new GetAnalysisByIdQuery(id, user.id)
    );
  }
}
