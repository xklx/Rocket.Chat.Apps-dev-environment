import { IHttp, IModify, IRead } from 'temporary-rocketlets-ts-definition/accessors';
import { ISlashCommand, SlashCommandContext } from 'temporary-rocketlets-ts-definition/slashcommands';
import { GuggyGetter } from '../getters/GuggyGetter';

export class GuggyCommand implements ISlashCommand {
    public command = 'guggy';
    public paramsExample = 'Guggy_Text_On_Image';
    public i18nDescription = 'Guggy_Command_Description';

    constructor(private readonly getter: GuggyGetter) { }

    public executor(context: SlashCommandContext, read: IRead, modify: IModify, http: IHttp): void {
        const builder = modify.getCreator().startMessage().setSender(context.getSender()).setRoom(context.getRoom());

        try {
            const gifUrl = this.getter.getTheGif(http, context.getArguments().join(' '));
            builder.addAttachment({ imageUrl: gifUrl });
        } catch (e) {
            builder.setText('Sorry I don\'t have a photo for you :disappointed_relieved:');
        }

        modify.getCreator().finish(builder);
    }
}
