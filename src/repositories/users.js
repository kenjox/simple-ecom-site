import fs from 'node:fs';
import crypto from 'node:crypto';

class UserRepo {
  constructor(filename) {
    if (!filename || typeof filename !== 'string') {
      throw new Error('creating instance of UserRepo requires a filename');
    }

    this.filename = filename;

    // Check if file exist in hard disk, if not save the file
    try {
      fs.accessSync(this.filename);
    } catch (e) {
      fs.writeFileSync(this.filename, '[]');
    }
  }

  async getAll() {
    const content = await fs.promises.readFile(this.filename, {
      encoding: 'utf8',
    });

    return JSON.parse(content);
  }

  async getById(userId) {
    const users = await this.getAll();
    return users.find((user) => user.id === userId);
  }

  async getOneBy(filters) {
    const users = await this.getAll();

    for (let user of users) {
      let found = true;

      for (let key in filters) {
        if (user[key] !== filters[key]) {
          found = false;
        }
      }

      if (found) {
        return user;
      }
    }
  }

  async save(user) {
    const users = await this.getAll();
    users.push({ id: this.genRandomId(), ...user });

    await this.writeDataToFile(users);
  }

  async update(userId, data) {
    const users = await this.getAll();

    const searchedUser = users.find((user) => user.id === userId);

    if (!searchedUser) throw new Error(`User with id ${userId} not found`);

    Object.assign(searchedUser, data);

    await this.writeDataToFile(users);
  }

  async delete(userId) {
    const users = await this.getAll();
    const filtered = users.filter((user) => user.id !== userId);

    await this.writeDataToFile(filtered);
  }

  async writeDataToFile(data) {
    return fs.promises.writeFile(this.filename, JSON.stringify(data, null, 2));
  }

  genRandomId() {
    return crypto.randomBytes(4).toString('hex');
  }
}

const userRepo = new UserRepo('users.json');

export { userRepo };
