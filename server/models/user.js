// 'use strict';
//
// const db = require('../db.js');
// const Sequelize = require('sequelize');
//
// const dm = {};
//
// dm.Messages = db.sequelize.define('messages', {
//   content: {
//     type: Sequelize.STRING
//   },
//   timestamp: {
//     type: Sequelize.BIGINT
//   },
//   userid: {
//     type: Sequelize.BIGINT
//   }
// },{
//   //timestamps: false
// });
//
// dm.writeMessage = function(message) {
//   var timestamp = Date.now();
//   return dm.Messages.create({content: message.content, timestamp: timestamp});
// };
//
// dm.loadMessages = function (options) {
//   var queryParam;
//   if (options && options.limit) {
//     queryParam = {
//       attributes: ['content', 'timestamp'],
//       order: 'timestamp DESC',
//       limit: options.limit
//     };
//   } else if (options && options.lasttimestamp) {
//     queryParam = {
//       attributes: ['content', 'timestamp'],
//       order: 'timestamp DESC',
//       where: {
//         timestamp: {
//           // $gt: options.lasttimestamp
//         }
//       }
//     };
//   }
//   return dm.Messages.findAll(queryParam);
// };
//
// module.exports = dm;
