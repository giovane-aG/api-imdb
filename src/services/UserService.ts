
export class UserService {
  private userRepository;
  private bcrypt;
  private validator;

  constructor ({ userRepository, bcrypt, validator }) {
    this.userRepository = userRepository;
    this.bcrypt = bcrypt;
    this.validator = validator;
  }

  async createUser(user) {
    const { name, email, password } = user;

    if (!name) throw new Error('Name is required');
    if (!email) throw new Error('Email is required');
    if (!password) throw new Error('Password is required');
    
    if (typeof name !== 'string') throw new Error('Name is invalid');
    if (!this.validator.isEmail(email)) throw new Error('Email is invalid');

    const userExists = await this.userRepository.findOne({ email });

    if (userExists) throw new Error('User already exists');

    const hashedPassword = await this.bcrypt.hash(password.toString(), 8);

    const newUser = await this.userRepository.create({
      name,
      email,
      password: hashedPassword
    });

    await this.userRepository.save(newUser);
    delete newUser.password;

    return newUser;
  }

  async updateUser(user) {
    const { name, email, password, id } = user;

    if (typeof name !== 'string') throw new Error('Name is invalid');
    if (email && !this.validator.isEmail(email)) throw new Error('Email is invalid');
    
    let updatedUser: any = {};

    if (name) updatedUser.name = name;
    if (email) updatedUser.email = email;
    if (password) updatedUser.password = await this.bcrypt.hash(password.toString(), 8);

    const userExists = await this.userRepository.findOne({ id });

    if (!userExists) throw new Error('User does not exist');

    await this.userRepository.update(id, {...updatedUser});
  }

  async deleteUser(id) {
    const userExists = await this.userRepository.findOne({ id });

    if (!userExists) throw new Error('User does not exist');

    await this.userRepository.update(id, { active: false });
  }
}