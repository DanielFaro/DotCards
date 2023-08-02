const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("db.db");
// const cartDb = new sqlite3.Database("cart.db");

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

// For backend and express
const app = express();
console.log("App listen at port 5000");
app.use(express.json());
app.use(cors());
// app.use('/product:id', );
// app.use('/cart', )

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
  // console.log("## inside get /products", products);
  // res.json(products);
});

app.get("/product/:id", async (req, res) => {
  const id = [Number(req.params.id)];
  // console.log("## inside get product ==", id);
  const product = await db_all("SELECT * FROM products WHERE id = ?", id);
  // console.log("## product in app.get product", product);
  res.send(product[0]);
});

app.post("/cart", async (req, res) => {
  const id = req.body.id;
  const quantity = req.body.quantity;
  const newCart = [quantity, id];
  console.log("## req in update cart ==", req.body);
  await db_run("UPDATE cart SET quantity = ? WHERE id = ?", newCart);
  // const updatedCart = await db_all("SELECT * FROM cart");
  // console.log("## updated cart in app.post ==", updatedCart);
  // res.send(updatedCart);
});

app.get("/cart", async (req, res) => {
  const updatedCart = await db_all("SELECT * FROM cart");
  console.log("## inside get /products", updatedCart);
  res.json(updatedCart);
});

// export const getCart = () => {};
// export const addToCart = () => {};
// export const deleteFromCart = () => {};

app.listen(5000, () => {
  try {
  } catch (error) {
    console.log(error);
  }
});

// const ProductSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   id: {
//     type: Number,
//     reqired: true,
//   },
//   // img: {
//   //   type: String,
//   //   required: true,
//   // },
//   price: {
//     type: Number,
//     required: true,
//   },
// });

// const CartSchema = new mongoose.Schema({
//   cartItems: [ProductSchema],
// });

// const adidasImgs = {
//   carousel: [
//     "/assets/shoes/adidas/adidas1.jpg",
//     "/assets/shoes/adidas/adidas2.jpg",
//     "/assets/shoes/adidas/adidas3.jpg",
//   ],
//   zoom: "/assets/shoes/adidas/adidasClose.jpg",
//   home: "/assets/shoes/adidas/adidasHome.jpg",
// };

// const offWhiteImgs = {
//   carousel: [
//     "/assets/shoes/offWhite/offWhite1.jpg",
//     "/assets/shoes/offWhite/offWhite2.jpg",
//     "/assets/shoes/offWhite/offWhite3.jpg",
//   ],
//   zoom: "/assets/shoes/offWhite/offWhiteClose.jpg",
//   home: "/assets/shoes/offWhite/offWhiteHome.jpg",
// };

// const gammaImgs = {
//   carousel: [
//     "/assets/shoes/gamma/gamma1.jpg",
//     "/assets/shoes/gamma/gamma2.jpg",
//     "/assets/shoes/gamma/gamma3.jpg",
//   ],
//   zoom: "/assets/shoes/gamma/gammaClose.jpg",
//   home: "/assets/shoes/gamma/gammaHome.jpg",
//   sale: "/assets/shoes/gamma/sale.jpg",
// };

// const cosmicImgs = {
//   carousel: [
//     "/assets/shoes/cosmic/cosmic1.jpg",
//     "/assets/shoes/cosmic/cosmic2.jpg",
//     "/assets/shoes/cosmic/cosmic3.jpg",
//   ],
//   zoom: "/assets/shoes/cosmic/cosmicClose.jpg",
//   home: "/assets/shoes/cosmic/cosmicHome.jpg",
// };

// const gamma = {
//   brand: "Nike",
//   name: "Nike Gamma Force",
//   id: 1,
//   price: 200,
//   carousel: [
//     "/assets/shoes/gamma/gamma1.jpg",
//     "/assets/shoes/gamma/gamma2.jpg",
//     "/assets/shoes/gamma/gamma3.jpg",
//   ],
//   zoom: "/assets/shoes/gamma/gammaClose.jpg",
//   home: "/assets/shoes/gamma/gammaHome.jpg",
//   sale: "/assets/shoes/gamma/sale.jpg",
// };
// const adidas = {
//   brand: "adidas",
//   name: "DAILY 3.0 Shoes",
//   id: 4,
//   price: 98.99,
//   carousel: [
//     "/assets/shoes/adidas/adidas1.jpg",
//     "/assets/shoes/adidas/adidas2.jpg",
//     "/assets/shoes/adidas/adidas3.jpg",
//   ],
//   zoom: "/assets/shoes/adidas/adidasClose.jpg",
//   home: "/assets/shoes/adidas/adidasHome.jpg",
// };
// const offWhite = {
//   brand: "Off-White",
//   name: "Out of Office 'Ooo' sneakers",
//   id: 3,
//   price: 775,
//   carousel: [
//     "/assets/shoes/offWhite/offWhite1.jpg",
//     "/assets/shoes/offWhite/offWhite2.jpg",
//     "/assets/shoes/offWhite/offWhite3.jpg",
//   ],
//   zoom: "/assets/shoes/offWhite/offWhiteClose.jpg",
//   home: "/assets/shoes/offWhite/offWhiteHome.jpg",
// };
// const cosmic = {
//   brand: "Nike",
//   name: "Cosmic Unity 3",
//   id: 2,
//   price: 160,
//   carousel: [
//     "/assets/shoes/cosmic/cosmic1.jpg",
//     "/assets/shoes/cosmic/cosmic2.jpg",
//     "/assets/shoes/cosmic/cosmic3.jpg",
//   ],
//   zoom: "/assets/shoes/cosmic/cosmicClose.jpg",
//   home: "/assets/shoes/cosmic/cosmicHome.jpg",
// };
