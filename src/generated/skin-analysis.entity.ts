import { ApiProperty } from "@nestjs/swagger";
import { UserEntity } from "./user.entity";
import { SkinAnalysisSkinConcernEntity } from "./skin-analysis-skin-concern.entity";

export class SkinAnalysisEntity {
  @ApiProperty({
    required: false,
  })
  id: string;
  @ApiProperty({
    required: false,
  })
  userId: string;
  @ApiProperty({
    type: "string",
    format: "date-time",
    required: false,
  })
  analysisDate: Date;
  @ApiProperty({
    type: "integer",
    format: "int32",
    required: false,
  })
  acneLevel: number;
  @ApiProperty({
    type: "integer",
    format: "int32",
    required: false,
  })
  darkSpots: number;
  @ApiProperty({
    type: "integer",
    format: "int32",
    required: false,
  })
  wrinkles: number;
  @ApiProperty({
    type: "integer",
    format: "int32",
    required: false,
  })
  rednessLevel: number;
  @ApiProperty({
    type: "integer",
    format: "int32",
    required: false,
  })
  hydration: number;
  @ApiProperty({
    type: "string",
    format: "date-time",
    required: false,
  })
  createdAt: Date;
  @ApiProperty({
    required: false,
  })
  user?: UserEntity;
  @ApiProperty({
    isArray: true,
    required: false,
  })
  skinConcerns?: SkinAnalysisSkinConcernEntity[];
}
