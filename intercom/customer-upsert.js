'use latest';

var request = require('request');

const URL = 'https://api.intercom.io/users';

/**
 * Insert or update (hence upsert) customer data to Intercom.
 * More info at https://doc.intercom.io/api/#create-or-update-user
 *
 * @param {String} context.data.payload - The payload that you are sending to Intercom
 */
module.exports = function customerUpsert(context, callback) {

  let { payload, INTERCOM_USER, INTERCOM_PASSWORD } = context.data;

  request.post({
    url: URL,
    auth: {
      user: INTERCOM_USER,
      pass: INTERCOM_PASSWORD
    },
    json: payload
  }, function (err, resp, result) {
    if (err) {
      console.log("Error", err);
      return callback(err);
    }


    if (resp.statusCode < 200 || resp.statusCode > 299) {
      console.log("Error", resp.statusCode, result);
      return callback(new Error(result));
    }

    console.log("All ok");
    return callback(null, result);
  });
};
