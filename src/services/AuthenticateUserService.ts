import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { getRepository } from 'typeorm';

class AuthenticateUserService {
  private userRepository;

  constructor (userRepository) {
    this.userRepository = userRepository
  }

  async execute(email, password) {

    if (!email || !password) throw new Error("Email or password not provided");

    const user = await this.userRepository.findOne({ email });

    if (!user) throw new Error("Invalid Email/Password");

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) throw new Error("Invalid Email/Password");

    const token = sign({
      email: user.email
    }, 'e8dbb935ad562a610e80cba5da372521', {
      subject: user.id,
      expiresIn: "1d"
    });

    return token;
  }
}

export default AuthenticateUserService;