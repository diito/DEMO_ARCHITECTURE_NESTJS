import { Module, DynamicModule } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { DATABASE } from '@enterprise/config'

const mongooseModule = MongooseModule.forRoot(DATABASE.MONGO.URI, { useCreateIndex: true, useNewUrlParser: true })

@Module({
    imports: [mongooseModule],
    exports: [mongooseModule]
})
export class MongoDbModule {
    
    static forFeature(models?: {
        name: string;
        schema: any;
        collection?: string;
    }[], connectionName?: string): DynamicModule { return MongooseModule.forFeature(models, connectionName) }
}