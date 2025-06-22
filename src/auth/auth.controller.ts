import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Registra um novo usuário na aplicação.' }) // Descrição da operação
  @ApiBody({
    type: RegisterDto,
    description: 'Dados para registrar um novo usuário.',
  }) // Tipo do corpo da requisição
  @ApiResponse({
    status: 201,
    description: 'Usuário registrado com sucesso. Retorna o ID do usuário.',
    schema: {
      // Exemplo de schema de resposta para o registro
      type: 'object',
      properties: {
        id: { type: 'number', example: 1 },
        email: { type: 'string', example: 'novo@email.com' },
        createdAt: { type: 'string', format: 'date-time' },
        updatedAt: { type: 'string', format: 'date-time' },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Dados de registro inválidos ou email já em uso.',
  })
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() registerDto: RegisterDto) {
    const userExists = await this.authService.findByEmail(registerDto.email);
    if (userExists) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const user = await this.authService.register(
      registerDto.email,
      registerDto.password,
    );
    const { password, ...result } = user;
    return result;
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiOperation({
    summary:
      'Realiza o login do usuário e retorna um token JWT para autenticação.',
  }) // Descrição da operação
  @ApiBody({
    type: LoginDto,
    description: 'Credenciais do usuário (email e senha).',
  }) // Tipo do corpo da requisição
  @ApiResponse({
    status: 200,
    description: 'Login bem-sucedido. Retorna o token de acesso.',
    schema: {
      // Schema de resposta para o login (o token)
      type: 'object',
      properties: {
        access_token: {
          type: 'string',
          example:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImVtYWlsIjoidXNlckBleGFtcGxlLmNvbSIsImlhdCI6MTY3ODk0MDAwMCwiZXhwIjoxNjc4OTQzNjAwfQ.signature',
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Credenciais inválidas (email ou senha incorretos).',
  })
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.validateUser(
      loginDto.email,
      loginDto.password,
    );
    console.log(user);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.authService.login(user);
  }
}
