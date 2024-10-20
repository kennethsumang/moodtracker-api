export interface AuthLoginBody {
  email: string;
  password: string;
}

export interface AuthRegisterBody {
  name: string;
  email: string;
  password: string;
  retypePassword: string;
}

export interface JwtData {
  id: string;
  email: string;
  name: string;
  settings: {
    id: string;
    userId: string;
    timezone: string;
  };
}
