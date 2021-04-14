import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUsStockDto } from './dto/create-us-stock.dto';
import { UpdateUsStockDto } from './dto/update-us-stock.dto';
import { UsStock } from './entities/us-stock.entity';

@Injectable()
export class UsStocksService {
  constructor(
    @InjectModel(UsStock.name)
    private readonly usStockModel: Model<UsStock>,
  ) {}

  create(createUsStockDto: CreateUsStockDto) {
    const usStock = new this.usStockModel(createUsStockDto);
    return usStock.save();
  }

  findAll() {
    return this.usStockModel.find().exec();
  }

  async findOne(id: string) {
    const usStock = await this.usStockModel.findOne({ _id: id }).exec();
    if (!usStock) {
      throw new NotFoundException(`Mutual fund #${id} not found!`);
    }
    return usStock;
  }

  async update(id: string, updateUsStockDto: UpdateUsStockDto) {
    const existingUsStock = await this.usStockModel
      .findOneAndUpdate(
        { _id: id },
        { $set: updateUsStockDto },
        { useFindAndModify: false },
      )
      .exec();
    if (!existingUsStock) {
      throw new NotFoundException(`UsStock #${id} not found!`);
    }
    return existingUsStock;
  }

  async remove(id: string) {
    const usStock = await this.findOne(id);
    return usStock.remove();
  }
}
