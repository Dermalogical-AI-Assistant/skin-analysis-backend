import { ApiPropertyOptional } from "@nestjs/swagger";
import { Gender, Prisma, RoleType, SkinConcern } from "@prisma/client";
import { Transform, Type } from "class-transformer";
import {
  IsArray,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Min,
} from "class-validator";
import { GetMyAnalysesOrderByEnum } from "../../analysis.enum";
import { IsOrderQueryParam } from "src/common/decorator/order.decorator";

export class GetMyAnalysesRequestQuery {
  @ApiPropertyOptional({
      description: "List of skin concerns",
      example: [SkinConcern.FRECKLES],
      type: [SkinConcern]
    })
    @IsOptional()
    @IsEnum(SkinConcern, {each: true})
    @Transform(({ value }) => Array.isArray(value) ? value : [value])
    listSkinConcerns: SkinConcern[];

  @ApiPropertyOptional({
    description: "Number of records to skip and then return the remainder",
    example: 1,
  })
  @IsOptional()
  @Transform(({ value }) => value - 1)
  @Type(() => Number)
  @IsInt()
  @Min(0)
  page?: number = 1;

  @ApiPropertyOptional({
    description: "Number of records to return and then skip over the remainder",
    example: 10,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  perPage?: number = 10;

  @ApiPropertyOptional({
    description: `Order by keyword. \n\n  Available values: ${Object.values(
      GetMyAnalysesOrderByEnum
    )}`,
    example: `${GetMyAnalysesOrderByEnum.createdAt}:${Prisma.SortOrder.asc}`,
  })
  @IsOptional()
  @IsString()
  @IsOrderQueryParam("order", GetMyAnalysesOrderByEnum)
  order?: string;
}
