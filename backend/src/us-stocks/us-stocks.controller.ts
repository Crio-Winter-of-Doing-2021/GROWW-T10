import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsStocksService } from './us-stocks.service';
import { CreateUsStockDto } from './dto/create-us-stock.dto';
import { UpdateUsStockDto } from './dto/update-us-stock.dto';

@Controller('us-stocks')
export class UsStocksController {
  constructor(private readonly usStocksService: UsStocksService) {}

  @Post()
  create(@Body() createUsStockDto: CreateUsStockDto) {
    return this.usStocksService.create(createUsStockDto);
  }

  @Get()
  findAll() {
    return this.usStocksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usStocksService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUsStockDto: UpdateUsStockDto) {
    return this.usStocksService.update(id, updateUsStockDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usStocksService.remove(id);
  }
}
