import { Injectable } from '@nestjs/common'
import { Client, ClientTCP, Transport } from '@nestjs/microservices'
import { CLIENTS } from '@enterprise/config'
import { Observable } from 'rxjs'

@Injectable()
export class MailingService {
    @Client({ transport: Transport.TCP, options: { host: CLIENTS.MAILING.HOST, port: CLIENTS.MAILING.PORT } })
    private readonly client: ClientTCP

    sendMessageRecoveryPassword(any: any): Observable<any> { return this.client.send<any>({ action: 'send-message-recovery-password', type: 'send' }, any) }
    sendMessageCreateAccount(any: any): Observable<any> { return this.client.send<any>({ action: 'send-message-create-account', type: 'send' }, any) }
    
}