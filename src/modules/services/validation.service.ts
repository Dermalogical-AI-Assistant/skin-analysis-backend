import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/database";

@Injectable()
export class ValidationService {
  constructor(private readonly dbContext: PrismaService) {}

  public async validateUserExistsById(userId: string) {
    const user = await this.dbContext.user.findUnique({
      where: { id: userId },
      select: { id: true },
    });

    if (!user) {
      throw new NotFoundException("User not found!");
    }
    return user;
  }

  public async validateAnalysisExistsById(analysisId: string) {
    const user = await this.dbContext.skinAnalysis.findUnique({
      where: { id: analysisId },
      select: { id: true },
    });

    if (!user) {
      throw new NotFoundException("Skin analysis not found!");
    }
    return user;
  }
}
