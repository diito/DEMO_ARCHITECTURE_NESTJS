import { Injectable, BadRequestException } from '@nestjs/common';

import { AdministratorService } from '@enterprise/client-administrator';
import { SecurityService } from '@enterprise/client-security';
import { StudentService } from '@enterprise/client-student';
import { MailingService } from '@enterprise/client-mailing';

import { Observable, of, throwError, from } from 'rxjs';
import { map, concatMap, tap } from 'rxjs/operators';

import { TYPE_USER } from './app.constant';

@Injectable()
export class AppHttpService { 
  
  constructor(
    //private readonly clientAdmin : AdministratorService,
    private readonly clientService : SecurityService,
    private readonly clientStudent : StudentService,
    private readonly clientMailing : MailingService
  ) { }

  login(typeUser, dto):Observable<any> {

    switch (typeUser) {
      case TYPE_USER.ADMIN:
        return this.loginForAdmin(dto);
      
      case TYPE_USER.STUDENT:
        return this.loginForStudent(dto);
        
      default:
        return throwError( new BadRequestException("No exíste ningun login para este tipo de usuario."));
    }

  }

  logout(token): Observable<any> {
    const decode = JSON.parse(token)
    return this.clientService.logout({ idUser: decode["idUser"] })
  }
  
  passwordRecovery(email): Observable<any> {
    return this.clientStudent.validationEmail(email).pipe(
      tap(student => this.clientMailing.sendMessageRecoveryPassword({ ...student }))
    )
  }

  passwordChangue(email, password): Observable<any> {
    return this.clientStudent.passwordChangue({ email, password })
  }

  private loginForStudent = (data) => {
    return this.clientStudent.validationCredentials(data).pipe(
      concatMap(student => this.clientService.createToken({ ...student }))
    )
  }

  private loginForAdmin = (data) => {
    return this.clientStudent.validationCredentials(data).pipe(
      concatMap(student => this.clientService.createToken({ ...student }))
    )
  }
  
}