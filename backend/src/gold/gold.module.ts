import { Module } from '@nestjs/common';
import { GoldService } from './gold.service';
import { GoldController } from './gold.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Gold, GoldSchema } from './entities/gold.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Gold.name,
        schema: GoldSchema,
      },
    ]),
  ],
  controllers: [GoldController],
  providers: [GoldService],
})
export class GoldModule {}
