export const ERRORS_NEXT_AUTH = {
  Signin: 'Try signing with a different account.',
  OAuthSignin: 'Try signing with a different account.',
  OAuthCallback: 'Try signing with a different account.',
  OAuthCreateAccount: 'Try signing with a different account.',
  EmailCreateAccount: 'Try signing with a different account.',
  EmailAlready: 'There is already a user with the email entered.',
  Callback: 'Try signing with a different account.',
  OAuthAccountNotLinked:
    'To confirm your identity, sign in with the same account you used originally.',
  EmailSignin: 'Check your email address.',
  CredentialsSignin:
    'Error de inicio de sesión. Comprueba que los datos que has facilitado sean correctos.',
  Default: 'Ops!, ocurrio algo inesperado, intente nuevamente.',
  tenantNotAllowed:
    'EL correo ingresado no es un correo institucional de la pontificia',
  facebookNotProvider:
    'Tu cuenta de facebook aun no esta vinculado a una cuenta institucional'
}

export const COLOR_THEMES = [
  'red',
  'orange',
  'yellow',
  'green',
  'blue',
  'purple',
  'indigo'
] as const

export const CAREERS = {
  EIS: 'Escuela de Ingeniería en Sistemas',
  EAE: 'Escuela de Administración de Empresas',
  ECF: 'Escuela de Ciencias de Contabilidad y Finanzas',

  IAE: 'Aministración de Empresas',
  IET: 'Enfermeria Técnica',
  ICT: 'Contabilidad Técnica',
  DOC: 'Docente',
  undefined: 'Undefined'
}
