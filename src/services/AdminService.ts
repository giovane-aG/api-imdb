
export class AdminService {
  private userRepository;
  private bcrypt;
  private validator;

  constructor ({ userRepository, bcrypt, validator }) {
    this.userRepository = userRepository;
    this.bcrypt = bcrypt;
    this.validator = validator;
  }


  async createAdmin (admin) {
    const { name, email, password } = admin;

    if (!name) throw new Error('Name is required');
    if (!email) throw new Error('Email is required');
    if (!password) throw new Error('Password is required');
    
    if (typeof name !== 'string') throw new Error('Name is invalid');
    if (!this.validator.isEmail(email)) throw new Error('Email is invalid');

    const user = await this.userRepository.findOne({ email });

    if (user) throw new Error('This email is already in use');

    const newAdmin = this.userRepository.create({
      name,
      email,
      password: await this.bcrypt.hash(password.toString(), 8),
      isAdmin: true
    });

    await this.userRepository.save(newAdmin);

    delete newAdmin.password;
    delete newAdmin.isAdmin;

    return newAdmin;
  }

  async updateAdmin (admin) {
    const { id, name, email, password} = admin;

    if (typeof name !== 'string') throw new Error('Name is invalid');
    if (email && !this.validator.isEmail(email)) throw new Error('Email is invalid');

    let updatedAdmin: any = {};

    if (name) updatedAdmin.name = name;
    if (email) updatedAdmin.email = email;
    if (password) updatedAdmin.password = await this.bcrypt.hash(password.toString(), 8);

    const user = await this.userRepository.findOne({ id });

    if (!user) throw new Error('User does not exists');

    await this.userRepository.update(id, {...updatedAdmin});
  }
}