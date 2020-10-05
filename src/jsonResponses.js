const potions = {};

const respondJSON = (request, response, status, object) => {
    const headers = {
        'Content-Type': 'application/json',
    };
    response.writeHead(status, headers);
    response.write(JSON.stringify(object));
    response.end();
};



const respondJSONMeta = (request, response, status) => {
    const headers = {
        'Content-Type': 'application/json',
    };
    response.writeHead(status, headers);
    response.end();
};



const getPotions = (request, response) => {
    const responseJSON = {
        potions,
    };
    return respondJSON(request, response, 200, responseJSON);
};






const healing = (request, response) => {
    const responseJSON = {
        name: 'Healing',
        desc: 'A viscous red liquid. When used, heal 2d4 + 2 HP.',
    };
    return respondJSON(request, response, 200, responseJSON);
};
const invisibility = (request, response) => {
    const responseJSON = {
        name: 'Invisibility',
        desc: 'A bottle that appears empty but feels full. When used, become invisible for 1 hour.',
    };
    return respondJSON(request, response, 200, responseJSON);
};
const waterbreathing = (request, response) => {
    const responseJSON = {
        name: 'Water Breathing',
        desc: 'A cloudy, deep blue liquid. When used, you can breathe underwater for up to 1 hour.',
    };
    return respondJSON(request, response, 200, responseJSON);
};
const sharpness = (request, response) => {
    const responseJSON = {
        name: 'Sharpness',
        desc: 'A clear oil with floating flecks of silver. When used to coat a weapon, that weapon gains +3 to attack and damage rolls.',
    };
    return respondJSON(request, response, 200, responseJSON);
};
const giantstrength = (request, response) => {
    const responseJSON = {
        name: 'Giant Strength',
        desc: 'A luminescent orange serum. When used, increase your strength score to 23.',
    };
    return respondJSON(request, response, 200, responseJSON);
};
const flying = (request, response) => {
    const responseJSON = {
        name: 'Flying',
        desc: 'A cloud-white liquid with a thin layer of fog floating atop. When used, gain a flying speed equal to your walking speed for 1 hour.',
    };
    return respondJSON(request, response, 200, responseJSON);
};





const getPotionsMeta = (request, response) => respondJSONMeta(request, response, 200);



const addPotion = (request, response, body) => {
    const responseJSON = {
        message: 'Name and description are both required',
    };

    if (!body.name || !body.desc) { // no name or age
        responseJSON.id = 'missingParams';
        return respondJSON(request, response, 400, responseJSON);
    }

    let responseCode = 201;

    if (potions[body.name]) {
        responseCode = 204; // updated
    } else {
        potions[body.name] = {};
        potions[body.name].name = body.name; // created
    }

    potions[body.name].desc = body.desc;

    if (responseCode === 201) {
        responseJSON.message = 'Created Sucessfully';
        return respondJSON(request, response, responseCode, responseJSON);
    }

    return respondJSONMeta(request, response, responseCode);
};



const notReal = (request, response) => {
    const responseJSON = {
        message: 'The user you are looking for was not found!',
        id: 'notFound',
    };
    return respondJSON(request, response, 404, responseJSON);
};



const notRealMeta = (request, response) => respondJSONMeta(request, response, 404);



const notFound = (request, response) => {
    const responseJSON = {
        message: 'The page you are looking for was not found!',
        id: 'notFound',
    };
    return respondJSON(request, response, 404, responseJSON);
};



const notFoundMeta = (request, response) => respondJSONMeta(request, response, 404);

module.exports = {
    getPotions,
    getPotionsMeta,
    notFound,
    notFoundMeta,
    notReal,
    notRealMeta,
    addPotion,
    healing,
    invisibility,
    waterbreathing,
    sharpness,
    giantstrength,
    flying
};
