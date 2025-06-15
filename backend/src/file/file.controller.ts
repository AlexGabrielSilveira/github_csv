import { Body, Controller, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileService } from "./file.service";
import { FileDto } from "./dto/file.dto";

@Controller('file')
export class FileController {
    constructor(private readonly fileService: FileService) {}

    @Post('upload')
    async uploadFile(@Body() files: FileDto[]) {
        return await this.fileService.uploadFile(files)
    }
}