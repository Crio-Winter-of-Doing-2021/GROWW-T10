import { Module } from '@nestjs/common';
import { FaqService } from './faq.service';
import { FaqController } from './faq.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { faq, faqSchema } from './entities/faq.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: faq.name,
        schema: faqSchema,
      },
    ]),
  ],
  controllers: [FaqController],
  providers: [FaqService],
})
export class FaqModule {}
