import  { hash } from 'bcrypt';
import  validator  from 'validator';

export class UserService {
  private userRepository;

  constructor (userRepository) {
    this.userRepository = userRepository
  }

  async createUser(user) {
    const { name, email, password } = user;

    if (!name) throw new Error('Name is required');
    if (!email) throw new Error('Email is required');
    if (!password) throw new Error('Password is required');
    
    if (typeof name !== 'string') throw new Error('Name is invalid');
    if (!validator.isEmail(email)) throw new Error('Email is invalid');

    const userExists = await this.userRepository.findOne({ email });

    if (userExists) throw new Error('User already exists');

    const hashedPassword = await hash(password.toString(), 8);

    const newUser = this.userRepository.create({
      name,
      email,
      password: hashedPassword
    });

    await this.userRepository.save(newUser);
    delete newUser.password;

    return newUser;
  }
}