exports.seed = function(knex, Promise) {
  return knex('store').del()
    .then(function () {
      return knex('store').insert([
        {
          "title":"Adopt a Bear",
          "description": "Your donation will help perserve the lives of these beautiful creatures.",
          "src": "https://placebear.com/g/200/200",
          "alt_tag":"bear image",
          "price":"100000"
        },
        {
          "title":"Adopt an Orangutan",
          "description": "Your donation will help perserve the lives of these beautiful creatures.",
          "src": "http://bit.ly/2uBVGO2",
          "alt_tag":"bear image",
          "price":"80000"
        },
        {
          "title":"Adopt a Panda",
          "description": "Your donation will help perserve the lives of these beautiful creatures.",
          "src": "http://n.pr/2h693l1",
          "alt_tag":"panda image",
          "price":"60000"
        },
        {
          "title":"Adopt a Tiger",
          "description": "Your donation will help perserve the lives of these beautiful creatures.",
          "src": "http://bit.ly/2uBDJz3",
          "alt_tag":"tiger image",
          "price":"40000"
        },
        {
          "title":"Adopt a Dolphin",
          "description": "Your donation will help perserve the lives of these beautiful creatures.",
          "src": "http://bit.ly/2uGrNus",
          "alt_tag":"dolphin image",
          "price":"20000"
        },
        {
          "title":"Adopt an Owl",
          "description": "Your donation will help perserve the lives of these beautiful creatures.",
          "src": "http://bit.ly/2w3PVX4",
          "alt_tag":"owl image",
          "price":"10000"
        },
        {
          "title":"Adopt a Fox",
          "description": "Your donation will help perserve the lives of these beautiful creatures.",
          "src": "http://bit.ly/2vMHTTa",
          "alt_tag":"fox image",
          "price":"6000"
        },
        {
          "title":"Adopt a Bee",
          "description": "Your donation will help perserve the lives of these beautiful creatures.",
          "src": "http://bit.ly/2vMHTTa",
          "alt_tag":"bee image",
          "price":"500"
        }
      ]);
    });
};
