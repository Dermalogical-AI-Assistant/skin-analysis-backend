import { ApiProperty } from "@nestjs/swagger";

export class SkinAnalysisDto {
  @ApiProperty({
    required: false,
  })
  id: string;
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
}
