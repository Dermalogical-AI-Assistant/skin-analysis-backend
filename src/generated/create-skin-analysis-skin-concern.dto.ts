import { SkinConcern } from "@prisma/client";
import { IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateSkinAnalysisSkinConcernDto {
  @ApiProperty({
    enum: SkinConcern,
  })
  @IsNotEmpty()
  skinConcern: SkinConcern;
}
