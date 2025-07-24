class CrudService{
    constructor(repository){
        this.repository = repository;
    }

    async create(data) {
        try {
            const result = await this.repository.create(data);
            return result;
        } catch (error) {
            console.error("Error creating record:", error);
            throw error;
        }
    }
    async destroy(id) {
        try {
            await this.repository.destroy(id);
            return true;
        } catch (error) {
            console.error("Error deleting record:", error);
            throw error;
        }
    }
    async get(id) {
        try {
            const result = await this.repository.get(id);
            return result;
        } catch (error) {
            console.error("Error fetching record:", error);
            throw error;
        }
    }
    async getAll() {
        try {
            const result = await this.repository.getAll();
            return result;
        } catch (error) {
            console.error("Error fetching records:", error);
            throw error;
        }
    }
    async update(id, data) {
        try {
            const result = await this.repository.update(id, data);
            return result;
        } catch (error) {
            console.error("Error updating record:", error);
            throw error;
        }
    }
}
module.exports = CrudService;