import { Controller } from "@nestjs/common";
import { EventPattern, Payload } from "@nestjs/microservices";
import { PrismaService } from "src/prisma/prisma.service";
import { SocketGateway } from "src/socket/socket.gateway";

@Controller()
export class FileConsumer {
    constructor(private readonly prisma: PrismaService, private readonly socketGateway: SocketGateway){ }

    @EventPattern('files')
    async handleFile(@Payload() files: []) {
        await this.prisma.repositories.createMany({ data: files });
        return this.socketGateway.notifyClient('Importação concluída!');
    }
}