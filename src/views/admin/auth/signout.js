import { layout } from '../../layouts/admin/layout.js';

const signoutTemplate = () => {
  return layout({
    content: `
    <div>
      <h1>Sign up</h1>
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
          <label>
            Confirm password
            <input type="password" name="confirmPassword" />
          </label>
        </p>
        <p>
        <button>Sign Up</button>
        </p>
      </form>
    </div>
  `,
  });
};

export { signoutTemplate };
