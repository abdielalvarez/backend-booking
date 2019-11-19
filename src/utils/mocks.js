const restaurantsMock = [
    {
        "name": "Daven Courtonne",
        "id": 1,
        "type": "Movies",
        "category": "97-352-3945",
        "address": "735 Bowman Point",
        "contact": {
          "phone": "(544) 3541498",
          "website": "google.com",
          "email": "dcourtonne0@usatoday.com"
        },
        "detail": {
          "description": "Poisoning by unsp antidepressants, self-harm, sequela",
          "photos": "http://dummyimage.com/188x240.png/ff4444/ffffff",
          "cost": {
            "price": "$2.63"
          },
          "owner": "Asphyx due to being trapped in bed linens, slf-hrm, sequela",
          "openingHours": "1:13 AM",
          "specificacions": {
            "someData": "Necrosis of amputation stump, left upper extremity"
          }
        }
      }, {
        "name": "Freddy Zmitrovich",
        "id": 2,
        "type": "Kids",
        "category": "85-443-4706",
        "address": "67 Evergreen Trail",
        "contact": {
          "phone": "(801) 1199368",
          "website": "t.co",
          "email": "fzmitrovich1@jugem.jp"
        },
        "detail": {
          "description": "Chronic maxillary sinusitis",
          "photos": "http://dummyimage.com/127x172.png/5fa2dd/ffffff",
          "cost": {
            "price": "$4.48"
          },
          "owner": "Path fx in oth disease, l foot, subs for fx w delay heal",
          "openingHours": "7:15 PM",
          "specificacions": {
            "someData": "Strain of musc/fasc/tend long head of biceps, left arm"
          }
        }
      }, {
        "name": "Marietta McCrum",
        "id": 3,
        "type": "Kids",
        "category": "77-401-0421",
        "address": "31608 Northwestern Point",
        "contact": {
          "phone": "(661) 3293099",
          "website": "shareasale.com",
          "email": "mmccrum2@aol.com"
        },
        "detail": {
          "description": "Breakdown (mechanical) of int fix of bone of left lower leg",
          "photos": "http://dummyimage.com/138x196.jpg/cc0000/ffffff",
          "cost": {
            "price": "$1.01"
          },
          "owner": "Unspecified dislocation of right radial head, init encntr",
          "openingHours": "7:55 PM",
          "specificacions": {
            "someData": "Disp fx of med phalanx of l less toe(s), 7thD"
          }
        }
      }
];
  
  class RestaurantsServiceMock {
    async getProducts() {
      return Promise.resolve(restaurantsMock)
    }
  }
  
  module.exports = {
    restaurantsMock,
    RestaurantsServiceMock
  };
  