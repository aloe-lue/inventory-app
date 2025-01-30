const { Router } = require("express");
const guitarItemsRouter = Router();
const guitarItemsController = require("../../controllers/guitarItemsControllers/guitarItemsControllers");

guitarItemsRouter.get(
  "/:guitarType/id/:id",
  guitarItemsController.getGuitarTypePage
);
guitarItemsRouter.post(
  "/:guitarType/id/:id/createGuitarItem",
  guitarItemsController.createGuitarItemPost
);
guitarItemsRouter.post(
  "/:guitarType/id/:id/updateGuitarItem",
  guitarItemsController.updateGuitarItemPost
);
guitarItemsRouter.post(
  "/:guitarType/id/:id/deleteGuitarItem",
  guitarItemsController.deleteGuitarItemPost
);

module.exports = guitarItemsRouter;
