import { CreateAnalysisRequestBody } from './createAnalysis.request-body';

export class CreateAnalysisCommand {
  constructor(public readonly userId: string, public readonly body: CreateAnalysisRequestBody) {}
}
