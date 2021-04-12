import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { Stock } from './entities/stock.entity';

@Injectable()
export class StocksService {
  constructor(
    @InjectModel(Stock.name) private readonly stockModel: Model<Stock>,
  ) {}

  create(createStockDto: CreateStockDto) {
    const stock = new this.stockModel(createStockDto);
    return stock.save();
  }

  findAll() {
    return this.stockModel.find().exec();
  }

  async findOne(id: string) {
    const stock = await this.stockModel.findOne({ _id: id }).exec();
    if (!stock) {
      throw new NotFoundException(`Stock #${id} not found!`);
    }
    return stock;
  }

  async update(id: string, updateStockDto: UpdateStockDto) {
    const existingStock = await this.stockModel
      .findOneAndUpdate(
        { _id: id },
        { $set: updateStockDto },
        { useFindAndModify: false },
      )
      .exec();
    if (!existingStock) {
      throw new NotFoundException(`Stock #${id} not found!`);
    }
    return existingStock;
  }

  async remove(id: string) {
    const stock = await this.findOne(id);
    return stock.remove();
  }
}
