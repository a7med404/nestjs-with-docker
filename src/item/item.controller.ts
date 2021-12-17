import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { CreateItemDTO } from './dto/create-item.dto';
import { UpdateItemDTO } from './dto/update-item.dto';
import { ItemService } from './item.service';
import { Item } from './schemas/item.schema';

@Controller('items')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Get()
  async getAll(@Res() response): Promise<Item[]> {
    const items = await this.itemService.findAll();
    return response.status(HttpStatus.OK).json({
      items,
    });
  }

  @Post()
  async create(
    @Res() response,
    @Body() createItemDTO: CreateItemDTO,
  ): Promise<Item> {
    const item = await this.itemService.create(createItemDTO);
    return response.status(HttpStatus.CREATED).json({
      item,
    });
  }

  @Get('/:id')
  async findOne(@Res() response, @Param('id') id: number): Promise<Item> {
    const item = await this.itemService.findById(id);
    return response.status(HttpStatus.OK).json({
      item,
    });
  }

  @Put('/:id')
  async update(
    @Res() response,
    @Param('id') id,
    @Body() updateItemDTO: UpdateItemDTO,
  ) {
    const updatedItem = await this.itemService.update(id, updateItemDTO);
    return response.status(HttpStatus.OK).json({
      updatedItem,
    });
  }

  @Delete('/:id')
  async delete(@Res() response, @Param('id') id) {
    const deletedItem = await this.itemService.delete(id);
    return response.status(HttpStatus.OK).json({
      deletedItem,
    });
  }
}
