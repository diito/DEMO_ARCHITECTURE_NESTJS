import { Injectable } from '@nestjs/common'
import { Client, ClientTCP, Transport } from '@nestjs/microservices'
import { CLIENTS } from '@enterprise/config'
import { Observable } from 'rxjs'

@Injectable()
export class AdministratorService {
    @Client({ transport: Transport.TCP, options: { host: CLIENTS.ADMINISTRATOR.HOST, port: CLIENTS.ADMINISTRATOR.PORT } })
    private readonly client: ClientTCP

    validationCredentials(any: any): Observable<any> { return this.client.send<any>({ action: 'validate-credentials', type: 'find' }, any) }

}