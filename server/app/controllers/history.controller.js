const db = require("../models");
const History = db.history;
const Op = db.Sequelize.Op;

// Create and Save a new Tutorial
exports.create = (req, res) => {
    // Validate request
    // if (!req.body.first_timer) {
    //   res.status(400).send({
    //     message: "Content can not be empty!"
    //   });
    //   return;
    // }
  
    // Create a Tutorial
    const history = {
        first_timer: req.body.first_timer,
        second_timer: req.body.second_timer
    };
  
    // Save Tutorial in the database
    History.create(history)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Tutorial."
        });
      });
};

// Retrieve all historys from the database.
exports.findAll = (req, res) => {
    const first_timer = req.query.first_timer;
    var condition = first_timer ? { first_timer: { [Op.iLike]: `%${first_timer}%` } } : null;
  
    History.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving historys."
        });
      });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
    const timer_id = req.params.timer_id;
  
    History.findByPk(timer_id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find history with id=${timer_id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving history with id=" + timer_id
        });
      });
};

// Update a Tutorial by the id in the request
// exports.update = (req, res) => {
//     const actor_id = req.params.actor_id;
  
//     Actor.update(req.body, {
//       where: { actor_id: actor_id }
//     })
//       .then(num => {
//         if (num == 1) {
//           res.send({
//             message: "Actor was updated successfully."
//           });
//         } else {
//           res.send({
//             message: `Cannot update Actor with id=${actor_id}. Maybe Actor was not found or req.body is empty!`
//           });
//         }
//       })
//       .catch(err => {
//         res.status(500).send({
//           message: "Error updating Actor with id=" + actor_id
//         });
//       });
// };

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
    const timer_id = req.params.timer_id;
  
    History.destroy({
      where: { timer_id: timer_id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "History was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete history with id=${timer_history}. Maybe history was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete history with id=" + timer_id
        });
      });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
    History.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} History were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all historys."
        });
      });
};

// Find all published Tutorials
// exports.findAllPublished = (req, res) => {
//     Actor.findAll({ where: { published: true } })
//       .then(data => {
//         res.send(data);
//       })
//       .catch(err => {
//         res.status(500).send({
//           message:
//             err.message || "Some error occurred while retrieving tutorials."
//         });
//       });
// };