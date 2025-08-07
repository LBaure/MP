import { z } from 'zod'

export const userUpdateSchema = z.object({
  firstName: z.string().max(100).optional(),
  lastName: z.string().max(100).optional(),
  identityNumber: z.string().max(50).optional(),
  email: z.string().email().max(150).optional(),
  address: z.string().max(255).optional(),
  phoneNumber: z.string().max(20).optional(),
  deletedAt: z.string().datetime().nullable().optional(),
  isActive: z.boolean().optional(),
  isVerified: z.boolean().optional(),
  isBlocked: z.boolean().optional(),
  isSuspended: z.boolean().optional(),
  isBanned: z.boolean().optional(),
  isLocked: z.boolean().optional(),
  isDisabled: z.boolean().optional(),
  isExpired: z.boolean().optional(),
  isPending: z.boolean().optional(),
  isRegistered: z.boolean().optional(),
  isAuthenticated: z.boolean().optional(),
  isAuthorized: z.boolean().optional(),
  isAuthenticatedByToken: z.boolean().optional()
})
