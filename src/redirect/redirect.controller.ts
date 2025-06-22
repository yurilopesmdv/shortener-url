import {
  Controller,
  Get,
  Param,
  Redirect,
  NotFoundException,
  HttpStatus,
} from '@nestjs/common';
import { UrlService } from '../url/url.service';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@Controller()
export class RedirectController {
  constructor(private readonly urlService: UrlService) {}

  @Get(':shortCode')
  @ApiOperation({
    summary: 'Redireciona um código curto para a URL original.',
    description:
      'Contabiliza um clique e redireciona o navegador para a URL original.',
  })
  @ApiParam({
    name: 'shortCode',
    description: 'O código curto da URL a ser redirecionada.',
    example: 'N6noQN',
  })
  @ApiResponse({
    status: 301,
    description: 'Redirecionamento bem-sucedido para a URL original.',
  })
  @ApiResponse({ status: 404, description: 'URL não encontrada ou excluída.' })
  @Redirect()
  async redirectToOriginalUrl(@Param('shortCode') shortCode: string) {
    const url = await this.urlService.findOne(shortCode);

    if (!url || url.deletedAt !== null) {
      throw new NotFoundException('URL not found or has been deleted.');
    }

    return { url: url.originalUrl, statusCode: HttpStatus.MOVED_PERMANENTLY };
  }
}
