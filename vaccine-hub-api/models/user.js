const db = require("../db");
const { BadRequestError, UnauthorizedError } = require("../utils/errors");

class User {
  static async login(credentials) {
    throw new UnauthorizedError("Invalid email/password combo");
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

    const existingUser = await User.fetchUserByEmail(credentials.email);

    if (existingUser) {
      throw new BadRequestError(`Duplicate email: ${credentials.email}`);
    }

    const lowercasedEmail = credentials.email.toLowerCase();
    console.log(lowercasedEmail);

    const result = await db.query(
      `
    INSERT INTO users (
      first_name, last_name, password, email, location
    )
    VALUES ($1, $2, $3, $4, $5)
    RETURNING id, first_name, last_name, password, email, location, date;
    `,
      [
        credentials.first_name,
        credentials.last_name,
        credentials.password,
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
    // const query = "SELECT * FROM users WHERE email = $1;";
    // const result = await db.query(query, [email.toLowerCase()]);
    const result = await db.query("SELECT * FROM users;");

    console.log(2);
    const user = result.rows[0];

    return user;
  }
}
module.exports = User;
