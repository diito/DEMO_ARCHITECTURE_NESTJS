import { UseGuards } from '@nestjs/common'
import { SecurityGuard } from '../guards/security.guard'

export const UseSecurityGuard = () => UseGuards(SecurityGuard)