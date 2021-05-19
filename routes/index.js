const express = require('express');
const asyncHandler = require('express-async-handler');

const { getCocktails, getZutatenFromCocktail, getCocktailPreis, deleteCocktail } = require('../model');

const router = express.Router();

router.get(
  '/cocktails',
  asyncHandler(async (req, res) => {
    const result = await getCocktails();
    res.status(result.code).json(result);
  }),
);

router.get(
  '/cocktails/:name/zutaten',
  asyncHandler(async (req, res) => {
    let result = await getZutatenFromCocktail(req.params.name);
    result.data = result.data.map(el => el.zbez);
    res.status(result.code).json(result);
  }),
);

router.get(
  '/cocktails/:preis',
  asyncHandler(async (req, res) => {
    let result = await getCocktailPreis(req.params.preis);
    res.status(result.code).json(result);
  }),
);

router.delete(
  '/cocktails/:name',
  asyncHandler(async (req, res) => {
    let result = await deleteCocktail(req.params.name);
    res.status(result.code).json(result);
  }),
);

module.exports = router;
