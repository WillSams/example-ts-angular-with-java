export const up = async (knex) => {
  return knex.schema
    .createTable("room", (table) => {
      table.string("id").primary().unique();
      table.integer("num_beds").notNullable();
      table.boolean("allow_smoking").notNullable();
      table.double("daily_rate").notNullable();
      table.double("cleaning_fee").notNullable();
    })
    .createTable("reservation", (table) => {
      table.bigIncrements("id").primary();
      table.string("room_id").notNullable().references("room.id");
      table.date("checkin_date").notNullable();
      table.date("checkout_date").notNullable();
      table.double("total_charge").notNullable();
      table.unique(["room_id", "checkin_date", "checkout_date"]);
    });
};

export const down = async (knex) =>
  knex.schema.dropTableIfExists("reservation").dropTableIfExists("room");

