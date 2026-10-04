import {IRepository} from '@/src/repositories/IRepository';
import {UserHistoryData} from '@/src/domain/UserHistoryData';
import {CommandHandler} from '@/src/services/CommandHandler';
import {IWidgetPublisher} from '@/src/services/WidgetServices/IWidgetPublisher';
import {PublishScheduleToWidgetCommand} from '@/src/services/WidgetServices/WidgetCommands';

export class PublishScheduleToWidgetCommandHandler extends CommandHandler {
    constructor(
        private readonly historyRepository: IRepository<UserHistoryData>,
        private readonly publisher: IWidgetPublisher,
    ) {
        super();
    }

    async handle(_command: PublishScheduleToWidgetCommand): Promise<void> {
        if (!this.publisher.isSupported()) return;

        const history = await this.historyRepository.get();
        if (!history) return;

        await this.timed('PublishScheduleToWidget', async () => {
            await this.publisher.publishSchedule(history.preferredTimeInHours, history.preferredTimeInMinutes, new Date());
        });
    }
}
