import { Module } from "@nestjs/common";
import { FileController } from "./file.controller";
import { FileService } from "./file.service";
import { PrismaModule } from "src/prisma/prisma.module";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { IMPORT_QUEUE } from "src/config";
import { FileConsumer } from "./file.consumer";
import { SocketGateway } from "src/socket/socket.gateway";

@Module({
    imports: [PrismaModule, 
        ClientsModule.register([{
        name: IMPORT_QUEUE,
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://rabbitmq:5672'],
          queue: 'import_queue',
          queueOptions: {
            durable: false,
          },
        },
      }]),],
    controllers: [FileController, FileConsumer],
    providers: [FileService, SocketGateway],
})
export class FileModule {}