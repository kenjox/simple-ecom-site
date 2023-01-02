import { layout } from '../../layouts/admin/layout.js';

const signinTemplate = () => {
  return layout({
    content: `
    <div>
      <h1>Login</h1>
      <form method="POST">
        <p>
          <label>
            Email
            <input type="email" name="email" />
          </label>
        </p>
        <p>
          <label>
            Password
            <input type="password" name="password" />
          </label>
        </p>
        <p>
        <button>Sign In</button>
        </p>
      </form>
    </div>`,
  });
};

export { signinTemplate };
