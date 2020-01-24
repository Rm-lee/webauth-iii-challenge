

exports.up = async function(knex) {
    await knex.schema.createTable("user", (table) => {
      table.increments()
      table.string("username",128)
      .notNullable()
      .unique()
      table.string("password",128).notNullable()
    })
  };
  
  exports.down = async function(knex) {
    await knex.schema.dropTableIfExists("user")
  };
  