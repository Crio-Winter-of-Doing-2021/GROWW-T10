import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateGoldDto } from './dto/create-gold.dto';
import { UpdateGoldDto } from './dto/update-gold.dto';
import { Gold } from './entities/gold.entity';

@Injectable()
export class GoldService {
  constructor(
    @InjectModel(Gold.name)
    private readonly goldModel: Model<Gold>,
  ) {}

  create(createGoldDto: CreateGoldDto) {
    const gold = new this.goldModel(createGoldDto);
    return gold.save();
  }

  findAll() {
    return this.goldModel.find().exec();
  }

  async findOne(id: string) {
    const gold = await this.goldModel.findOne({ _id: id }).exec();
    if (!gold) {
      throw new NotFoundException(`Mutual fund #${id} not found!`);
    }
    return gold;
  }

  async update(id: string, updateGoldDto: UpdateGoldDto) {
    const existingGold = await this.goldModel
      .findOneAndUpdate(
        { _id: id },
        { $set: updateGoldDto },
        { useFindAndModify: false },
      )
      .exec();
    if (!existingGold) {
      throw new NotFoundException(`Gold #${id} not found!`);
    }
    return existingGold;
  }

  async remove(id: string) {
    const gold = await this.findOne(id);
    return gold.remove();
  }
}
