import { Gender, RoleType, SkinConcern } from "@prisma/client";

export class GetAnalysisByIdQueryResponse {
  id: string;
  userId: string;
  acneLevel: number;
  darkSpots: number;
  wrinkles: number;
  rednessLevel: number;
  hydration: number;
  skinConcerns: SkinConcern[];
}