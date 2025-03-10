import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Gender, RoleType, SkinConcern } from "@prisma/client";
import { Transform } from "class-transformer";
import {
  IsEnum,
  IsInt,
  IsISO8601,
  IsNumber,
  IsOptional,
  isPositive,
  IsString,
  IsUrl,
  Matches,
  MaxLength,
} from "class-validator";



/**
 * 
  acneLevel    Int      @default(0) @map("acne_level")
  darkSpots    Int      @default(0) @map("dark_spots")
  wrinkles     Int      @default(0) @map("wrinkles")
  rednessLevel Int      @default(0) @map("redness_level")
  hydration    Int      @default(0) @map("hydration_level")
  createdAt    DateTime @default(now()) @map("created_at") @db.Timestamptz(6)
 */
export class CreateAnalysisRequestBody {
  @ApiProperty({
    description: "level of acne",
    example: 0,
  })
  @IsInt()
  acneLevel: number;

  @ApiProperty({
    description: "dark spots",
    example: 0,
  })
  @IsInt()
  darkSpots: number;

  @ApiProperty({
    description: "wrinkles",
    example: 0,
  })
  @IsInt()
  wrinkles: number;

  @ApiProperty({
    description: "level of redness",
    example: 0,
  })
  @IsInt()
  rednessLevel: number;

  @ApiProperty({
    description: "hydration",
    example: 0,
  })
  @IsInt()
  hydration: number;

  @ApiPropertyOptional({
    description: "List of skin concerns",
    example: [SkinConcern.DARK_CIRCLES],
    type: [SkinConcern]
  })
  @IsEnum(SkinConcern, {each: true})
  listSkinConcerns: SkinConcern[];
}
