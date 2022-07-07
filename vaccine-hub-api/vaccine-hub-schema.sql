CREATE TABLE "users" (
    id          SERIAL PRIMARY KEY,
   first_name  TEXT NOT NULL,
   last_name    TEXT NOT NULL,
   password     TEXT NOT NULL,
   email        TEXT NOT NULL UNIQUE CHECK (POSITION('@' IN email) > 1),
   location     TEXT NOT NULL,
   date   TIMESTAMP NOT NULL DEFAULT NOW()
);