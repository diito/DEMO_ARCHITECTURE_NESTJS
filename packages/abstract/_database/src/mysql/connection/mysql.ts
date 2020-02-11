import { Module, DynamicModule, Global } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { TypeOrmModule } from '@nestjs/typeorm'

import { DATABASE } from '@enterprise/config'

import { Connection, ConnectionOptions } from 'typeorm'

const typeormModule = TypeOrmModule.forRoot({ ...DATABASE.MYSQL.CONFIGURATION })

@Global()
@Module({
    imports: [typeormModule],
    exports: [typeormModule]
})
export class AuroraDbModule {
    
    static forRoot(items: Array<Function>, connection?: Connection | ConnectionOptions | string): DynamicModule {
        const modules = [ TypeOrmModule.forFeature(items, connection) ]
        return {
            module: AuroraDbModule,
            imports: modules,
            exports: modules
        }
    }

    static forFeature(items: Array<Function>, connection?: Connection | ConnectionOptions | string): DynamicModule {
        return TypeOrmModule.forFeature(items, connection)
    }
}