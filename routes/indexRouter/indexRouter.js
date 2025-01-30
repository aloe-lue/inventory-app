const { Router } = require("express");
const indexRouter = Router();
const indexController = require("../../controllers/indexControllers/indexControllers");

indexRouter.get("/", indexController.getHomepage);
indexRouter.post("/createGuitarType", indexController.createGuitarTypePost);
indexRouter.post("/updateGuitarType", indexController.updateGuitarTypePost);
indexRouter.post("/deleteGuitarType", indexController.deleteGuitarTypePost);

module.exports = indexRouter;
