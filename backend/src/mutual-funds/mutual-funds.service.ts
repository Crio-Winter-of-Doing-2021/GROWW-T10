import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateMutualFundDto } from './dto/create-mutual-fund.dto';
import { UpdateMutualFundDto } from './dto/update-mutual-fund.dto';
import { MutualFund } from './entities/mutual-fund.entity';

@Injectable()
export class MutualFundsService {
  constructor(
    @InjectModel(MutualFund.name)
    private readonly mutualFundModel: Model<MutualFund>,
  ) {}

  create(createMutualFundDto: CreateMutualFundDto) {
    const mutualFund = new this.mutualFundModel(createMutualFundDto);
    return mutualFund.save();
  }

  findAll() {
    return this.mutualFundModel.find().exec();
  }

  async findOne(id: string) {
    const mutualFund = await this.mutualFundModel.findOne({ _id: id }).exec();
    if (!mutualFund) {
      throw new NotFoundException(`Mutual fund #${id} not found!`);
    }
    return mutualFund;
  }

  async update(id: string, updateMutualFundDto: UpdateMutualFundDto) {
    const existingMutualFund = await this.mutualFundModel
      .findOneAndUpdate(
        { _id: id },
        { $set: updateMutualFundDto },
        { useFindAndModify: false },
      )
      .exec();
    if (!existingMutualFund) {
      throw new NotFoundException(`Mutual fund #${id} not found!`);
    }
    return existingMutualFund;
  }

  async remove(id: string) {
    const mutualFund = await this.findOne(id);
    return mutualFund.remove();
  }
}
