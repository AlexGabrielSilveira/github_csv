import { WebSocketGateway, WebSocketServer, } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ cors: true }) 
export class SocketGateway {
  @WebSocketServer()
  server: Server;

  notifyClientJobFinished(message: string) {
    this.server.emit('job_finished', { message });
  }
  notifyClientImportFailed(message: string) {
    this.server.emit('import_failed', { message });
  }
}
