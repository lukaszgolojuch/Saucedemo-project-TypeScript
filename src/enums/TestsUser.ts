class TestUser {
  constructor(
    public readonly username: string,
    public readonly password: string
  ) {}
}
  
export const TestUsers = {
  STANDARD_USER: new TestUser("standard_user", "secret_sauce"),
  LOCKED_OUT_USER: new TestUser("locked_out_user", "secret_sauce"),
  PROBLEM_USER: new TestUser("problem_user", "secret_sauce"),
  PERFORMANCE_GLITCH_USER: new TestUser("performance_glitch_user", "secret_sauce"),
  ERROR_USER: new TestUser("error_user", "secret_sauce"),
  VISUAL_USER: new TestUser("visual_user", "secret_sauce"),
} as const;