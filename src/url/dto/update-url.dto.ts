import { ApiProperty } from '@nestjs/swagger';
import { IsUrl, IsNotEmpty } from 'class-validator';

export class UpdateUrlDto {
  @ApiProperty({
    description: 'A nova URL original para atualizar.',
    example: 'https://www.updated-example.com/new-page',
  })
  @IsUrl()
  @IsNotEmpty()
  originalUrl: string;
}
