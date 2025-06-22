import { ApiProperty } from '@nestjs/swagger';
import { IsUrl, IsNotEmpty } from 'class-validator';

export class CreateUrlDto {
  @ApiProperty({
    description: 'A URL original a ser encurtada.',
    example: 'https://www.example.com/long-page-path',
  })
  @IsUrl()
  @IsNotEmpty()
  originalUrl: string;
}
