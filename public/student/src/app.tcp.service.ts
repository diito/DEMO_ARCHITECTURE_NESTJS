/// <reference path="./models/interfaces/student.interface.d.ts" />

import { Injectable, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { LoggerService } from '@enterprise/logger';
import { Model } from 'mongoose';
import { from, throwError, of } from 'rxjs';
import { concatMap, tap} from 'rxjs/operators';
import { MODULE, MESSAGE } from './app.constant';
import { ObjectId } from 'mongodb';

@Injectable()
export class AppTcpService {

  constructor(
    @InjectModel(MODULE.STUDENT) private readonly studentModel: Model<Student>,
    private readonly loggerService : LoggerService
  ) {}
  
  validateEmail(email){
    return from(this.studentModel.findOne({ email: email })).pipe(
      concatMap(student => {
        if(student == null)
          return throwError(new ConflictException(MESSAGE.CONFLICT_EXCEPTION.VALIDATE_EMAIL) );

        return of(student)
      })
    )
  }

  validateCredentials(dto){
    if(dto.idFacebook == undefined)
      return this.validateCreadentialWithEmailAndPassword(dto.email, dto.password);
    
    return this.validateCreadentialWithFacebook(dto.idFacebook);
  }

  passwordChangue(dto){
    return from(this.studentModel.findOne({ email: dto.email })).pipe(
      concatMap(student => {
        if(student == null)
          return throwError(new ConflictException(MESSAGE.CONFLICT_EXCEPTION.VALIDATE_EMAIL) );

        return from(this.studentModel.findOneAndUpdate({ email: dto.email }, { $set: { password: dto.password } }, { new: true }))
      }),
      concatMap(() => of({ message: MESSAGE.OPERATION_RESULT.CHANGUE_PASSWORD }))
    )
  }

  private validateCreadentialWithEmailAndPassword = (email, password) => {
    return from(this.studentModel.findOne({ email, password })).pipe(
      concatMap(student => {
        if(student == null) 
          return throwError(new ConflictException(MESSAGE.CONFLICT_EXCEPTION.VALIDATE_CREDENTIAL_WITH_EMAIL_PASSWORD) );

        return of(student)
      })
    )
  }

  private validateCreadentialWithFacebook = (idFacebook) => {
    return from(this.studentModel.findOne({ idFacebook })).pipe(
      concatMap(student => {
        if(student == null) 
          return throwError(new ConflictException(MESSAGE.CONFLICT_EXCEPTION.VALIDATE_CREDENTIAL_WITH_FACEBOOK) );

        return of(student)
      })
    )
  }

}
