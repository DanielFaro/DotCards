const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("db.db");

db.serialize(function () {
  db.run(
    "CREATE TABLE IF NOT EXISTS products (brand TEXT, name TEXT, id INTEGER, price INTEGER, carousel1 TEXT, carousel2 TEXT, carousel3 TEXT, zoom TEXT, home TEXT, sale TEXT)"
  );
  db.run("CREATE TABLE IF NOT EXISTS cart (id INTEGER, quantity INTEGER)");
  db.run("INSERT INTO cart (id, quantity) VALUES (1, 0)");
  db.run("INSERT INTO cart (id, quantity) VALUES (2, 0)");
  db.run("INSERT INTO cart (id, quantity) VALUES (3, 0)");
  db.run("INSERT INTO cart (id, quantity) VALUES (4, 0)");
  db.run(
    "INSERT INTO products (brand, name, id, price, carousel1, carousel2, carousel3, zoom, home) VALUES ('Nike', 'Cosmic Unity 3', 2, 160, '/assets/shoes/cosmic/cosmic1.jpg', '/assets/shoes/cosmic/cosmic2.jpg', '/assets/shoes/cosmic/cosmic3.jpg', '/assets/shoes/cosmic/cosmicClose.jpg', '/assets/shoes/cosmic/cosmicHome.jpg')"
  );
  db.run(
    "INSERT INTO products (brand, name, id, price, carousel1, carousel2, carousel3, zoom, home) VALUES ('Off White', 'Out of Office Ooo sneakers', 3, 775, '/assets/shoes/offWhite/offWhite1.jpg','/assets/shoes/offWhite/offWhite2.jpg','/assets/shoes/offWhite/offWhite3.jpg', '/assets/shoes/offWhite/offWhiteClose.jpg', '/assets/shoes/offWhite/offWhiteHome.jpg')"
  );
  db.run(
    "INSERT INTO products (brand, name, id, price, carousel1, carousel2, carousel3,  zoom, home) VALUES ('adidas', 'DAILY 3.0 shoes', 4, 89.99, '/assets/shoes/adidas/adidas1.jpg','/assets/shoes/adidas/adidas2.jpg','/assets/shoes/adidas/adidas3.jpg', '/assets/shoes/adidas/adidasClose.jpg', '/assets/shoes/adidas/adidasHome.jpg')"
  );
  db.run(
    "INSERT INTO products (brand, name, id, price, carousel1, carousel2, carousel3, zoom, home, sale) VALUES ('Nike', 'Nike Gamma Force', 1, 200, '/assets/shoes/gamma/gamma1.jpg','/assets/shoes/gamma/gamma2.jpg','/assets/shoes/gamma/gamma3.jpg', '/assets/shoes/gamma/gammaClose.jpg', '/assets/shoes/gamma/gammaHome.jpg', '/assets/shoes/gamma/sale.jpg')"
  );
});
// db.close();

const app = express();
console.log("App listen at port 5000");
app.use(express.json());
app.use(cors());

async function db_all(query, data) {
  return new Promise(function (resolve, reject) {
    db.all(query, data, function (err, rows) {
      if (err) {
        return reject(err);
      }
      resolve(rows);
    });
  });
}

async function db_run(query, data) {
  return new Promise(function (resolve, reject) {
    db.run(query, data, function (err, rows) {
      if (err) {
        return reject(err);
      }
      resolve(rows);
    });
  });
}
app.get("/products", async (req, res) => {
  const products = await db_all("SELECT * FROM products");
  res.send(products);
});

app.get("/product/:id", async (req, res) => {
  const id = [Number(req.params.id)];
  const product = await db_all("SELECT * FROM products WHERE id = ?", id);
  res.send(product[0]);
});

app.post("/cart", async (req, res) => {
  const id = req.body.id;
  const quantity = req.body.quantity;
  const newCart = [quantity, id];
  await db_run("UPDATE cart SET quantity = ? WHERE id = ?", newCart);
});

app.get("/cart", async (req, res) => {
  const updatedCart = await db_all("SELECT * FROM cart");
  res.json(updatedCart);
});

app.listen(5000, () => {
  try {
  } catch (error) {
    console.log(error);
  }
});
