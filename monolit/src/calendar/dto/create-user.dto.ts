export class CreateUserDto {
    name: string;
    email: string;
    password: string;
    permission?: number; // Permissão é opcional, com valor padrão 2
  }