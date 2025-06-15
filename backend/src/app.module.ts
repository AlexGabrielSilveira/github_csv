import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GithubModule } from './github/github.module';
import { FileModule } from './file/file.module';
import { PrismaModule } from './prisma/prisma.module';
import { SocketGateway } from './socket/socket.gateway';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }),
    GithubModule, FileModule, PrismaModule],
    providers: [SocketGateway]
})
export class AppModule {}
