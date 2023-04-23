import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BookService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateBookDto) {
    const bookExists = await this.prisma.book.findFirst({
      where: {
        bar_code: data.bar_code,
      },
    });

    if (bookExists) {
      throw new Error('Book already exists');
    }

    const book = await this.prisma.book.create({
      data,
    });

    return book;
  }

  async findAll() {
    const books = await this.prisma.book.findMany();
    return books;
  }

  async findOne(id: string) {
    const bookExists = await this.prisma.book.findUnique({
      where: {
        id,
      },
    });

    if (!bookExists) {
      throw new Error('Book not found');
    }

    return bookExists;
  }

  async update(id: string, data: UpdateBookDto) {
    const bookExists = await this.prisma.book.findUnique({
      where: {
        id,
      },
    });

    if (!bookExists) {
      throw new Error('Book not found');
    }

    const book = await this.prisma.book.update({
      data,
      where: {
        id,
      },
    });

    return book;
  }

  async remove(id: string) {
    const bookExists = await this.prisma.book.findUnique({
      where: {
        id,
      },
    });

    if (!bookExists) {
      throw new Error('Book not found');
    }

    await this.prisma.book.delete({
      where: {
        id,
      },
    });

    return { message: 'Book successfully deleted' };
  }
}
