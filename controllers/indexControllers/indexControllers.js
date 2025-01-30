const asyncHandler = require("express-async-handler");
const db = require("../../db/indexQuery");
const { validationResult, body } = require("express-validator");
require("dotenv").config();

exports.getHomepage = asyncHandler(async (req, res) => {
  const guitarTypes = await db.readGuitarTypes();
  res.render("indexViews/indexViews", { guitarTypes, errors: [] });
});
const guitarTypeValidation = "should be between 3 and 255 of length";

const createGuitarTypeValidation = [
  body("createGuitarType")
    .trim()
    .isLength({ min: 3, max: 255 })
    .withMessage(`Guitar Type ${guitarTypeValidation}`),
];

exports.createGuitarTypePost = [
  createGuitarTypeValidation,
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const guitarTypes = await db.readGuitarTypes();
      return res.status(400).render("indexViews/indexViews", {
        guitarTypes,
        errors: errors.array(),
      });
    }

    const { createGuitarType } = req.body;
    await db.createGuitarType(createGuitarType);
    res.redirect("/");
  }),
];

const id = "should be a number";
const strongPass = "should match admin password";
const isAdminPassMatch = process.env.ADMIN_PASSWORD;

const updateGuitarTypeValidation = [
  body("updateGuitarTypeId").trim().isNumeric().withMessage(`Guitar Id ${id}`),
  body("updateGuitarType").trim(),
  body("updateGuitarTypePassword")
    .trim()
    .matches(isAdminPassMatch)
    .withMessage(`Admin password ${strongPass}`),
];

exports.updateGuitarTypePost = [
  updateGuitarTypeValidation,
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    const guitarTypes = await db.readGuitarTypes();

    if (!errors.isEmpty()) {
      return res.status(400).render("indexViews/indexViews", {
        guitarTypes,
        errors: errors.array(),
      });
    }

    const { updateGuitarTypeId, updateGuitarType } = req.body;
    await db.updateGuitarType(updateGuitarType, updateGuitarTypeId);
    res.redirect("/");
  }),
];

const deleteGuitarTypeId = "Should be a number";

const deleteGuitarTypeValidation = [
  body("deleteGuitarTypeId")
    .trim()
    .isNumeric()
    .withMessage(`Id: ${deleteGuitarTypeId}`),
  body("deleteGuitarType").trim(),
  body("deleteGuitarTypePassword")
    .trim()
    .matches(isAdminPassMatch)
    .withMessage(`Admin password ${strongPass}`),
];

exports.deleteGuitarTypePost = [
  deleteGuitarTypeValidation,
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    const guitarTypes = await db.readGuitarTypes();

    if (!errors.isEmpty()) {
      return res.status(400).render("indexViews/indexViews", {
        guitarTypes,
        errors: errors.array(),
      });
    }

    const { deleteGuitarTypeId, deleteGuitarType } = req.body;
    const itemsLen = (await db.readGuitarItems(deleteGuitarTypeId)).length;
    await db.deleteGuitarType(deleteGuitarTypeId, deleteGuitarType, itemsLen);
    res.redirect("/");
  }),
];
