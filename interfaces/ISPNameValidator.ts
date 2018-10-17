import { Platform, ValidationType } from '../enums/enums';

export interface ISPNameValidator {
  checkName(name: string, type: ValidationType): boolean;
}
