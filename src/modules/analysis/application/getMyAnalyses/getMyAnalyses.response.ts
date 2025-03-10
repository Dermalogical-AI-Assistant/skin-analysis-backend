import { ApiProperty } from '@nestjs/swagger';
import { SkinConcern } from '@prisma/client';
import { PaginatedOutputDto } from 'src/common/dto/pageOutput.dto';

export class GetMyAnalysesResponse {
  id: string;
  userId: string;
  acneLevel: number;
  darkSpots: number;
  wrinkles: number;
  rednessLevel: number;
  hydration: number;
  skinConcerns: SkinConcern[];
}

export class GetMyAnalysesQueryResponse extends PaginatedOutputDto<GetMyAnalysesResponse> {
  @ApiProperty({
    description: 'List of my analyses',
    isArray: true,
  })
  data: GetMyAnalysesResponse[];
}
