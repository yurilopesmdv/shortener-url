import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
  Req,
  HttpCode,
  HttpStatus,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UrlService } from './url.service';
import { CreateUrlDto } from './dto/create-url.dto';
import { UpdateUrlDto } from './dto/update-url.dto';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { UrlEntity } from './entities/url.entity';
import { OptionalJwtAuthGuard } from 'src/auth/optional-jwt-auth';

@Controller('url')
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  @Post()
  @UseGuards(OptionalJwtAuthGuard)
  @ApiOperation({
    summary: 'Encurta uma URL.',
    description:
      'Pode ser usado por usuários autenticados (a URL é associada a eles) ou não autenticados (URL pública).',
  })
  @ApiResponse({
    status: 201,
    description: 'URL encurtada com sucesso.',
    type: UrlEntity,
  })
  @ApiResponse({ status: 400, description: 'Dados inválidos.' })
  @ApiBody({ type: CreateUrlDto, description: 'URL original para encurtar.' })
  @ApiBearerAuth('access-token')
  async shortenUrl(@Body() createUrlDto: CreateUrlDto, @Req() req: any) {
    const userId = req.user ? req.user.id : undefined;
    const baseUrl = process.env.BASE_URL || 'http://localhost:3000';

    const url = await this.urlService.create(createUrlDto.originalUrl, userId);
    return {
      originalUrl: url.originalUrl,
      shortUrl: `${baseUrl}/${url.shortCode}`,
      shortCode: url.shortCode,
    };
  }

  @Get()
  @ApiOperation({
    summary: 'Lista todas as URLs encurtadas pelo usuário autenticado.',
    description: 'Apenas usuários autenticados podem acessar suas URLs.',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de URLs do usuário.',
    type: [UrlEntity], // Retorna um array de UrlEntity
  })
  @ApiResponse({ status: 401, description: 'Não autorizado.' })
  @ApiBearerAuth('access-token') // Indica que esta rota requer autenticação JWT
  @UseGuards(AuthGuard('jwt'))
  @UseGuards(AuthGuard('jwt'))
  async listUrls(@Req() req: any) {
    console.log('UrlController - req.user:', req.user);
    const userId = req.user ? req.user.id : undefined;
    if (!userId) {
      console.log('UrlController - userId não encontrado em req.user.sub');
      throw new UnauthorizedException('User not authenticated.');
    }
    return this.urlService.findAll(userId);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Atualiza a URL original de uma URL encurtada.',
    description:
      'Permite que um usuário autenticado edite o destino de uma URL que ele encurtou.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID da URL a ser atualizada.',
    type: Number,
  })
  @ApiBody({ type: UpdateUrlDto, description: 'Nova URL original.' })
  @ApiResponse({
    status: 200,
    description: 'URL atualizada com sucesso.',
    type: UrlEntity,
  })
  @ApiResponse({ status: 401, description: 'Não autorizado.' })
  @ApiResponse({
    status: 404,
    description: 'URL não encontrada ou você não tem permissão para editá-la.',
  })
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('jwt'))
  async updateUrl(
    @Param('id') id: number,
    @Body() updateUrlDto: UpdateUrlDto,
    @Req() req: any,
  ) {
    const userId = req.user.id;
    const updatedUrl = await this.urlService.update(
      +id,
      updateUrlDto.originalUrl,
      userId,
    );

    if (!updatedUrl) {
      throw new NotFoundException(
        'URL not found or you do not have permission to update it.',
      );
    }
    return updatedUrl;
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Exclui (logicamente) uma URL encurtada.',
    description:
      'Apenas usuários autenticados podem excluir URLs que eles encurtaram. A exclusão é lógica.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID da URL a ser excluída.',
    type: Number,
  })
  @ApiResponse({
    status: 204,
    description: 'URL excluída logicamente com sucesso.',
  })
  @ApiResponse({ status: 401, description: 'Não autorizado.' })
  @ApiResponse({
    status: 404,
    description: 'URL não encontrada ou você não tem permissão para excluí-la.',
  })
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteUrl(@Param('id') id: number, @Req() req: any) {
    const userId = req.user.id;
    const removedUrl = await this.urlService.remove(+id, userId);

    if (!removedUrl) {
      throw new NotFoundException(
        'URL not found or you do not have permission to delete it.',
      );
    }
  }
}
