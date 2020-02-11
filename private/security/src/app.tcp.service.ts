/// <reference path="./models/interfaces/security.interface.d.ts" />

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { ObjectId } from 'mongodb';
import { from, of, forkJoin } from 'rxjs';
import { concatMap, map } from 'rxjs/operators';
import * as moment from 'moment'

import { MODULE } from './app.constant';
import { JwtService } from './jwt/jwt.service';

@Injectable()
export class AppTcpService {
  
  constructor(
    private readonly jwtService: JwtService,
    @InjectModel(MODULE.SECURITY) private readonly securityModel: Model<Security>,
  ) {}

  /** @function 
   * Create token or Update the for user register in database
   * @param dto
   */
  createToken(dto) {

    const token = this.jwtService.createToken({ 
      idUser: dto._id, 
      firstName: dto.firstName, 
      lastName: dto.lastName 
    })

    const securityObservable = from(this.securityModel.findOne(
      { "user.idUser": new ObjectId(dto._id) },
      { tokens: 1 }))


    return forkJoin(securityObservable).pipe(
      concatMap(([security]) => {
        if(security == null)
          return this.create(dto, token)
        
        return this.update(security, token)
      }),
      concatMap(() => {
        return of({ token })
      })
    )
  }

  /**
   * 
   */
  logout(dto){
    return from(this.securityModel.findOneAndUpdate(
      { "user.idUser": new ObjectId(dto.idUser) }, 
      { 
        $set: {
          token: "", 
          tokenfcm: ""
        }
      })
    )
  }

  verifyToken(token: string){
    return from(this.securityModel.findOne({ token: token }, { token: 1 }).exec()).pipe(
        concatMap(result => {
            return of({ 
              data: (result == null) ? "" : token 
            })
        })
    )
}

  /** @function 
  * Create token for all user register in database
  * @param newSecurity
  * @param token
  */
  private create = (newSecurity, token) => {

    let auditProperties = {
      idAudit: new ObjectId(),
      userCreate: "User Create"
    }

    const createSecurity = new this.securityModel({
      user: {
        idUser: new ObjectId(newSecurity._id),
        firstName: newSecurity.firstName,
        lastName: newSecurity.lastName,
      },
      token: token,
      tokenfcm: token,
      auditProperties
    });

    return from(createSecurity.save())

  }
  
  /** @function 
  * Update token for all user register in database
  * @param oldSecurity
  * @param token
  */
  private update = (oldSecurity, token) => {

    return from(this.securityModel.findOneAndUpdate(
      { _id: oldSecurity._id }, 
      { 
        $set: {
          token: token, 
          tokenfcm: token, 
          "auditProperties.userUpdate": "User Update",
          "auditProperties.dateUpdate": moment.utc().clone()
        }
      })
    )
  }

}