const MongoConnect = require('../lib/mongo');
const Restaurant = require('../models/restaurant');

class RestaurantService {
    constructor() {
        this.mongodb = new MongoConnect()
        this.collection = 'restaurants'
    }

    async getRestaurants() {
        try {
            const restaurants = await this.mongodb.getAll(this.collection, {});
            return restaurants;
        } catch (error) {
            throw new Error('Fallo servicio getRestaurants')
        }
    }

    async getRestaurantById(id, typeservice) {
        try {
            const restaurant = await this.mongodb.get(this.collection, id, typeservice);
            return restaurant;
        } catch (error) {
            throw new Error('Fallo servicio getRestaurantById');
        }
    }

    async getRestaurantByService(typeservice) {
        try {
            const restaurant = await this.mongodb.getS(this.collection, typeservice);
            return restaurant;
        } catch (error) {
            throw new Error('Fallo servicio getRestaurantById');
        }
    }

    async createRestaurant(restaurant) {
        try {
            const id = await this.mongodb.create(this.collection, restaurant);
            return id;
        } catch (error) {
            throw new Error('Fallo servicio createRestaurant');
        }
    }
    
    async updateRestaurantById({ id, ...data }) {
        try {
            const restaurantId = await this.mongodb.update(this.collection, id, data);
            return restaurantId;
        } catch (error) {
            throw new Error('Fallo servicio updateRestaurantById');
        }
    }

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