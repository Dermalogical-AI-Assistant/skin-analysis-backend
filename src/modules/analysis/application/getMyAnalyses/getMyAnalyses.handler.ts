import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { Prisma } from "@prisma/client";
import { GetMyAnalysesQuery } from "./getMyAnalyses.query";
import { GetMyAnalysesQueryResponse } from "./getMyAnalyses.response";
import { PrismaService } from "src/database";
import { getOrderByDefault } from "src/common/utils/order";
import { S } from "memfs/lib/constants";

@QueryHandler(GetMyAnalysesQuery)
export class GetMyAnalysesHandler implements IQueryHandler<GetMyAnalysesQuery> {
  constructor(private readonly dbContext: PrismaService) { }

  public async execute({
    userId,
    query,
  }: GetMyAnalysesQuery): Promise<GetMyAnalysesQueryResponse> {
    const { perPage, page } = query;

    const { total, myAnalyses } = await this.getMyAnalyses({
      userId,
      query,
    });

    const response = {
      meta: {
        page: page + 1,
        perPage,
        total,
      },
      data: myAnalyses.map(
        x => ({
          ...x,
          skinConcerns: x.skinConcerns.map(x => x.skinConcern)
        })
      )
    };

    return response as GetMyAnalysesQueryResponse;
  }

  private async getMyAnalyses({ userId, query }: GetMyAnalysesQuery) {
    const { listSkinConcerns, page, perPage, order } = query;

    const andWhereConditions: Prisma.Enumerable<Prisma.SkinAnalysisWhereInput> = [{ userId }];

    if (listSkinConcerns?.length > 0) {
      andWhereConditions.push({
        skinConcerns: {
          some: {
            skinConcern: {
              in: listSkinConcerns
            }
          }
        }
      });
    }
    const [total, myAnalyses] = await Promise.all([
      this.dbContext.skinAnalysis.count({
        where: {
          AND: andWhereConditions,
        },
      }),
      this.dbContext.skinAnalysis.findMany({
        where: {
          AND: andWhereConditions,
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
        orderBy: getOrderByDefault(order),
        skip: page * perPage,
        take: perPage,
      }),
    ]);

    return { total, myAnalyses };
  }
}
