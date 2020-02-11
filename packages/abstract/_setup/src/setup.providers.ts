import { Provider } from '@nestjs/common';

import { ErrorFilter } from './filters/error.filter';

export const setupProviders: Array<Provider> = [
    {
        provide: ErrorFilter,
        useClass: ErrorFilter
    }
]