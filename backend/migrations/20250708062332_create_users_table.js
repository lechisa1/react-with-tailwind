/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('users', (table) => {
        table.increments('id').primary();
        table.string('first_name').notNullable();
        table.string('last_name');
        table.string('username');
        table.string('phone');
        table.string('email').notNullable().unique();
        table.string('password').notNullable();
        table.integer('department_id').unsigned(); 
        table.foreign('department_id').references('id').inTable('departments').onDelete('SET NULL');
        table.string('role').notNullable(); // e.g., 'admin', 'user',
        table.timestamps(true, true); // Created at and updated at timestamps
    }   );
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users');
};
