import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GithubModule } from './github/github.module';
import { FileModule } from './file/file.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true
  }), GithubModule, FileModule, PrismaModule],
})
export class AppModule {}
