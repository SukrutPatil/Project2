const express = require("express");
const path = require("path");
const db = require("./database");
const upload = require("express-fileupload");
const bodyParser = require("body-parser");
var mysql = require('mysql');
let alert = require('alert');
const rzpService = require('./razorpay-payment');
const crs = require('crypto-random-string');
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "195357195",
  database: "nustadb",
  port: "3306"
});
const generateReferralCode = () => crs({ length: 9, type: 'numeric' });
const getCurrentDate = () => {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();

  today = mm + '/' + dd + '/' + yyyy;
  return today;
}
let usertype = "";

const app = express();
app.use(express.json());
app.use(express.static(__dirname));
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");
app.use(upload());

app.set("views", path.join(__dirname, "src", "views"));


app.get("/createProduct", (req, res) => {
  res.render("createProduct");
})

/******************************************
* API START
* */
app.post('/api/addCoins', async (req, res) => {
  const { coins } = req.body;
  const checkoutOptions = await rzpService.getCheckoutOptions(coins);
  res.send(checkoutOptions);

})






/******************************************
* API END
* */
app.post("/viewProduct", (req, res) => {
  let ema = req.body.email;
  if (usertype == "admin") {
    con.query(`SELECT * FROM nusta_product_details where admin_email = '${ema}'`, function (err, result) {
      if (err) throw err;
      else {
        // response.send(result)
        console.log(result.length);
        res.render("viewProduct", { coins: coins, email: ema, result: result });
      }

    });
  }
  else {
    con.query(`SELECT * FROM nusta_product_details`, function (err, result) {
      if (err) throw err;
      else {
        // response.send(result)
        console.log(result.length);
        res.render("viewProduct", { coins: coins, email: emailid, result: result });
      }

    });
  }




})

app.post("/addProduct", (req, res) => {

  let filename = "";
  try {
    if (req.files) {
      console.log(req.file);
      let file = req.files.product_image;
      filename = file.name;
      console.log(filename);

      file.mv('./public/images/' + filename, function (err) {
        if (err) {
          res.send(err);
        }
        else {
          //   if (err) throw err;
          //   con.query(`UPDATE nusta_user_details SET photo = '${filename}'  WHERE email = '${emailid}'`, function (err, result, fields) {

          //     if (err) throw err;
          //   });
          console.log("Success");
        }
      })

    }
  }
  catch (error) {
    console.log("No issues");
  }

  con.query(`insert into nusta_product_details(product_name, sub_text,price,discount,description,product_image,brand,model,model_name,dimen,manufacturer,time_date,admin_email) values ('${req.body.product_name}','${req.body.sub_text}','${req.body.price}','${req.body.discount}','${req.body.pdescription}','${filename}','${req.body.brand}','${req.body.model}','${req.body.model_name}','${req.body.dimen}','${req.body.manufacturer}','${req.body.time_date}','${req.body.emailid}')`, function (err, result, fields) {
    res.render("productDetail", { email: req.body.emailid, product_image: filename, product_name: req.body.product_name, sub_text: req.body.sub_text, price: req.body.price, discount: req.body.discount, description: req.body.pdescription, brand: req.body.brand, model: req.body.model, model_name: req.body.model_name, dimen: req.body.dimen, manufacturer: req.body.manufacturer, time_date: req.body.time_date });

  });




})

app.get("", (req, res) => {
  res.render("authentication-login1");
})

app.all("/addCoin", (req, res) => {
  res.render("addCoin", { photo: photo, email: emailid, coins: coins, firstname: username, lastname: lastname });
})

app.post("/coinAdded", (req, res) => {
  con.query(`select * from nusta_user_details where email = '${emailid}'`, function (err, result) {
    coins = result[0].coins ? +result[0].coins : 0;
  });
  console.log("Old Coins: " + coins);
  console.log("New Coins: " + req.body.coinsadd);
  let newcoin = +req.body.coinsadd + +coins;
  con.query(`UPDATE nusta_user_details SET coins = '${newcoin}'  WHERE email = '${emailid}'`, function (err, result, fields) {
    coins = newcoin;
    //res.render("dashboard", { coins: newcoin, mailid: emailid, idimage: result[0].idproof, addfimage: result[0].addressfront, addbimage: result[0].addressback, userimage: result[0].photo, phone: phone, firstname: result[0].firstname, lastname: result[0].lastname, gender: result[0].gender, dob: result[0].dob, houseno: result[0].houseno, address: result[0].address, village: result[0].village, city: result[0].city, state: result[0].state, pincode: result[0].pincode });


    // res.render("addCoin",{email:emailid,coins:coins,firstname:username,lastname:lastname});
    //res.send("SDf");
    res.render("authentication-login1");
  });


  // con.query(`SELECT * FROM nusta_user_details where email = '${emailid}' and password = '${password}'`, function (err, result) {
  //   try {
  //     res.render("dashboard", { coins: result[0].coins, mailid: emailid, idimage: result[0].idproof, addfimage: result[0].addressfront, addbimage: result[0].addressback, userimage: result[0].photo, phone: phone, firstname: result[0].firstname, lastname: result[0].lastname, gender: result[0].gender, dob: result[0].dob, houseno: result[0].houseno, address: result[0].address, village: result[0].village, city: result[0].city, state: result[0].state, pincode: result[0].pincode });
  //   } catch (error) {
  //     alert("Please Login again");
  //     res.render("authentication-login1");
  //   }
  // });

})

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});
let currentUserRefCode = "";
let currentUserReferEarnings;
let emailid = "";
let password = "";
let phone = "";
let coins = "";
let username = "";
let lastname = "";
let checkout = "";
let ch = "";
let cc = [];
let allReferrals = [];
let photo = "";
let joindate;
let refEarnings;
const getAllReferrals = async (ref) => {
  return await new Promise((resolve, reject) => {
    con.query(`select * from nusta_user_details where r_code = '${ref}'`, (err, result) => {
      if (err) console.log(err);
      console.log('Resolving Result');
      console.log(result);
      resolve(result);
    });
  })
}
app.post("/checkLogin", async (req, res) => {
  emailid = req.body.username;
  password = req.body.password;

  con.query(`SELECT * FROM nusta_user_details where email = '${emailid}' and password = '${password}'`,async function (err, result, fields) {

    try {
      usertype = result[0].user_type;
      if (usertype == 'admin') {
        res.render("createProduct", { email: emailid });
      }
      else {
        currentUserRefCode = result[0].refercode_use;
        allReferrals = await getAllReferrals(currentUserRefCode);
        console.log(allReferrals);
        joindate = result[0].joindate;
        phone = result[0].phone;
        coins = result[0].coins;
        username = result[0].firstname;
        lastname = result[0].lastname;
        refEarnings = allReferrals ? allReferrals.length : 0;
        res.render("afterLogin", { allReferrals, coins: coins, userimage: result[0].photo, mailid: emailid, THEREFCODE: currentUserRefCode, THEREFEARNINGS: refEarnings, firstname: result[0].firstname, lastname: result[0].lastname, gender: result[0].gender, dob: result[0].dob, houseno: result[0].houseno, address: result[0].address, village: result[0].village, city: result[0].city, state: result[0].state, pincode: result[0].pincode, joindate: result[0].joindate });
        photo = result[0].photo;
        console.log("Image is: " + result[0].photo);
      }
    } catch (error) {
      alert("Invalid Username or password.\n You can also create new Account");
      res.render("authentication-login1");

    }

  });
})
app.get('/referandearn', (req, res) => {
  console.log(allReferrals);
  res.render('referandearn', {
    allReferrals, coins: coins, mailid: emailid, THEREFCODE: currentUserRefCode, THEREFEARNINGS: refEarnings, joindate

  });
})
app.post("/signUp", (req, res) => {
  res.render("signup");
})

app.post("/signupcheck", async (req, res) => {
  phoneno = req.body.phone;
  emaill = req.body.email;
  pwd = req.body.password;
  rc = req.body.r_code;

  await new Promise((resolve, reject) => {
    con.query(`insert into nusta_user_details(email, password,r_code,phone,refercode_use,joindate) values ('${emaill}','${pwd}','${rc}','${phoneno}','${generateReferralCode()}','${getCurrentDate()}')`, function (err, result, fields) {
      console.log('Signup Callback Called.')
      err ? console.log(err) : null;
      console.log(result);
      resolve(true);
    });
  })



  if (rc) {
    let c, i;
    //Finding The Owner ofRefcode 
    await new Promise((resolve, reject) => {

      con.query(`select user_id,coins from nusta_user_details where refercode_use = '${rc}'`, (err, result) => {
        if (err) console.log(err);

        c = result[0].coins; i = result[0].user_id;
        resolve(true);
      });

    });

    console.log(`c ${c} i ${i}`)
    let nc = +c + 500;
    await new Promise((resolve, reject) => {
      con.query(`UPDATE nusta_user_details SET coins = ${nc} WHERE user_id = '${i}'`, (err, result) => {
        if (err) console.log(err);
        console.log('UPDATED');
        resolve(true);
      });
    })

  }
  res.render("authentication-login1");
})

app.post("/checkout_buy", (req, res) => {
  // let va = (5,6,7);
  // con.query(`select * from nusta_product_details where id in '${va}'`, function (err, result, fields) {
  //   console.log(result);

  // });

  var sql = "select * from nusta_product_details where id IN (?)";
  con.query(sql, [cc], function (err, result, fields) {

    if (err) {
      console.log(err);
    }
    else {
      //console.log(result[2].discount);
      let sum = 0;
      for (let i = 0; i < result.length; i++) {
        sum += parseInt(result[i].discount);
      }
      res.render("productCheckout", { coins: coins, email: emailid, result: result, sum: sum });
    }
  });

  //console.log(cc);
})

app.post("/buyproduct", (req, res) => {

  if (+coins - +req.body.coinss >= 0) {
    console.log("Coins: " + req.body.coinss);
    console.log("Clicked list: " + req.body.product_id);
    console.log(cc);
    cc.push(req.body.product_id);
    coins = parseInt(coins) - parseInt(req.body.coinss);
    console.log("Final Coins: " + coins);
    con.query(`UPDATE nusta_user_details SET checkout_list = '${cc}' , coins = '${coins}'  WHERE email = '${emailid}'`, function (err, result, fields) {
    });


    con.query(`SELECT * FROM nusta_product_details`, function (err, result) {
      if (err) throw err;
      else {
        // response.send(result)
        console.log(result.length);
        res.render("viewProduct", { coins: coins, email: emailid, result: result });
      }

    });
  }
  else {
    alert("You can't buy this product. You need to add coins for that.");
    con.query(`SELECT * FROM nusta_product_details`, function (err, result) {
      if (err) throw err;
      else {
        // response.send(result)
        console.log(result.length);
        res.render("viewProduct", { coins: coins, email: emailid, result: result });
      }

    });
  }

})


app.post("/updatechanges", (req, res) => {
  fname = req.body.firstname;
  lname = req.body.lastname;
  gender = req.body.gender;
  dob = req.body.dob;
  houseno = req.body.houseno;
  address = req.body.address;
  village = req.body.village;
  city = req.body.village;
  state = req.body.state;
  pincode = req.body.pincode;


  try {
    if (req.files.file) {
      let file = req.files.file;
      let filename = file.name;
      photo = filename;
      file.mv('./public/images/' + filename, function (err) {
        if (err) {
          res.send(err);
        }
        else {
          if (err) throw err;
          con.query(`UPDATE nusta_user_details SET photo = '${filename}'  WHERE email = '${emailid}'`, function (err, result, fields) {

            if (err) throw err;
          });
        }
      })

    }
  }
  catch (error) {
    console.log("No issues");
  }

  try {

    if (req.files.idfile) {
      let idfile = req.files.idfile;
      let idname = idfile.name;

      idfile.mv('./public/images/' + idname, function (err) {
        if (err) {
          res.send(err);
        }
        else {
          if (err) throw err;
          console.log("Connected!");
          con.query(`UPDATE nusta_user_details SET idproof = '${idname}'  WHERE email = '${emailid}'`, function (err, result, fields) {

            if (err) throw err;
          });
        }
      })

    }
  }
  catch (error) {
    console.log("No issues2");
  }

  try {
    if (req.files.addffile) {
      let addffile = req.files.addffile;
      let addfname = addffile.name;

      addffile.mv('./public/images/' + addfname, function (err) {
        if (err) {
          res.send(err);
        }
        else {
          if (err) throw err;
          con.query(`UPDATE nusta_user_details SET addressfront = '${addfname}'  WHERE email = '${emailid}'`, function (err, result, fields) {

            if (err) throw err;
          });
        }
      })
    }
  }
  catch (error) {
    console.log("No issues 3");
  }

  try {

    if (req.files.addbfile) {
      let addbfile = req.files.addbfile;
      let addbname = addbfile.name;
      addbfile.mv('./public/images/' + addbname, function (err) {
        if (err) {
          res.send(err);
        }
        else {
          if (err) throw err;
          con.query(`UPDATE nusta_user_details SET addressback = '${addbname}'  WHERE email = '${emailid}'`, function (err, result, fields) {

            if (err) throw err;
          });
        }
      })
    }

  }
  catch (error) {
    console.log("No issues 4");
  }


  var sql = `UPDATE nusta_user_details SET firstname = '${fname}' , lastname = '${lname}' , gender = '${gender}' , dob = '${dob}' , houseno = '${houseno}' , address = '${address}' , village = '${village}' , city = '${city}' , state = '${state}' , pincode = '${pincode}'  WHERE email = '${emailid}'`;
  con.query(sql, function (err, result2) {

    con.query(`SELECT * FROM nusta_user_details where email = '${emailid}' and password = '${password}'`, function (err, result) {
      try {
        res.render("dashboard", { coins: result[0].coins, mailid: emailid, idimage: result[0].idproof, addfimage: result[0].addressfront, addbimage: result[0].addressback, userimage: result[0].photo, phone: phone, firstname: result[0].firstname, lastname: result[0].lastname, gender: result[0].gender, dob: result[0].dob, houseno: result[0].houseno, address: result[0].address, village: result[0].village, city: result[0].city, state: result[0].state, pincode: result[0].pincode });
        checkout = result[0].checkout_list;
        ch = checkout.substring(0, checkout.length);
        cc = ch.split(",");
        //   cc.push(10);
        // console.log(cc.length+ " "+cc);
      } catch (error) {
        console.log("No Issues: 385");
      }
    });
  });

})

app.post("/storeimage", (req, res) => {
  if (req.files) {
    let file = req.files.file;
    let filename = file.name;

    file.mv('./public/images/' + filename, function (err) {
      if (err) {
        res.send(err);
      }
      else {
        if (err) throw err;
        con.query(`UPDATE nusta_user_details SET photo = '${filename}'  WHERE email = '${emailid}'`, function (err, result, fields) {

          if (err) throw err;
        });
      }
    })
  }
})

app.post("/afterLogin", (req, res) => {
  res.render("afterLogin", { mailid: 'ds', firstname: 'dds' })
})
app.post("/authentication-login1", (req, res) => {
  res.render("authentication-login1");
})

app.listen(8000, () => console.log(`Server Started at Port 8000`));
