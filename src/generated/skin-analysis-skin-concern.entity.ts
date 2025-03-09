import { SkinConcern } from "@prisma/client";
import { ApiProperty } from "@nestjs/swagger";
import { SkinAnalysisEntity } from "./skin-analysis.entity";

export class SkinAnalysisSkinConcernEntity {
  @ApiProperty({
    required: false,
  })
  skinAnalysisId: string;
  @ApiProperty({
    enum: SkinConcern,
    required: false,
  })
  skinConcern: SkinConcern;
  @ApiProperty({
    required: false,
  })
  skinAnalysis?: SkinAnalysisEntity;
}
