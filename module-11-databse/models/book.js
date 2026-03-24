const Book = require('./bookSchema');

module.exports = {
    // Task 5: Pagination with total count
    findAll: async (page = 1, limit = 10) => {
        const skip = (page - 1) * limit;
        const [data, total] = await Promise.all([
            Book.find().skip(skip).limit(limit),
            Book.countDocuments()
        ]);
        return { data, total, page, limit };
    },

    findById: async (id) => await Book.findById(id),
    create: async (data) => await Book.create(data),
    update: async (id, data) => await Book.findByIdAndUpdate(id, data, { new: true }),
    destroy: async (id) => await Book.findByIdAndDelete(id)
};