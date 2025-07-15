/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("departments", (table) => {
    table.increments("id").primary();
    table.string("name").notNullable().unique();
    table.string("description");
    table.integer("director_id").unsigned(); // Director is a foreign key referencing users.id
    table
      .foreign("director_id")
      .references("id")
      .inTable("users")
      .onDelete("SET NULL");

    table.timestamps(true, true); // Created at and updated at timestamps
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("departments");
};
