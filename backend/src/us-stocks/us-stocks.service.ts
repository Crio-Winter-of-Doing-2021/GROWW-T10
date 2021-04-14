import { Injectable } from '@nestjs/common';
import { CreateUsStockDto } from './dto/create-us-stock.dto';
import { UpdateUsStockDto } from './dto/update-us-stock.dto';

@Injectable()
export class UsStocksService {
  create(createUsStockDto: CreateUsStockDto) {
    return 'This action adds a new usStock';
  }

  findAll() {
    return `This action returns all usStocks`;
  }

  findOne(id: number) {
    return `This action returns a #${id} usStock`;
  }

  update(id: number, updateUsStockDto: UpdateUsStockDto) {
    return `This action updates a #${id} usStock`;
  }

  remove(id: number) {
    return `This action removes a #${id} usStock`;
  }
}
