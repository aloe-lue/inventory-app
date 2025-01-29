const { Client } = require("pg");
require("dotenv").config();

const SQL = `
  CREATE TABLE IF NOT EXISTS guitar_types (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    guitar_type VARCHAR(255)
  );

  INSERT INTO guitar_types (guitar_type) 
  VALUES ('Acoustic Guitar'),
    ('Electric Guitar'),
    ('Classical Guitar');

  CREATE TABLE IF NOT EXISTS guitar_items (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    guitar_item VARCHAR(255),
    guitar_type_id INTEGER,
    quantity INTEGER,
    price_tag INTEGER
  );

  INSERT INTO guitar_items (guitar_item, guitar_type_id, quantity, price_tag)
  VALUES ('Alhambra Student Series 3 C Solid Red Cedar Top/Mahogany 4/4 Guitar (Natural)', 3, 5, 800),
    ('Furch Guitars GNc 2-CW All-SOlid Wood Western Cedar/Black Walnut Grand Nylon Classical Guitar', 3, 5, 800),
    ('Yamaha C-40 Classical Guitar', 3, 10, 210),
    ('Yamaha CSF1M Compact Folk Acoustic Guitar', 3, 3, 232),
    ('Yamaha CG-TA TransAcoustic Nylon String Acoustic Guitar', 3, 3, 400),
    ('Yamaha REVSTAR RS 320 Electric Guitar', 2, 3, 400),
    ('Fender American Performer Jazzmaster Electric Guitar', 2, 5, 1000),
    ('Fender American Performer Telecaster Electric Guitar', 2, 5, 1000),
    ('Fender American Performer Telecaster Electric Guitar', 2, 5, 1000),
    ('Bromo BAT1M Tahoma Dreadnought Acoustic Guitar (Natural)', 1, 5, 200),
    ('Bromo BAA1 Appalachian Series 6-String Acoustic Guitar (Natural)', 1, 5, 100),
    ('Fender American Acoustasonic Stratocaster Acoustic Guitar - Ebony Fingerboard', 1, 3, 4000),
    ('Bromo BAA1 6-String Dreadnought Acoustic Guitar (Natural)', 1, 3, 120);
`;

async function main() {
  console.log("...seeding");
  const client = new Client({
    connectionString: process.env.LOCAL_DATABASE,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
