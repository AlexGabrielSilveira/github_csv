import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { FileDto } from "./dto/file.dto";

@Injectable()
export class FileService {
    constructor(private readonly prismaService: PrismaService) {}
    async uploadFile(fileDtos: FileDto[]) {

       await this.prismaService.repositories.createMany({
            data: fileDtos
       })
       return { message: "Importação concluída com sucesso!"};
    }   

}