const asyncHandler = require("express-async-handler");
const db = require("../../db/indexQuery");
const { validationResult, body } = require("express-validator");

exports.getGuitarTypePage = asyncHandler(async (req, res) => {
  const { guitarType, id } = req.params;

  const getGuitarType = await db.readGuitarType(guitarType);

  if (getGuitarType.length === 0) {
    return res.status(400).redirect("/");
  }

  const guitarItems = await db.readGuitarItems(id);

  res.render("guitarItemsViews/guitarItemsViews", {
    guitarType,
    guitarItems,
    id,
    errors: [],
  });
});
const createGuitarQuantity = "should be numeric";

const createGuitarItemValidationChain = [
  body("createGuitarItem").trim().isString(),
  body("guitarItemQuantity")
    .trim()
    .isNumeric()
    .withMessage(`Quantity ${createGuitarQuantity}`),
  body("guitarItemPrice")
    .trim()
    .isNumeric()
    .withMessage(`Price ${createGuitarQuantity}`),
];

exports.createGuitarItemPost = [
  createGuitarItemValidationChain,
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    const { id, guitarType } = req.params;

    if (!errors.isEmpty()) {
      const guitarItems = await db.readGuitarItems(id);
      return res.status(400).render(`guitarItemsViews/guitarItemsViews`, {
        guitarItems,
        id,
        guitarType,
        errors: errors.array(),
      });
    }

    const { createGuitarItem, guitarItemQuantity, guitarItemPrice } = req.body;
    await db.createGuitarItem(
      createGuitarItem,
      id,
      guitarItemQuantity,
      guitarItemPrice
    );
    res.redirect(`/guitarType/${guitarType}/id/${id}`);
  }),
];

const adminPassword = process.env.ADMIN_PASSWORD;

const updateGuitarItemValidationChain = [
  body("updateGuitarId")
    .trim()
    .isNumeric()
    .withMessage("id should be a number"),
  body("currentUpdateGuitarName").trim().isString(),
  body("updateGuitarName").trim().isString(),
  body("updateGuitarQuantity").trim().isNumeric(),
  body("updateGuitarPrice").trim().isNumeric(),
  body("updateGuitarAdminPassword")
    .trim()
    .matches(adminPassword)
    .withMessage("should match admin password"),
];

exports.updateGuitarItemPost = [
  updateGuitarItemValidationChain,
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    const { id, guitarType } = req.params;

    if (!errors.isEmpty()) {
      const guitarItems = await db.readGuitarItems(id);
      return res.status(400).render("guitarItemsViews/guitarItemsViews", {
        guitarType,
        guitarItems,
        id,
        errors: errors.array(),
      });
    }

    const {
      updateGuitarId,
      currentUpdateGuitarName,
      updateGuitarName,
      updateGuitarQuantity,
      updateGuitarPrice,
    } = req.body;
    // todo: update specific item from db
    await db.updateGuitarItem(
      updateGuitarId,
      currentUpdateGuitarName,
      updateGuitarName,
      updateGuitarQuantity,
      updateGuitarPrice
    );

    res.redirect(`/guitarType/${guitarType}/id/${id}`);
  }),
];

const deleteGuitarItemPostValidation = [
  body("deleteGuitarItemId")
    .trim()
    .isNumeric()
    .withMessage("id should be number"),
  body("currentDeleteGuitarName")
    .trim()
    .isString()
    .withMessage("name should be a string"),
  body("deleteGuitarItemAdminPassword")
    .trim()
    .matches(adminPassword)
    .withMessage("should match admin password"),
];

exports.deleteGuitarItemPost = [
  deleteGuitarItemPostValidation,
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    const { id, guitarType } = req.params;

    if (!errors.isEmpty()) {
      const guitarItems = await db.readGuitarItems(id);
      return res.status(400).render("guitarItemsViews/guitarItemsViews", {
        guitarType,
        guitarItems,
        id,
        errors: errors.array(),
      });
    }

    const { deleteGuitarItemId, currentDeleteGuitarName } = req.body;
    await db.deleteGuitarItem(deleteGuitarItemId, currentDeleteGuitarName);
    res.redirect(`/guitarType/${guitarType}/id/${id}`);
    res.send(req.body);
  }),
];
