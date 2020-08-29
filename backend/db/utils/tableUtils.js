function references(table, tableName, notNullable = true, columnName = '') {
  const definition = table
    .integer(`${columnName || tableName}_id`)
    .unsigned()
    .references('id')
    .inTable(tableName)
    .onDelete('cascade');

  if (notNullable) {
    definition.notNullable();
  }
  return definition;
}

function url(table, columName) {
  return table.string(`${columName || null}_url`, 2000);
}

function email(table) {
 return table.string('email', 254);
}

function addDefaultColumns(table) {
  table.timestamps(false, true);
  table.datetime('deleted_at');
}

function name(table) {
  return table.string('name');
}
module.exports = {
  email,
  url,
  references,
  addDefaultColumns,
  name
};