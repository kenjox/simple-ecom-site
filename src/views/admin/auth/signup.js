import { layout } from '../../layouts/admin/layout.js';
import { getError } from '../../../utils/helpers.js';

const signupTemplate = ({ errors }) => {
  return layout({
    content: `
    <div>
      <h1>Sign up</h1>
      <form method="POST">
        <p>
          <label>
            Email
            <input type="text" name="email" />
          </label>
        </p>
        <span class="error">${getError(errors, 'email')}</span>
        <p>
          <label>
            Password
            <input type="password" name="password" />
          </label>
        </p>
        <span class="error">${getError(errors, 'password')}</span>
        <p>
          <label>
            Confirm password
            <input type="password" name="confirmPassword" />
          </label>
        </p>
        <span class="error">${getError(errors, 'confirmPassword')}</span>
        <p>
        <button>Sign Up</button>
        </p>
      </form>
    </div>
  `,
  });
};

export { signupTemplate };
