import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateFixedDepositDto } from './dto/create-fixed-deposit.dto';
import { UpdateFixedDepositDto } from './dto/update-fixed-deposit.dto';
import { FixedDeposit } from './entities/fixed-deposit.entity';

@Injectable()
export class FixedDepositsService {
  constructor(
    @InjectModel(FixedDeposit.name)
    private readonly fixedDepositModel: Model<FixedDeposit>,
  ) {}

  create(createFixedDepositDto: CreateFixedDepositDto) {
    const fixedDeposit = new this.fixedDepositModel(createFixedDepositDto);
    return fixedDeposit.save();
  }

  findAll() {
    return this.fixedDepositModel.find().exec();
  }

  async findOne(id: string) {
    const fixedDeposit = await this.fixedDepositModel
      .findOne({ _id: id })
      .exec();
    if (!fixedDeposit) {
      throw new NotFoundException(`Mutual fund #${id} not found!`);
    }
    return fixedDeposit;
  }

  async update(id: string, updateFixedDepositDto: UpdateFixedDepositDto) {
    const existingFixedDeposit = await this.fixedDepositModel
      .findOneAndUpdate(
        { _id: id },
        { $set: updateFixedDepositDto },
        { useFindAndModify: false },
      )
      .exec();
    if (!existingFixedDeposit) {
      throw new NotFoundException(`Mutual fund #${id} not found!`);
    }
    return existingFixedDeposit;
  }

  async remove(id: string) {
    const fixedDeposit = await this.findOne(id);
    return fixedDeposit.remove();
  }
}
