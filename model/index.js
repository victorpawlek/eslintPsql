const db = require('../db');

async function getCocktails() {
  const { rows } = await db.query('SELECT cname,preis FROM cocktail');
  return {
    code: 200,
    data: rows,
  };
}

async function getZutatenFromCocktail(name) {
  const { rows } = await db.query(
    'select zbez from besteht join zutat using(zid) where cid=(select cid from cocktail where cname=$1)',
    [name],
  );
  return {
    code: 200,
    data: rows,
  };
}

async function getCocktailPreis(preis) {
  const { rows } = await db.query('SELECT cname,preis FROM cocktail where preis < $1',[preis]);
  return {
    code: 200,
    data: rows,
  };
}

module.exports = { getCocktails, getZutatenFromCocktail,getCocktailPreis };
