class CategoryDAL {
    constructor(mongoose) {
        this.mongoose = mongoose;
        const categorySchema = new mongoose.Schema({
            categoryName: String,
            books: [{
                title: String,
                author: String,
                price: Number,
                nameOfSeller: String,
                emailOfSeller: String
            }]
        });
        this.categoryModel = mongoose.model('category', categorySchema);
    }

    async getCategories() {
        try {
            return await this.categoryModel.find({});
        } catch (error) {
            console.error("getCategory:", error.message);
            return {};
        }
    }

    async getCategory(id) {
        try {
            return await this.categoryModel.findById(id);
        } catch (error) {
            console.error("getCategory:", error.message);
            return {};
        }
    }

    async createCategory(newCategory) {
        let category = new this.categoryModel(newCategory);
        return category.save();
    }

    async deleteCategory(id) {
        return this.categoryModel.findByIdAndRemove(id, (err, tasks) => {
            const response = {
                message: "Category successfully deleted",
                id: id
            };
            return response;
        });
    }

    async getBook(categoryId, bookId) {
        const category = await this.getCategory(categoryId);
        const book = category.books.map(book => book._id === bookId ?
            {...book} : book);
    }

   async addBook(categoryId, title, author, price, nameOfSeller, emailOfSeller) {
        const category = await this.getCategory(categoryId);
        category.books.push({
            title: title,
            author: author,
            price: price,
            nameOfSeller: nameOfSeller,
            emailOfSeller: emailOfSeller});
        return category.save();
    }

    async bootstrap() {


        let l = (await this.getCategories()).length;
        console.log("Category collection size:", l);

        if (l === 0) {
            let promises = [];

            let categoryOne = new this.categoryModel(
                {
                    categoryName: "Programming",
                    books: [
                        {
                            title: "Sams teach yourself sql in 10 minutes",
                            author: "Ben Forta",
                            price: 299,
                            nameOfSeller: "Randi Bierbaum",
                            emailOfSeller: "randibierbaum@gmail.com"
                        },
                        {
                            title: "Baby Loves Coding!",
                            author: "Ruth Spiro",
                            price: 90,
                            nameOfSeller: "Rasmus Bierbaum",
                            emailOfSeller: "rasmus@gmail.com"
                        }
                    ]
                });

            let categoryTwo = new this.categoryModel(
                {
                    categoryName: "Interface Design",
                    books: [
                        {
                            title: "About Face",
                            author: "Alan Cooper",
                            price: 265,
                            nameOfSeller: "Olivia Lüttge",
                            emailOfSeller: "Olivia@gmail.com"
                        },
                        {
                            title: "Don't Make Me Think",
                            author: "Steve Krug",
                            price: 180,
                            nameOfSeller: "John Doe",
                            emailOfSeller: "john@gmail.com"
                        },
                        {
                            title: "The Design of Everyday Things",
                            author: "Donald A. Norman",
                            price: 146,
                            nameOfSeller: "Jane Doe",
                            emailOfSeller: "jane@gmail.com"
                        }
                    ]
                });

            let categoryTree = new this.categoryModel(
                {
                    categoryName: "Front-end",
                    books: [
                        {
                            title: "The Non-Designer's Design Book",
                            author: "Robin Williams",
                            price: 249,
                            nameOfSeller: "Olivia Lüttge",
                            emailOfSeller: "Olivia@gmail.com"
                        },
                        {
                            title: "Atomic design",
                            author: "Brad Frost",
                            price: 180,
                            nameOfSeller: "John Doe",
                            emailOfSeller: "john@gmail.com"
                        }
                    ]
                });

            promises.push(categoryOne.save());
            promises.push(categoryTwo.save());
            promises.push(categoryTree.save());

            return Promise.all(promises);
        }

 /*       if (l === 0) {
            let promises = [];

            for (let i = 0; i < count; i++) {
                let categoryOne = new this.categoryModel(
                    {
                    categoryName: "Programming",
                    books: [
                        {
                            title: "Sams teach yourself sql in 10 minutes",
                            author: "Ben Forta",
                            price: 299,
                            nameOfSeller: "Randi Bierbaum",
                            emailOfSeller: "randibierbaum@gmail.com"
                        }
                    ]
                });
                let categoryTwo = new this.categoryModel(
                {
                    categoryName: "Interface Design",
                    books: [
                    {
                        id: 1,
                        title: "About Face",
                        author: "Alan Cooper",
                        price: 265,
                        nameOfSeller: "Olivia Lüttge",
                        emailOfSeller: "Olivia@gmail.com"
                    },
                    {
                        id: 2,
                        title: "Don't Make Me Think",
                        author: "Steve Krug",
                        price: 180,
                        nameOfSeller: "John Doe",
                        emailOfSeller: "john@gmail.com"
                    }
                    ]
                });
                promises.push(categoryOne.save());
                promises.push(categoryTwo.save());
            }

            return Promise.all(promises);
        } */
    }
}

module.exports = (mongoose) => new CategoryDAL(mongoose);