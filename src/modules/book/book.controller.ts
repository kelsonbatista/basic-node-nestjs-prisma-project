import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  async create(@Body() data: CreateBookDto) {
    const book = await this.bookService.create(data);
    return book;
  }

  @Get()
  async findAll() {
    return await this.bookService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.bookService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() data: UpdateBookDto) {
    const book = await this.bookService.update(id, data);
    return book;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.bookService.remove(id);
  }
}
