import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { FileDto } from "./dto/file.dto";
import { IMPORT_QUEUE } from "src/config";
import { ClientProxy } from "@nestjs/microservices";
import { SocketGateway } from "src/socket/socket.gateway";

@Injectable()
export class FileService {
    constructor(
        @Inject(IMPORT_QUEUE) private client: ClientProxy,
        private readonly socketGateway: SocketGateway

    ) {}
    async uploadFile(fileDtos: FileDto[]) {
        const validFiles = fileDtos.filter(file => file.username + 'repos'.toLowerCase().endsWith('.csv'))

        if(validFiles.length > 0) {this.socketGateway.notifyClientJobFinished('Importação concluída!');;} else { return this.socketGateway.notifyClientImportFailed('Erro na importação!') }
        return this.client.emit('files', fileDtos)
    }   

}