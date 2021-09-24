import { Equals } from 'class-validator';
import { settingsSearchDto } from 'src/search classes/searchSettings.dto';

export class searchSettingsTrainerDto extends settingsSearchDto {
  @Equals(4)
  role;
}
