import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSheetDto } from './dto/create-sheet.dto';
import { UpdateSheetDto } from './dto/update-sheet.dto';
import { Sheet } from './entities/sheet.entity';

@Injectable()
export class SheetService {
  constructor(
    @InjectRepository(Sheet) private readonly sheetModel: Repository<Sheet>,
  ) {}
  async create(createSheetDto: CreateSheetDto) {
    const sheet = this.sheetModel.create({ ...createSheetDto, data: {} });
    return this.sheetModel.save(sheet);
  }

  findOne(id: number) {
    return `This action returns a #${id} sheet`;
  }

  async update(id: number, updateSheetDto: UpdateSheetDto) {
    const sheet = await this.sheetModel.findOne({ where: { id } });
    const { column, row, value } = updateSheetDto;

    if (!sheet.data[row - 1]) {
      sheet.data[row - 1] = [];
    }
    sheet.data[row - 1][column - 1] = value;

    return this.sheetModel.save(sheet);
  }
}
