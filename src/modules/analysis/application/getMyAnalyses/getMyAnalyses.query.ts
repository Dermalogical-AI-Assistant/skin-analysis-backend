import { GetMyAnalysesRequestQuery } from './getMyAnalyses.request-query';
export class GetMyAnalysesQuery {
  constructor(public readonly userId: string, public readonly query: GetMyAnalysesRequestQuery) {}
}
