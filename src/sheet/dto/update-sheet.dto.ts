import { IsNumber, IsString } from 'class-validator';

export class UpdateSheetDto {
  @IsNumber()
  row: number;

  @IsNumber()
  column: number;

  @IsString()
  value: any;
}
