const MongoConnect = require('../lib/mongo');
const Restaurant = require('../models/restaurant');

class RestaurantService {
    constructor() {
        this.mongodb = new MongoConnect()
        this.collection = 'restaurants'
    }

    // RUTA DE PRUEBA
    async getRestaurants() {
        try {
            const restaurants = await this.mongodb.getAll(this.collection, {});
            return restaurants;
        } catch (error) {
            throw new Error('Fallo servicio getRestaurants')
        }
    }

    // async getRestaurants(type, zone) {
    //     try {
    //         const restaurants = await this.mongodb.get(this.collection, type, zone);
    //         console.log(restaurants);

            
    //         return restaurants;
    //     } catch (error) {
    //         throw new Error('Fallo servicio getRestaurants')
    //     }
    // }

    async getRestaurantsList(type, zone) {
        try {
            const restaurant = await this.mongodb.getList(this.collection, type, zone);
            return restaurant;
        } catch (error) {
            throw new Error('Fallo servicio getRestaurantById');
        }
    }

    async getRestaurantById(id) {
        try {
            const restaurant = await this.mongodb.getId(this.collection, id);
            return restaurant;
        } catch (error) {
            throw new Error('Fallo servicio getRestaurantById');
        }
    }

    // RUTA DE PRUEBA
    async createRestaurant(restaurant) {
        try {
            const id = await this.mongodb.create(this.collection, restaurant);
            return id;
        } catch (error) {
            throw new Error('Fallo servicio createRestaurant');
        }
    }
    
    // RUTA DE PRUEBA
    async updateRestaurantById({ id, ...data }) {
        try {
            const restaurantId = await this.mongodb.update(this.collection, id, data);
            return restaurantId;
        } catch (error) {
            throw new Error('Fallo servicio updateRestaurantById');
        }
    }

    // RUTA DE PRUEBA
    async deleteRestaurantById(id) {
        try {
            await this.mongodb.delete(this.collection, id);
            return id;
        } catch (error) {
            throw new Error('Fallo servicio deleteRestaurantById');
        }
    }
}

module.exports = RestaurantService;