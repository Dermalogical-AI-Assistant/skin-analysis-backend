import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreateAnalysisCommand } from "./createAnalysis.command";
import { PrismaService } from "src/database";

@CommandHandler(CreateAnalysisCommand)
export class CreateAnalysisHandler implements ICommandHandler<CreateAnalysisCommand> {
  constructor(private readonly dbContext: PrismaService) { }

  public async execute({ userId, body }: CreateAnalysisCommand) {
    const {
      acneLevel, darkSpots, rednessLevel, wrinkles, hydration, listSkinConcerns
    } = body;

    const analysis = await this.dbContext.skinAnalysis.create({
      data: {
        acneLevel, 
        darkSpots, 
        rednessLevel, 
        wrinkles, 
        hydration, 
        userId,
        skinConcerns: {
          createMany: {
            data: listSkinConcerns.map(skinConcern => ({
              skinConcern
            }))
          }
        }
      },
    });

    return analysis;
  }
}
