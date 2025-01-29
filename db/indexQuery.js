const pool = require("./pool");

async function createGuitarType(guitarType) {
  await pool.query("INSERT INTO guitar_types (guitar_type) VALUES ($1)", [
    guitarType,
  ]);
}

async function readGuitarTypes() {
  const { rows } = await pool.query(
    "SELECT * FROM guitar_types ORDER BY guitar_type ASC"
  );
  return rows;
}

async function readGuitarType(guitarType) {
  const { rows } = await pool.query(
    "SELECT * FROM guitar_types WHERE guitar_type LIKE $1",
    [guitarType]
  );
  return rows;
}

async function updateGuitarType(guitarType, id) {
  await pool.query(
    "UPDATE guitar_types SET guitar_type = $1 WHERE id IN ($2)",
    [guitarType, id]
  );
}

async function deleteGuitarType(id, guitarType, guitarItems = 0) {
  if (guitarItems > 0) {
    const { rows } = await pool.query(
      "DELETE FROM guitar_types AS gts USING guitar_items as gis WHERE gts.id = gis.guitar_type_id AND gts.id = $1 AND gis.guitar_type_id = $2 AND gts.guitar_type = $3",
      [id, id, guitarType]
    );
    return rows;
  }

  const { rows } = await pool.query(
    "DELETE FROM guitar_types WHERE id = $1 AND guitar_type = $2",
    [id, guitarType]
  );
  return rows;
}

async function createGuitarItem(guitarName, guitarType, quantity, priceTag) {
  await pool.query(
    "INSERT INTO guitar_items (guitar_item, guitar_type_id, quantity, price_tag) VALUES ($1, $2, $3, $4)",
    [guitarName, guitarType, quantity, priceTag]
  );
}
async function readGuitarItems(guitarTypeId) {
  const { rows } = await pool.query(
    "SELECT * FROM guitar_items WHERE guitar_type_id IN ($1)",
    [guitarTypeId]
  );
  return rows;
}

async function updateGuitarItem(id, name, guitarName, quantity, priceTag) {
  await pool.query(
    "UPDATE guitar_items SET guitar_item = $3, quantity = $4, price_tag = $5 WHERE id = $1 AND guitar_item = $2",
    [id, name, guitarName, quantity, priceTag]
  );
}

async function deleteGuitarItem(id, name) {
  await pool.query(
    "DELETE FROM guitar_items WHERE id = $1 AND guitar_item = $2",
    [id, name]
  );
}

module.exports = {
  createGuitarType,
  readGuitarTypes,
  readGuitarType,
  updateGuitarType,
  deleteGuitarType,
  createGuitarItem,
  readGuitarItems,
  updateGuitarItem,
  deleteGuitarItem,
};
