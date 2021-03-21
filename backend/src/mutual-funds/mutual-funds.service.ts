import { Injectable } from '@nestjs/common';
import { CreateMutualFundDto } from './dto/create-mutual-fund.dto';
import { UpdateMutualFundDto } from './dto/update-mutual-fund.dto';

@Injectable()
export class MutualFundsService {
  create(createMutualFundDto: CreateMutualFundDto) {
    return 'This action adds a new mutualFund';
  }

  findAll() {
    return `This action returns all mutualFunds`;
  }

  findOne(id: number) {
    return `This action returns a #${id} mutualFund`;
  }

  update(id: number, updateMutualFundDto: UpdateMutualFundDto) {
    return `This action updates a #${id} mutualFund`;
  }

  remove(id: number) {
    return `This action removes a #${id} mutualFund`;
  }
}
