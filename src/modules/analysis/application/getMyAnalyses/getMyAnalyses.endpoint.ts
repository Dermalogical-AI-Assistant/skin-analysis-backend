import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { QueryBus } from "@nestjs/cqrs";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { GetMyAnalysesQuery } from "./getMyAnalyses.query";
import { GetMyAnalysesRequestQuery } from "./getMyAnalyses.request-query";
import { GetMyAnalysesQueryResponse } from "./getMyAnalyses.response";
import { PaginatedOutputDto } from "src/common/dto/pageOutput.dto";
import { AuthenGuard } from "src/common/guard/authen.guard";
import { RequestUser } from "src/common/decorator/requestUser.decorator";
import { LoginUserDto } from "src/common/dto/loginUser.dto";

@ApiTags("Analysis")
@Controller({
  path: "my-analysis",
  version: "1",
})
@ApiBearerAuth()
@UseGuards(AuthenGuard)
export class GetMyAnalysesEndpoint {
  constructor(protected queryBus: QueryBus) {}

  @ApiOperation({ description: "Get all my analyses" })
  @Get()
  public get(
    @Query() query: GetMyAnalysesRequestQuery, @RequestUser() user: LoginUserDto
  ): Promise<PaginatedOutputDto<GetMyAnalysesQueryResponse>> {
    return this.queryBus.execute<
      GetMyAnalysesQuery,
      PaginatedOutputDto<GetMyAnalysesQueryResponse>
    >(new GetMyAnalysesQuery(user.id, query));
  }
}
