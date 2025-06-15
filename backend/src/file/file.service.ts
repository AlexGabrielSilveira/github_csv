import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { FileDto } from "./dto/file.dto";
import { IMPORT_QUEUE } from "src/config";
import { ClientProxy } from "@nestjs/microservices";

@Injectable()
export class FileService {
    constructor(
        @Inject(IMPORT_QUEUE) private client: ClientProxy

    ) {}
    async uploadFile(fileDtos: FileDto[]) {
        this.client.emit('files', fileDtos)
        return { message: 'Importação enviada para processamento!'}
    }   

}