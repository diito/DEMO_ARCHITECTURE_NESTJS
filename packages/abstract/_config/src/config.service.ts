import { Injectable, OnModuleInit } from '@nestjs/common'
import { get, has } from 'config'
import { parse } from 'dotenv'
import { join } from 'path'
import { existsSync, readFileSync } from 'fs'
 
@Injectable()
export class ConfigService implements OnModuleInit {
 
    private envConfig: EnvOptions = {}
 
    constructor (private readonly filePath?: string) {}
 
    onModuleInit() {
        const fullPath = join(process.cwd(), this.filePath || '')
        if (existsSync(fullPath))
            this.envConfig = parse(readFileSync(fullPath))
    }
 
    get(key: string, defaultValue?: string): string {
        this.checkKey(key)
        return this.envConfig[key.replace(/-/gi, '_').replace(/\./gi, '_').toUpperCase()] || this.getFromEnvironment(key) || this.getUsingConfigPackage<string>(key.replace(/_/gi, '.').toLowerCase()) || defaultValue
    }
 
    getFromEnvironment(key: string, defaultValue?: string): string {
        return ConfigService.getFromEnvironment(key.replace(/-/gi, '_').replace(/\./gi, '_').toUpperCase(), defaultValue) 
    }
 
    getUsingConfigPackage<T>(key: string, defaultValue?: T): T {
        return ConfigService.getUsingConfigPackage<T>(key.replace(/_/gi, '.').toLowerCase(), defaultValue)
    }
 
    static get<T>(key: string, defaultValue?: T): T {
        return (ConfigService.getFromEnvironment(key.replace(/-/gi, '_').replace(/\./gi, '_').toUpperCase()) || ConfigService.getUsingConfigPackage<string>(key.replace(/_/gi, '.').toLowerCase()) || defaultValue) as T
    }
 
    static getFromEnvironment(key: string, defaultValue?: string): string {
        return process.env[key.replace(/-/gi, '_').replace(/\./gi, '_').toUpperCase()] || defaultValue
    }
 
    static getUsingConfigPackage<T>(key: string, defaultValue?: T): T {
        return (has(key) ? get<T>(key.replace(/_/gi, '.').toLowerCase()) : null) || defaultValue
    }
 
    private checkKey(key: string) {
        if (!key)
            throw new Error(`configuration key must have a value`)
    }
}