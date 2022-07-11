const bcrypt = require("bcrypt");
const db = require("../db");

const { BCRYPT_WORK_FACTOR } = require("../config");
const { BadRequestError, UnauthorizedError } = require("../utils/errors");

class User {
  static async login(credentials) {
    const requiredField = ["email", "password"];
    if (!credentials) {
      throw new BadRequestError("No credentials provided");
    }
    requiredField.forEach((field) => {
      if (!credentials.hasOwnProperty(field)) {
        throw new BadRequestError("Missing ${field} in request body.");
      }
    });

    const user = await User.fetchUserByEmail(credentials.email);
    if (user) {
      const isValid = await bcrypt.compare(credentials.password, user.password);
      if (isValid) {
        return user;
      }
    }
    throw new UnauthorizedError("Invalid email/password");
  }

  static async register(credentials) {
    const requiredField = [
      "first_name",
      "last_name",
      "password",
      "email",
      "location",
    ];
    requiredField.forEach((field) => {
      if (!credentials.hasOwnProperty(field)) {
        throw new BadRequestError(`Missing ${field} in request body.`);
      }
    });

    if (credentials.email.indexOf("@") <= 0) {
      throw new BadRequestError("Invalid email.");
    }

    const existingUser = await User.fetchUserByEmail(credentials.email);

    if (existingUser) {
      throw new BadRequestError(`Duplicate email: ${credentials.email}`);
    }
    const hashedPassword = await bcrypt.hash(
      credentials.password,
      BCRYPT_WORK_FACTOR
    );

    const lowercasedEmail = credentials.email.toLowerCase();
    console.log(lowercasedEmail);

    const result = await db.query(
      `
    INSERT INTO "users" (
      first_name, last_name, password, email, location
    )
    VALUES ($1, $2, $3, $4, $5)
    RETURNING id, first_name, last_name, password, email, location, date;
    `,
      [
        credentials.first_name,
        credentials.last_name,
        hashedPassword,
        lowercasedEmail,
        credentials.location,
      ]
    );

    const user = result.rows[0];
    console.log(user);
    return user;
  }
  static async fetchUserByEmail(email) {
    if (!email) {
      throw new BadRequestError("No email provided");
    }
    console.log(email);
    const query = `SELECT * FROM "users" WHERE email = $1;`;
    const result = await db.query(query, [email.toLowerCase()]);
    // const result = await db.query("SELECT * FROM users WHERE email = $1;");

    console.log(2);
    const user = result.rows[0];

    return user;
  }
}
module.exports = User;
