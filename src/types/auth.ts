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
