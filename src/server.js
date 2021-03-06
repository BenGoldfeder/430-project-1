const http = require('http');
const url = require('url');
const query = require('querystring');
const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;


/*
urlStruct is parsed through once requests are received, in order to determine the function to be executed
*/  
const urlStruct = {

    GET: {
        '/': htmlHandler.getIndex,
        '/style.css': htmlHandler.getStyle,
        '/notReal': jsonHandler.notReal,
        '/getPotions': jsonHandler.getPotions,

        '/healing': jsonHandler.healing,
        '/invisibility': jsonHandler.invisibility,
        '/waterbreathing': jsonHandler.waterbreathing,
        '/sharpness': jsonHandler.sharpness,
        '/giantstrength': jsonHandler.giantstrength,
        '/flying': jsonHandler.flying,

        notFound: jsonHandler.notFound,
    },
    HEAD: {
        '/getPotions': jsonHandler.getPotionsMeta,
        '/notReal': jsonHandler.notRealMeta,
        notFound: jsonHandler.notFoundMeta,
    },
};


/*
Pushes data from post requests to the handler script
*/  
const handlePost = (request, response, parsedURL) => {
    if (parsedURL.pathname === '/addPotion') {
        const body = [];

        request.on('error', (err) => {
            console.dir(err);
            response.statusCode = 400;
            response.end();
        });

        request.on('data', (chunk) => {
            body.push(chunk);
        });

        request.on('end', () => {
            const bodyString = Buffer.concat(body).toString();
            const bodyParams = query.parse(bodyString);
            jsonHandler.addPotion(request, response, bodyParams);
        });
    }
};


/*
parses through options in urlStruct to find the correct function to employ
*/  
const handleGet = (request, response, parsedURL) => {
    const params = query.parse(parsedURL.query);

    if (urlStruct[request.method][parsedURL.pathname]) {
        urlStruct[request.method][parsedURL.pathname](request, response, params);
    } else {
        urlStruct[request.method].notFound(request, response);
    }
};



const onRequest = (request, response) => {
    const parsedURL = url.parse(request.url);
    console.dir(parsedURL.pathname);
    console.dir(request.method); // GET or HEAD

    if (request.method === 'POST') {
        handlePost(request, response, parsedURL);
    } else {
        handleGet(request, response, parsedURL);
    }
};



http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1: ${port}`);
