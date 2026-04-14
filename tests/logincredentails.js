const loginData = [
  {
    username: 'wrong_user',
    password: 'wrong_pass',
    expected: 'error'
  },
  {
    username: 'standard_user',
    password: 'secret_sauce',
    expected: 'success'
  }
];

export default loginData;