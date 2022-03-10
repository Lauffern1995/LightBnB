const properties = require('./json/properties.json');
const users = require('./json/users.json');
const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '1234',
  host: 'localhost',
  database: 'lightbnb'
});


/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {
  // let user;
  // for (const userId in users) {
  //   user = users[userId];
  //   if (user.email.toLowerCase() === email.toLowerCase()) {
  //     break;
  //   } else {
  //     user = null;
  //   }
  // }
  // return Promise.resolve(user);
  return pool
  .query(`SELECT * FROM users WHERE email = $1`, [email]).then((result) => {
    if (result.rows.length !== 1) {
      return null
    }
    return (result.rows[0]);
 })
 .catch((err) => {
   console.log(err.message);
 });

}
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  // return Promise.resolve(users[id]);
  return pool
  .query(`SELECT * FROM users WHERE id = $1`, [id]).then((result) => {
    if (result.rows.length !== 1) {
      return null
    }
    return (result.rows[0]);
 })
 .catch((err) => {
   console.log(err.message);
 });

}
exports.getUserWithId = getUserWithId;



/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser =  function(user) {
  // const userId = Object.keys(users).length + 1;
  // user.id = userId;
  // users[userId] = user;
  // return Promise.resolve(user);
  
  const vals = [user.name, user.email, user.password];
  return pool
  .query(`INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *;`, vals).then((result) => {
    if (result.rows.length !== 1) {
      return null
    }
    return (result.rows[0]);
 })
 .catch((err) => {
   console.log(err.message);
 });


}
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {
  // return getAllProperties(null, 2);

  
  const guest = [ guest_id, limit ] 
  const resvQuery = `SELECT reservations.*, properties.* as title, reservations.start_date as start_date, properties.cost_per_night as cost_per_night, avg(rating) as average_rating
  FROM reservations
  JOIN properties ON property_id = properties.id
  JOIN property_reviews ON properties.id = property_reviews.property_id
  WHERE reservations.guest_id = $1
  GROUP BY properties.id, reservations.id
  ORDER BY reservations.start_date
  LIMIT $2`

  return pool
  .query(resvQuery, guest).then((result) => {
    
    return(result.rows);
 })
 .catch((err) => {
   console.log(err.message);
 });
  
  

  
  

}
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = function(options, limit = 10) {
//   const limitedProperties = {};
//   for (let i = 1; i <= limit; i++) {
//     limitedProperties[i] = properties[i];
//   }
//   return Promise.resolve(limitedProperties);
//  }


const queryParams = [];

let queryString = 
`SELECT properties.*, avg(property_reviews.rating) as average_rating
FROM properties
JOIN property_reviews ON properties.id = property_id
WHERE 1=1 `;


if (options.city) {
  queryParams.push(`%${options.city}%`);
  queryString += `AND city LIKE $${queryParams.length} `;
}

if (options.owner_id) {
  queryParams.push(`%${options.owner_id}%`);
  queryString += `AND owner_id = $${queryParams.length} `
}

if (options.minimum_price_per_night && options.maximum_price_per_night) {
  queryParams.push(options.minimum_price_per_night *100, options.maximum_price_per_night *100 );
  queryString += `AND cost_per_night >= $${queryParams.length -1 } AND cost_per_night <= $${queryParams.length} `

}


if (options.minimum_rating) {
  queryParams.push(options.minimum_rating);
  queryString += `GROUP BY properties.id
    HAVING avg(property_reviews.rating) >= $${queryParams.length}
    ORDER BY cost_per_night `;
}

if(limit) {
  queryParams.push(limit);
  queryString += `
    LIMIT $${queryParams.length};
    `;
}

console.log(queryString, queryParams);


return pool.query(queryString, queryParams).then((res) => res.rows);

};

exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  // const propertyId = Object.keys(properties).length + 1;
  // property.id = propertyId;
  // properties[propertyId] = property;
  // return Promise.resolve(property);
  const addQuery =  [property.title,
    property.description,
    property.number_of_bedrooms,
    property.number_of_bathrooms,
    property.parking_spaces,
    property.cost_per_night,
    property.thumbnail_photo_url,
    property.cover_photo_url,
    property.street,
    property.country,
    property.city,
    property.province,
    property.post_code,
    property.owner_id]

    const addQueryString = `INSERT INTO properties (title,
      description,
      number_of_bedrooms,
      number_of_bathrooms,
      parking_spaces,
      cost_per_night,
      thumbnail_photo_url,
      cover_photo_url,
      street,
      country,
      city,
      province,
      post_code,
      owner_id)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)RETURNING *;`
    

  return pool
  .query(addQueryString, addQuery).then((result) => {
    console.log(result.rows)
    if (result.rows.length <= 0) {
      return null
    }
    return (result.rows[0]);
 })
 .catch((err) => {
   console.log(err.message);
 });

  
}
exports.addProperty = addProperty;
