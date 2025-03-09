import { SkinConcern } from "@prisma/client";
import { IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateSkinAnalysisSkinConcernDto {
  @ApiProperty({
    enum: SkinConcern,
    required: false,
  })
  @IsOptional()
  skinConcern?: SkinConcern;
}
