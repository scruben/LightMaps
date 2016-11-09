'use strict';

// const Event = require('./models').models.Event;
//
// exports.getLatest = function* (next) {
//   this.type = 'json';
//   try {
//     const events = yield Event.find().sort({date: 1});
//     this.body = events.map((el) => {
//       return {
//         id: el._id,
//         title: el.title,
//         date: el.date,
//         venue: el.venue
//       }
//     });
//     console.log(this.body);
//   } catch (err) {
//     this.status = 500;
//     this.body = err;
//   }
// };
//
// exports.post = function* (next) {
//   if (
//     this.request.body === undefined ||
//     this.request.body.title === undefined ||
//     this.request.body.date === undefined ||
//     this.request.body.venue === undefined
//   ) {
//     this.status = 400;
//     this.body = '400 Bad Request';
//   } else {
//     let data = { title: this.request.body.title, date: this.request.body.date, venue: this.request.body.venue };
//     var event = new Event(data);
//     try {
//       yield event.save();
//       this.body = data;
//     } catch (err) {
//       this.status = 500;
//       this.body = err;
//     }
//   }
// };
