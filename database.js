require("dotenv").config();
const mysql = require("mysql");
const getTheConfig = () => {
  let theConfig= {
    host: process.env.DBHOST,
    user: process.env.DBUSER,
    password: process.env.DBPASS,
    database: process.env.DB,
    connectionLimit: 8,
    port: process.env.DBPORT,
  };
  return theConfig;
};
const getThePool = () => {
  return thePool ? thePool : createNewPool();
};
const createNewPool = ()=>mysql.createPool(getTheConfig());

let thePool=createNewPool();


 const dbCheckLogin = async (username, password) => {
  return new Promise((resolve) => {
    const pool = getThePool();
    pool.query(
      `select * from nusta_user_details where email='${username}' and password='${password}'`,
      (err, result) => {
        if (err) {
          console.error(err);

          resolve(false);
        } else if (result.length == 1) resolve(true) ;
        else {
          console.error(
            " No or Multiple Users Found. This is an issue with the database."
          );
          resolve(false);
        }
      }
    );
  });
 };

const dbStartSignup = async (email, password,phone, r_code="") => {
  const pool = getThePool();
  return new Promise((resolve) => {
    pool.query(`insert into nusta_user_details(email, password,r_code,phone) values ('${email}','${password}','${r_code}','${phone}')`, (err, result) => {
      if (err) {
        console.error(err);
        resolve(false);
      }
      resolve(true);
    });
  });
 }

const dbUpdateSignup = async(email,firstname)=>{
  const pool = getThePool();
  return new Promise((resolve) => {
    pool.query(`update nusta_user_details set firstname = '${firstname}' where email = '${email}'`, (err, result) => {
      if (err) {
        console.error(err);
        resolve(false);
      }
      resolve(true);
    });
  });
}
 
module.exports = { dbCheckLogin,dbStartSignup}

