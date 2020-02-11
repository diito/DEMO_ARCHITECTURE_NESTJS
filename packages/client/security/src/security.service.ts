import { Injectable } from '@nestjs/common'
import { Client, ClientTCP, Transport } from '@nestjs/microservices'
import { CLIENTS } from '@enterprise/config'
import { Observable } from 'rxjs'

@Injectable()
export class SecurityService {
    @Client({ transport: Transport.TCP, options: { host: CLIENTS.SECURITY.HOST, port: CLIENTS.SECURITY.PORT } })
    private readonly client: ClientTCP

    createToken(any: any): Observable<any> { return this.client.send<any>({ action: 'create-token', type: 'create' }, any) }
    logout(any: any): Observable<any> { return this.client.send<any>({ action: 'logout', type: 'update' }, any) }
    verifyToken(any: any): Observable<any> { return this.client.send<any>({ action: 'verify-token', type: 'find'}, any) }
    
}