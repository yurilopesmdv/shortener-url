// src/auth/dto/login.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description: 'O endereço de e-mail do usuário.',
    example: 'usuario@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: 'A senha do usuário.', example: 'senha123' })
  @IsNotEmpty()
  password: string;
}
export class LoginResponseDto {
  @ApiProperty({
    description: 'O token JWT gerado para autenticação.',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  @IsString()
  @IsNotEmpty()
  accessToken: string;

  @ApiProperty({
    description: 'O ID do usuário autenticado.',
    example: 1,
  })
  userId: number;
}
