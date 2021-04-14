import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { FixedDepositsService } from './fixed-deposits.service';
import { CreateFixedDepositDto } from './dto/create-fixed-deposit.dto';
import { UpdateFixedDepositDto } from './dto/update-fixed-deposit.dto';

@Controller('fixed-deposits')
export class FixedDepositsController {
  constructor(private readonly fixedDepositsService: FixedDepositsService) {}

  @Post()
  create(@Body() createFixedDepositDto: CreateFixedDepositDto) {
    return this.fixedDepositsService.create(createFixedDepositDto);
  }

  @Get()
  findAll() {
    return this.fixedDepositsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fixedDepositsService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateFixedDepositDto: UpdateFixedDepositDto) {
    return this.fixedDepositsService.update(+id, updateFixedDepositDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fixedDepositsService.remove(+id);
  }
}
