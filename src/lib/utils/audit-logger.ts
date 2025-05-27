// src/lib/utils/audit-logger.ts
// Import commented out until the authLog table is added to the schema
// import { db } from "@/lib/db";

export enum EventType {
  LOGIN_SUCCESS = "LOGIN_SUCCESS",
  LOGIN_FAILURE = "LOGIN_FAILURE",
  LOGOUT = "LOGOUT",
  REGISTRATION = "REGISTRATION",
  PASSWORD_RESET_REQUEST = "PASSWORD_RESET_REQUEST",
  PASSWORD_RESET_SUCCESS = "PASSWORD_RESET_SUCCESS",
  EMAIL_VERIFICATION = "EMAIL_VERIFICATION",
  ACCOUNT_LOCKED = "ACCOUNT_LOCKED",
  ACCOUNT_UNLOCKED = "ACCOUNT_UNLOCKED",
  TWO_FACTOR_ENABLED = "TWO_FACTOR_ENABLED",
  TWO_FACTOR_DISABLED = "TWO_FACTOR_DISABLED",
  TWO_FACTOR_CHALLENGE = "TWO_FACTOR_CHALLENGE",
  MAGIC_LINK_REQUESTED = "MAGIC_LINK_REQUESTED",
  MAGIC_LINK_USED = "MAGIC_LINK_USED"
}

export interface AuditLogData {
  userId?: string;
  email?: string;
  ip?: string;
  userAgent?: string;
  metadata?: Record<string, unknown>;
}

/**
 * Logs an authentication-related event to the database
 * 
 * @param eventType The type of event being logged
 * @param data Additional data about the event
 * @returns Promise that resolves when the log entry is created
 */
export async function logAuthEvent(eventType: EventType, data: AuditLogData): Promise<void> {
  try {
    const { userId, email, ip, userAgent, metadata } = data;
    
    // Log to console for now since the authLog table might not be in the schema yet
    console.log("Auth Event:", {
      eventType,
      userId,
      email,
      ip,
      userAgent,
      metadata,
      timestamp: new Date()
    });
    
    // Commented out until the authLog table is added to the Prisma schema
    /*
    await db.authLog.create({
      data: {
        eventType: eventType as string,
        userId,
        email,
        ip,
        userAgent,
        metadata: metadata ? JSON.stringify(metadata) : null,
        timestamp: new Date()
      }
    });
    */
    
    // You could also send critical security events to an external monitoring service
    if ([
      EventType.ACCOUNT_LOCKED,
      EventType.LOGIN_FAILURE,
      EventType.PASSWORD_RESET_REQUEST
    ].includes(eventType)) {
      await notifySecurityTeam(eventType, data);
    }
  } catch (err) {
    // Log to your server logs but don't throw - we don't want auth to fail if logging fails
    console.error("Failed to log auth event:", err);
  }
}

/**
 * For critical security events, notify the security team
 * This could be implemented as an email, Slack message, or integration with a SIEM system
 */
async function notifySecurityTeam(eventType: EventType, data: AuditLogData): Promise<void> {
  // Implementation depends on your notification system
  // This is a placeholder for the actual implementation
  console.log(`SECURITY ALERT: ${eventType}`, data);
  
  // Example: You could send an email to the security team
  // await sendEmail({
  //   to: 'security@example.com',
  //   subject: `Security Alert: ${eventType}`,
  //   body: `Event details: ${JSON.stringify(data)}`
  // });
}

/**
 * Gets the client IP address from the request
 */
export function getClientIp(request: Request): string {
  // Try to get from headers first (in case of proxies)
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    // Take the first IP in case of multiple proxies
    return forwardedFor.split(',')[0].trim();
  }
  
  // Fallback to connection info
  return 'unknown';
}

/**
 * Gets the user agent from the request
 */
export function getUserAgent(request: Request): string {
  return request.headers.get('user-agent') || 'unknown';
}
