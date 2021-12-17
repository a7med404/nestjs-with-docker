import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateItemDTO } from './dto/create-item.dto';
import { UpdateItemDTO } from './dto/update-item.dto';
import { Item, ItemDocument } from './schemas/item.schema';

@Injectable()
export class ItemService {
  constructor(@InjectModel(Item.name) private ItemModel: Model<ItemDocument>) {}

  async create(createItemDto: CreateItemDTO): Promise<Item> {
    const createdItem = new this.ItemModel(createItemDto);
    return await createdItem.save();
  }

  async findAll(): Promise<Item[]> {
    return await this.ItemModel.find().exec();
  }

  async findById(id): Promise<Item> {
    return await this.ItemModel.findById(id).exec();
  }

  async update(id, updateItemDTO: UpdateItemDTO): Promise<Item> {
    return await this.ItemModel.findByIdAndUpdate(id, updateItemDTO, {
      new: true,
    });
  }

  async delete(id): Promise<any> {
    return await this.ItemModel.findByIdAndRemove(id);
  }
}
