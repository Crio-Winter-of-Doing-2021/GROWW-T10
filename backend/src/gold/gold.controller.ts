import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { GoldService } from './gold.service';
import { CreateGoldDto } from './dto/create-gold.dto';
import { UpdateGoldDto } from './dto/update-gold.dto';

@Controller('gold')
export class GoldController {
  constructor(private readonly goldsService: GoldService) {}

  @Post()
  create(@Body() createGoldDto: CreateGoldDto) {
    return this.goldsService.create(createGoldDto);
  }

  @Get()
  findAll() {
    return this.goldsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.goldsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGoldDto: UpdateGoldDto) {
    return this.goldsService.update(id, updateGoldDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.goldsService.remove(id);
  }
}
