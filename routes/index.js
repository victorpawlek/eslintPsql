const express = require('express');
const asyncHandler = require('express-async-handler');

const { getCocktails, getZutatenFromCocktail } = require('../model');

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

module.exports = router;
