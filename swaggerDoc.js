const swaggerUi = require('swagger-ui-express');
const swaggereJsdoc = require('swagger-jsdoc');
const express = require('express');

const router = express.Router();

const options = {
//swagger문서 설정
    swaggerDefinition: {
        info: {
            title: 'toy1-api',
            version: '1.0.0',
            description: 'Toy1 API with express',
        },
        host: 'localhost:3000',
        basePath: '/'
    },
//swagger api가 존재하는 곳 입니다.
    apis: ['./routes/*.js']
};

const specs = swaggereJsdoc(options);

router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

module.exports = router;