import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateFaqDto } from './dto/create-faq.dto';
import { UpdateFaqDto } from './dto/update-faq.dto';
import { faq } from './entities/faq.entity';

@Injectable()
export class FaqService {
  constructor(@InjectModel(faq.name) private readonly faqModel: Model<faq>) {}

  create(createFaqDto: CreateFaqDto) {
    const faq = new this.faqModel(createFaqDto);
    return faq.save();
  }

  findAll() {
    return this.faqModel.find().exec();
  }

  async findOne(id: string) {
    const faq = await this.faqModel.findOne({ _id: id }).exec();
    if (!faq) {
      throw new NotFoundException(`Faq #${id} not found!`);
    }
    return faq;
  }

  async update(id: string, updateFaqDto: UpdateFaqDto) {
    const existingFaq = await this.faqModel
      .findOneAndUpdate(
        { _id: id },
        { $set: updateFaqDto },
        { useFindAndModify: false },
      )
      .exec();
    if (!existingFaq) {
      throw new NotFoundException(`Faq #${id} not found!`);
    }
    return existingFaq;
  }

  async remove(id: string) {
    const faq = await this.findOne(id);
    return faq.remove();
  }
}
