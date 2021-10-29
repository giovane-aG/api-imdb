import validator from 'validator';
import { hash } from 'bcrypt';

export class AdminService {
  private readonly userRepository;

  constructor (userRepository) {
    this.userRepository = userRepository;
  }

  async createAdmin (admin) {
    const { name, email, password } = admin;

    if (!name) throw new Error('Name is required');
    if (!email) throw new Error('Email is required');
    if (!password) throw new Error('Password is required');
    
    if (typeof name !== 'string') throw new Error('Name is invalid');
    if (!validator.isEmail(email)) throw new Error('Email is invalid');

    const user = await this.userRepository.findOne({ email });

    if (user) throw new Error('This email is already in use');

    const newAdmin = this.userRepository.create({
      name,
      email,
      password: await hash(password.toString(), 8),
      isAdmin: true
    });

    await this.userRepository.save(newAdmin);

    delete newAdmin.password;
    delete newAdmin.isAdmin;

    return newAdmin;
  }
}