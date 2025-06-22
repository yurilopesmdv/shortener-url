import { Module } from '@nestjs/common';
import { RedirectController } from './redirect.controller';
import { UrlService } from '../url/url.service';

@Module({
  imports: [],
  controllers: [RedirectController],
  providers: [UrlService],
})
export class RedirectModule {}
