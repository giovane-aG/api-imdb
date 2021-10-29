

export class AuthenticateUserController {
  private authenticateUserService;

  constructor(authenticateUserService) {
    this.authenticateUserService = authenticateUserService;
  }

  async handleAuthenticateUser(request, response) {
    try {
      const { email, password } = request.body;

      const token = await this.authenticateUserService.execute(
        email,
        password
      );

      return response.status(200).json(token);

    } catch (error) {
      return response.status(400).json({
        error: error.message
      });
    }
  }
}
