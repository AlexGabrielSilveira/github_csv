import { Controller } from "@nestjs/common";
import { EventPattern, Payload } from "@nestjs/microservices";
import { PrismaService } from "src/prisma/prisma.service";
import { SocketGateway } from "src/socket/socket.gateway";
import { FileDto } from "./dto/file.dto";

@Controller()
export class FileConsumer {
    constructor(private readonly prisma: PrismaService, private readonly socketGateway: SocketGateway){ }

    @EventPattern('files')
    async handleFile(@Payload() files: FileDto[]) {
            await this.prisma.repositories.createMany({ data: files });
    }
}