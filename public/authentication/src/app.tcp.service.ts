import { Injectable, Inject } from '@nestjs/common';

import { StudentService } from '@enterprise/client-student';

@Injectable()
export class AppTcpService {
  
  constructor(
    private readonly clientStudent : StudentService
  ) {}

}
