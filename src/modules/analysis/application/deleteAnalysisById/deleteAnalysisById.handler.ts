import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteAnalysisByIdCommand } from './deleteAnalysisById.command';
import { PrismaService } from 'src/database';
import { ValidationService } from 'src/modules/services/validation.service';

@CommandHandler(DeleteAnalysisByIdCommand)
export class DeleteAnalysisByIdHandler implements ICommandHandler<DeleteAnalysisByIdCommand> {
  constructor(private readonly dbContext: PrismaService, private readonly validationService: ValidationService) {}

  public async execute(command: DeleteAnalysisByIdCommand): Promise<void> {
    const analysisId = command.id;
    await this.validationService.validateAnalysisExistsById(analysisId);
    await this.dbContext.skinAnalysis.delete({ where: { id: analysisId } });
  }
}
