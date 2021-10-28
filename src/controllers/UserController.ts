
class UserController {
  private userServices;

  constructor(userServices) {
    this.userServices = userServices;
  }
  
  async createUser(request, response) {
    try {

      const { name, email, password } = request.body;
  
      const user = await this.userServices.createUser({
        name,
        email,
        password,
      });
  
      return response.status(201).json(user);

    } catch(error) {

      return response.status(400).json({
        message: error.message,
      });
    }
  }
}

export default UserController;