import { Type } from 'class-transformer';
import { IsDefined, IsString, ValidateNested } from 'class-validator';
import { EmailVerifiedTs } from 'src/entities/emailVerifiedTr.entity';
import { ExerciseModesTs } from 'src/entities/exerciseModesTr.entity';
import { ExerciseOptionsTs } from 'src/entities/exerciseOptionsTr.entity';
import { GendersTs } from 'src/entities/gendersTr.entity';
import { LanguagesTs } from 'src/entities/languagesTr.entity';
import { LevelsTs } from 'src/entities/levelsTr.entity';
import { ProgramsTs } from 'src/entities/programsTr.entity';
import { ResetPasswordTs } from 'src/entities/resetPasswordsTr.entity';
import { RolesTs } from 'src/entities/rolesTr.entity';
import { SystemsTs } from 'src/entities/systemsTr.entity';
import { TargetsTs } from 'src/entities/targetsTr.entity';

export class translationDto {
  @IsDefined()
  @IsString()
  translation: string;

  @IsDefined()
  @ValidateNested()
  @Type(() => Object, {
    keepDiscriminatorProperty: true,
    discriminator: {
      property: 'type',
      subTypes: [
        { value: EmailVerifiedTs, name: EmailVerifiedTs.name },
        { value: ResetPasswordTs, name: ResetPasswordTs.name },
        { value: ExerciseModesTs, name: ExerciseModesTs.name },
        { value: ExerciseOptionsTs, name: ExerciseOptionsTs.name },
        { value: GendersTs, name: GendersTs.name },
        { value: LevelsTs, name: LevelsTs.name },
        { value: ProgramsTs, name: ProgramsTs.name },
        { value: RolesTs, name: RolesTs.name },
        { value: SystemsTs, name: SystemsTs.name },
        { value: TargetsTs, name: TargetsTs.name },
        { value: LanguagesTs, name: LanguagesTs.name },
      ],
    },
  })
  data:
    | EmailVerifiedTs
    | ResetPasswordTs
    | ExerciseModesTs
    | ExerciseOptionsTs
    | GendersTs
    | LevelsTs
    | ProgramsTs
    | RolesTs
    | SystemsTs
    | TargetsTs
    | LanguagesTs;
}
