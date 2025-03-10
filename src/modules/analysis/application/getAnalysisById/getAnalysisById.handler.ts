import { ForbiddenException, NotFoundException } from "@nestjs/common";
import { GetAnalysisByIdQuery } from "./getAnalysisById.query";
import { GetAnalysisByIdQueryResponse } from "./getAnalysisById.response";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { PrismaService } from "src/database";

@QueryHandler(GetAnalysisByIdQuery)
export class GetAnalysisByIdHandler implements IQueryHandler<GetAnalysisByIdQuery> {
  constructor(private readonly dbContext: PrismaService) { }

  public async execute(
    { id, userId }: GetAnalysisByIdQuery
  ): Promise<GetAnalysisByIdQueryResponse> {
    const analysis = await this.dbContext.skinAnalysis.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        userId: true,
        acneLevel: true,
        darkSpots: true,
        wrinkles: true,
        hydration: true,
        rednessLevel: true,
        skinConcerns: {
          select: {
            skinConcern: true
          }
        }
      },
    });

    if (!analysis) {
      throw new NotFoundException("Analysis not found!");
    }

    if (analysis.userId != userId) {
      throw new ForbiddenException('You are not allowed to view this skin analysis');
    }

    return {
      ...analysis,
      skinConcerns: analysis.skinConcerns.map(x => x.skinConcern)
    };
  }
}
