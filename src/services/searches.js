const MongoConnect = require('../lib/mongo');

class SearchService {
    constructor() {
        this.mongodb = new MongoConnect()
        this.collection = 'search'
    }

    async getSearches() {
        try {
            const searches = await this.mongodb.getAll(this.collection, {});
            return searches;
        } catch (error) {
            throw new Error('Fallo servicio getSearches')
        }
    }

    async getSearchById(id) {
        try {
            const search = await this.mongodb.get(this.collection, id);
            return search;
        } catch (error) {
            throw new Error('Fallo servicio getSearchById');
        }
    }

    async createSearch(search, restaurantId, restaurantName, restaurantCategory, userId, userName, bookDate, bookHour) {
        try {
            const id = await this.mongodb.create(this.collection, search, restaurantId, restaurantName, restaurantCategory, userId, userName, bookDate, bookHour);
            return id;
        } catch (error) {
            throw new Error('Fallo servicio createSearch');
        }
    }

    // async createSearch(search) {
    //     try {
    //         const id = await this.mongodb.create(this.collection, search);
    //         return id;
    //     } catch (error) {
    //         throw new Error('Fallo servicio createSearch');
    //     }
    // }
    
    async updateSearchById({ id, ...data }) {
        try {
            const searchId = await this.mongodb.update(this.collection, id, data);
            return searchId;
        } catch (error) {
            throw new Error('Fallo servicio updateSearchById');
        }
    }

    async deleteSearchById(id) {
        try {
            await this.mongodb.delete(this.collection, id);
            return id;
        } catch (error) {
            throw new Error('Fallo servicio deleteSearchById');
        }
    }
}

module.exports = SearchService;