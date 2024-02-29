var express = require('express');
var router = express.Router();

const CyclicDB = require('@cyclic.sh/dynamodb');
const db = CyclicDB(process.env.CYCLIC_DB);
let utext = db.collection('Text');

/* GET home page. */
router.get('/', async function(req, res, next) {
  let text = await utext.list();
  res.send(text);
})

router.get('/:key', async function(req, res, next) {
  let text = await utext.get(req.params.key);
  res.send(text);
});

router.post('/', async function(req, res, next) {
  const { Content } = req.body;
  await utext.set(Content, {
    Text : Content,
  })
  res.end(); 
});

router.delete('/:key', async function(req, res, next) {
  await utext.delete(req.params.key);
  res.end();
});
 
module.exports = router;
