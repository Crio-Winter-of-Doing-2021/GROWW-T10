import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { MutualFundsService } from './mutual-funds.service';
import { CreateMutualFundDto } from './dto/create-mutual-fund.dto';
import { UpdateMutualFundDto } from './dto/update-mutual-fund.dto';

@Controller('mutual-funds')
export class MutualFundsController {
  constructor(private readonly mutualFundsService: MutualFundsService) {}

  @Post()
  create(@Body() createMutualFundDto: CreateMutualFundDto) {
    return this.mutualFundsService.create(createMutualFundDto);
  }

  @Get()
  findAll() {
    return this.mutualFundsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mutualFundsService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateMutualFundDto: UpdateMutualFundDto) {
    return this.mutualFundsService.update(+id, updateMutualFundDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mutualFundsService.remove(+id);
  }
}
