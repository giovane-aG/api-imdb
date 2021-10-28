import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { TOKEN_KEY } from "../../token_key";

class AuthenticateUserService {
  private userRepository;

  constructor (userRepository) {
    this.userRepository = userRepository
  }

  async execute(email, password) {

    if (!email || !password) throw new Error("Email or password not provided");

    const user = await this.userRepository.findOne({ email });

    if (!user) throw new Error("Invalid Email/Password");

    const passwordMatched = await compare(password.toString(), user.password);

    if (!passwordMatched) throw new Error("Invalid Email/Password");

    const user_id = user.id.toString()

    const token = sign({
      email: user.email
    }, TOKEN_KEY, {
      subject: user_id,
      expiresIn: "1d"
    });

    return token;
  }
}

export default AuthenticateUserService;