import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { customAlphabet } from 'nanoid';

@Injectable()
export class UrlService {
  // eslint-disable-next-line prettier/prettier
  private readonly alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  private generateShortCode = customAlphabet(this.alphabet, 6);

  constructor(private prisma: PrismaService) {}

  async create(originalUrl: string, userId?: number) {
    let shortCode: string;
    let existingUrl: any;

    do {
      shortCode = this.generateShortCode();
      existingUrl = await this.prisma.url.findUnique({ where: { shortCode } });
    } while (existingUrl);

    const url = await this.prisma.url.create({
      data: {
        originalUrl,
        shortCode,
        clicks: 0,
        userId: userId,
      },
    });
    return url;
  }

  async findOne(shortCode: string) {
    const url = await this.prisma.url.findUnique({
      where: { shortCode: shortCode },
    });

    if (!url || url.deletedAt !== null) {
      return null;
    }

    const updatedUrl = await this.prisma.url.update({
      where: { id: url.id },
      data: {
        clicks: {
          increment: 1,
        },
      },
    });

    return updatedUrl;
  }

  async findAll(userId: number) {
    return await this.prisma.url.findMany({
      where: { userId, deletedAt: null },
    });
  }

  async update(id: number, originalUrl: string, userId: number) {
    return await this.prisma.url.update({
      where: { id, userId, deletedAt: null },
      data: { originalUrl },
    });
  }

  async remove(id: number, userId: number) {
    return await this.prisma.url.update({
      where: { id, userId, deletedAt: null },
      data: { deletedAt: new Date() },
    });
  }
}
