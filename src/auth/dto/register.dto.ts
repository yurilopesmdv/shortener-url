import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty({
    description: 'O endereço de e-mail do usuário.',
    example: 'usuario@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'A senha do usuário (mínimo de 6 caracteres).',
    example: 'senha123',
  })
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
