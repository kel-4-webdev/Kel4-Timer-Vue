module.exports = app => {
    const historys = require("../controllers/history.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", historys.create);
  
    // Retrieve all Tutorials
    router.get("/", historys.findAll);
  
    // Retrieve all published Tutorials
    // router.get("/published", historys.findAllPublished);
  
    // Retrieve a single Tutorial with id
    router.get("/:timer_id", historys.findOne);
  
    // Update a Tutorial with id
    // router.put("/:actor_id", historys.update);
  
    // Delete a Tutorial with id
    router.delete("/:timer_id", historys.delete);
  
    // Delete all history
    router.delete("/", historys.deleteAll);
  
    app.use('/api/historys', router);
  };