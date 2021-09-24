import { Max, Min } from 'class-validator';
import { settingsSearchDto } from 'src/search classes/searchSettings.dto';
import { roles } from 'src/seeds/roles.seed';

export class searchSettingsOwnerDto extends settingsSearchDto {
  @Min(roles.Trainer)
  @Max(roles.Client)
  role;
}
