import { TOKEN_KEY } from "../../token_key";

class AuthenticateUserService {
  private userRepository;
  private bcrypt;
  private jsonwebtoken;

  constructor ({ userRepository, bcrypt, jsonwebtoken }) {
    this.userRepository = userRepository;
    this.bcrypt = bcrypt;
    this.jsonwebtoken = jsonwebtoken;
  }

  async execute(email, password) {

    if (!email || !password) throw new Error("Email or password not provided");

    const user = await this.userRepository.findOne({ email });

    if (!user) throw new Error("Invalid Email/Password");

    const passwordMatched = await this.bcrypt.compare(password.toString(), user.password);

    if (!passwordMatched) throw new Error("Invalid Email/Password");

    const user_id = user.id.toString()

    const token = this.jsonwebtoken.sign({
      email: user.email
    }, TOKEN_KEY, {
      subject: user_id,
      expiresIn: "1d"
    });

    return token;
  }
}

export default AuthenticateUserService;