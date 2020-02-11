/// <reference path="./models/interfaces/student.interface.d.ts" />

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { MODULE } from './app.constant';
import { from } from 'rxjs';
import { ObjectId } from 'mongodb';

@Injectable()
export class AppHttpService { 
  
  constructor(
    @InjectModel(MODULE.STUDENT) private readonly studentModel: Model<Student>,
  ) {}

  findStudent(){

    let auditProperties = {
      idAudit: new ObjectId(),
      userCreate: "User Create"
    }
    
    const createdPost = new this.studentModel({
      firstName: "dto.firstName",
      lastName: "dto.lastName",
      email: "dto.email",
      dni: "dto.dni",
      password: "dto.password",
      auditProperties
    });

    return from(createdPost.save())
  }
}