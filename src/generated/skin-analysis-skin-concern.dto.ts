import { SkinConcern } from "@prisma/client";
import { ApiProperty } from "@nestjs/swagger";

export class SkinAnalysisSkinConcernDto {
  @ApiProperty({
    enum: SkinConcern,
    required: false,
  })
  skinConcern: SkinConcern;
}
