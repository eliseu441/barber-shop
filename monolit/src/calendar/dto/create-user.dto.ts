import { IsNotEmpty, IsEmail, MinLength } from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty({ message: 'Name should not be empty' })
    name: string;

    @IsEmail({}, { message: 'Email must be a valid email address' })
    @IsNotEmpty({ message: 'Email should not be empty' })
    email: string;

    @IsNotEmpty({ message: 'Password should not be empty' })
    @MinLength(1, { message: 'Password should not be empty' })
    password: string;

    permission?: number; // Permissão é opcional, com valor padrão 2
}