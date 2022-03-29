const express = require('express');
const openapiUi = require('swagger-ui-express');
const yaml = require('js-yaml');
const fs = require('fs');

const router = express.Router();
const openapiDoc = yaml.load(fs.readFileSync('./get-users-spec.yaml', 'utf8'));

const options = { explorer: false };

router.use('/', openapiUi.serve);
router.get('/', openapiUi.setup(openapiDoc, options));

module.exports = router;
