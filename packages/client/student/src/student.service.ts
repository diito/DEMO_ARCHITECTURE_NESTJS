import { Injectable } from '@nestjs/common'
import { Client, ClientTCP, Transport } from '@nestjs/microservices'
import { CLIENTS } from '@enterprise/config'
import { Observable } from 'rxjs'

@Injectable()
export class StudentService {
    @Client({ transport: Transport.TCP, options: { host: CLIENTS.STUDENT.HOST, port: CLIENTS.STUDENT.PORT } })
    private readonly client: ClientTCP

    validationEmail(any: any): Observable<any> { return this.client.send<any>({ action: 'validate-email', type: 'find' }, any) }
    validationCredentials(any: any): Observable<any> { return this.client.send<any>({ action: 'validate-credentials', type: 'find' }, any) }
    passwordChangue(any: any): Observable<any> { return this.client.send<any>({ action: 'password-changue', type: 'update' }, any) }

}