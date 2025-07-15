/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable("maintenances",function(table){
    table.increments("id").primary();
    table.string("item_name").notNullable();
    table.string("category_issue");
    table.string("description");
    table.string("priority");
    table.string("status");
    table.integer("approved_by").unsigned();
    table.foreign("approved_by").references("id").inTable("users").onDelete("CASCADE");
    table.integer("requested_by").unsigned();
    table.foreign("requested_by").references("id").inTable("users").onDelete("CASCADE");
    table.timestamps(true,true)
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists("maintenances")
};
