declare module 'speakeasy' {
  export function generateSecret(options?: {
    length?: number;
    name?: string;
    issuer?: string;
    symbols?: boolean;
  }): {
    ascii: string;
    hex: string;
    base32: string;
    otpauth_url: string;
  };

  export const totp: {
    generate: (options: {
      secret: string;
      encoding?: 'ascii' | 'hex' | 'base32';
      algorithm?: 'sha1' | 'sha256' | 'sha512';
      time?: number;
      step?: number;
      digits?: number;
      window?: number;
    }) => {
      token: string;
    };
    verify: (options: {
      secret: string;
      encoding?: 'ascii' | 'hex' | 'base32';
      token: string;
      algorithm?: 'sha1' | 'sha256' | 'sha512';
      time?: number;
      step?: number;
      window?: number;
      digits?: number;
    }) => boolean;
  };

  export function time(options: {
    secret: string;
    encoding?: 'ascii' | 'hex' | 'base32';
    algorithm?: 'sha1' | 'sha256' | 'sha512';
    time?: number;
    step?: number;
    window?: number;
    digits?: number;
  }): {
    token: string;
  };

  export function totp_verify(options: {
    secret: string;
    encoding?: 'ascii' | 'hex' | 'base32';
    token: string;
    algorithm?: 'sha1' | 'sha256' | 'sha512';
    time?: number;
    step?: number;
    window?: number;
    digits?: number;
  }): boolean;
}
