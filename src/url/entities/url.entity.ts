import { ApiProperty } from '@nestjs/swagger';
import { Url as PrismaUrl } from '@prisma/client'; // Importa o tipo do Prisma

export class UrlEntity implements PrismaUrl {
  @ApiProperty({ description: 'ID único da URL.', example: 1 })
  id: number;

  @ApiProperty({
    description: 'A URL original.',
    example: 'https://www.example.com/long-page-path',
  })
  originalUrl: string;

  @ApiProperty({
    description: 'O código curto gerado.',
    example: 'aZbKq7',
  })
  shortCode: string;

  @ApiProperty({
    description: 'Número de cliques na URL encurtada.',
    example: 15,
  })
  clicks: number;

  @ApiProperty({
    description: 'ID do usuário que criou a URL (nulo se for pública).',
    example: 10,
    nullable: true,
  })
  userId: number | null;

  @ApiProperty({
    description: 'Data e hora da criação do registro.',
    example: '2025-06-22T18:00:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Data e hora da última atualização do registro.',
    example: '2025-06-22T18:30:00.000Z',
  })
  updatedAt: Date;

  @ApiProperty({
    description:
      'Data e hora da exclusão lógica do registro (nulo se não excluído).',
    example: null,
    nullable: true,
  })
  deletedAt: Date | null;
}
