// src/lib/i18n/messages.ts
export const messages = {
  en: {
    common: {
      error: "An error occurred",
      success: "Success",
      loading: "Loading...",
      continue: "Continue",
      back: "Back",
      submit: "Submit",
      cancel: "Cancel",
      or: "Or",
      and: "And",
      emailSent: "Email sent!",
      invalidEmail: "Please enter a valid email address",
      required: "This field is required",
      invalidInput: "Invalid input"
    },
    auth: {
      login: {
        title: "Sign in to your account",
        description: "Welcome back to FortressOS",
        emailLabel: "Email address",
        passwordLabel: "Password",
        submitButton: "Sign in",
        forgotPassword: "Forgot password?",
        noAccount: "Don't have an account?",
        signUp: "Sign up",
        magicLink: "Sign in with magic link",
        magicLinkContinue: "Or continue with magic link",
        twoFactorTitle: "Two-Factor Authentication",
        twoFactorDescription: "Enter the code from your authenticator app",
        twoFactorLabel: "Authentication Code",
        verifyButton: "Verify",
        invalidCredentials: "Invalid email or password",
        accountLocked: "Account locked. Try again in {minutes} minute(s).",
        verifyEmail: "Please verify your email before logging in",
        invalidTwoFactor: "Invalid two-factor code",
        magicLinkEmailSent: "Magic link sent! Check your email.",
        checkEmail: "Check your email"
      },
      register: {
        title: "Create an account",
        description: "Enter your information to get started",
        nameLabel: "Name",
        emailLabel: "Email address",
        passwordLabel: "Password",
        confirmPasswordLabel: "Confirm password",
        submitButton: "Create account",
        haveAccount: "Already have an account?",
        signIn: "Sign in",
        passwordRequirements: {
          length: "At least 8 characters",
          uppercase: "At least one uppercase letter",
          lowercase: "At least one lowercase letter",
          number: "At least one number",
          special: "At least one special character"
        },
        passwordMismatch: "Passwords do not match",
        emailInUse: "Email already in use",
        verificationSent: "Verification email sent!"
      },
      resetPassword: {
        title: "Reset your password",
        description: "Enter your email to receive a password reset link",
        emailLabel: "Email address",
        submitButton: "Send reset link",
        backToLogin: "Back to login",
        emailSent: "Password reset email sent if account exists!",
        newPasswordTitle: "Set new password",
        newPasswordDescription: "Enter your new password",
        newPasswordLabel: "New password",
        confirmPasswordLabel: "Confirm new password",
        submitNewPasswordButton: "Reset password",
        passwordResetSuccess: "Password reset successfully!",
        invalidResetLink: "Invalid or expired reset link"
      },
      verifyEmail: {
        title: "Verify your email",
        description: "Check your email for a verification link",
        resendButton: "Resend verification email",
        backToLogin: "Back to login",
        verificationSuccess: "Email verified successfully!",
        invalidVerificationLink: "Invalid or expired verification link"
      },
      twoFactor: {
        setupTitle: "Set up two-factor authentication",
        setupDescription: "Scan the QR code with your authenticator app",
        verifyTitle: "Verify two-factor authentication",
        verifyDescription: "Enter the code from your authenticator app",
        codeLabel: "Authentication code",
        verifyButton: "Verify code",
        enableButton: "Enable two-factor authentication",
        disableButton: "Disable two-factor authentication",
        setupSuccess: "Two-factor authentication enabled successfully!",
        disableSuccess: "Two-factor authentication disabled successfully!",
        invalidCode: "Invalid authentication code",
        backupCodesTitle: "Backup codes",
        backupCodesDescription: "Save these backup codes in a safe place",
        backupCodesInfo: "You can use each backup code once if you lose access to your authenticator app."
      },
      errors: {
        generic: "Something went wrong. Please try again.",
        userNotFound: "User not found",
        sessionExpired: "Your session has expired. Please sign in again.",
        unauthorized: "You are not authorized to access this resource.",
        accountLocked: "Account locked. Try again in {minutes} minute(s).",
        tooManyAttempts: "Too many failed attempts. Account locked for {minutes} minutes."
      }
    }
  },
  es: {
    common: {
      error: "Se produjo un error",
      success: "Éxito",
      loading: "Cargando...",
      continue: "Continuar",
      back: "Atrás",
      submit: "Enviar",
      cancel: "Cancelar",
      or: "O",
      and: "Y",
      emailSent: "¡Correo electrónico enviado!",
      invalidEmail: "Por favor ingrese una dirección de correo válida",
      required: "Este campo es obligatorio",
      invalidInput: "Entrada inválida"
    },
    auth: {
      login: {
        title: "Inicia sesión en tu cuenta",
        description: "Bienvenido de nuevo a FortressOS",
        emailLabel: "Correo electrónico",
        passwordLabel: "Contraseña",
        submitButton: "Iniciar sesión",
        forgotPassword: "¿Olvidaste tu contraseña?",
        noAccount: "¿No tienes una cuenta?",
        signUp: "Regístrate",
        magicLink: "Iniciar sesión con enlace mágico",
        magicLinkContinue: "O continúa con enlace mágico",
        twoFactorTitle: "Autenticación de dos factores",
        twoFactorDescription: "Ingresa el código de tu aplicación de autenticación",
        twoFactorLabel: "Código de autenticación",
        verifyButton: "Verificar",
        invalidCredentials: "Correo electrónico o contraseña inválidos",
        accountLocked: "Cuenta bloqueada. Intenta de nuevo en {minutes} minuto(s).",
        verifyEmail: "Por favor verifica tu correo antes de iniciar sesión",
        invalidTwoFactor: "Código de dos factores inválido",
        magicLinkEmailSent: "¡Enlace mágico enviado! Revisa tu correo.",
        checkEmail: "Revisa tu correo electrónico"
      },
      register: {
        title: "Crea una cuenta",
        description: "Ingresa tu información para empezar",
        nameLabel: "Nombre",
        emailLabel: "Correo electrónico",
        passwordLabel: "Contraseña",
        confirmPasswordLabel: "Confirmar contraseña",
        submitButton: "Crear cuenta",
        haveAccount: "¿Ya tienes una cuenta?",
        signIn: "Iniciar sesión",
        passwordRequirements: {
          length: "Al menos 8 caracteres",
          uppercase: "Al menos una letra mayúscula",
          lowercase: "Al menos una letra minúscula",
          number: "Al menos un número",
          special: "Al menos un carácter especial"
        },
        passwordMismatch: "Las contraseñas no coinciden",
        emailInUse: "El correo electrónico ya está en uso",
        verificationSent: "¡Correo electrónico de verificación enviado!"
      },
      resetPassword: {
        title: "Restablece tu contraseña",
        description: "Ingresa tu correo electrónico para recibir un enlace de restablecimiento de contraseña",
        emailLabel: "Correo electrónico",
        submitButton: "Enviar enlace de restablecimiento",
        backToLogin: "Volver al inicio de sesión",
        emailSent: "¡Correo electrónico de restablecimiento de contraseña enviado si la cuenta existe!",
        newPasswordTitle: "Establece una nueva contraseña",
        newPasswordDescription: "Ingresa tu nueva contraseña",
        newPasswordLabel: "Nueva contraseña",
        confirmPasswordLabel: "Confirmar nueva contraseña",
        submitNewPasswordButton: "Restablecer contraseña",
        passwordResetSuccess: "¡Contraseña restablecida con éxito!",
        invalidResetLink: "Enlace de restablecimiento inválido o expirado"
      },
      verifyEmail: {
        title: "Verifica tu correo electrónico",
        description: "Revisa tu correo electrónico para un enlace de verificación",
        resendButton: "Reenviar correo electrónico de verificación",
        backToLogin: "Volver al inicio de sesión",
        verificationSuccess: "¡Correo electrónico verificado con éxito!",
        invalidVerificationLink: "Enlace de verificación inválido o expirado"
      },
      twoFactor: {
        setupTitle: "Configura la autenticación de dos factores",
        setupDescription: "Escanea el código QR con tu aplicación de autenticación",
        verifyTitle: "Verifica la autenticación de dos factores",
        verifyDescription: "Ingresa el código de tu aplicación de autenticación",
        codeLabel: "Código de autenticación",
        verifyButton: "Verificar código",
        enableButton: "Habilitar autenticación de dos factores",
        disableButton: "Deshabilitar autenticación de dos factores",
        setupSuccess: "¡Autenticación de dos factores habilitada con éxito!",
        disableSuccess: "¡Autenticación de dos factores deshabilitada con éxito!",
        invalidCode: "Código de autenticación inválido",
        backupCodesTitle: "Códigos de respaldo",
        backupCodesDescription: "Guarda estos códigos de respaldo en un lugar seguro",
        backupCodesInfo: "Puedes usar cada código de respaldo una vez si pierdes acceso a tu aplicación de autenticación."
      },
      errors: {
        generic: "Algo salió mal. Por favor, inténtalo de nuevo.",
        userNotFound: "Usuario no encontrado",
        sessionExpired: "Tu sesión ha expirado. Por favor, inicia sesión de nuevo.",
        unauthorized: "No estás autorizado para acceder a este recurso.",
        accountLocked: "Cuenta bloqueada. Intenta de nuevo en {minutes} minuto(s).",
        tooManyAttempts: "Demasiados intentos fallidos. Cuenta bloqueada por {minutes} minutos."
      }
    }
  }
}