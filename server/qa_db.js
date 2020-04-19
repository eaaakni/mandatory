class Db {
    /**
     * @param mongoose the mongoose object used to create schema objects for the database
     */
    constructor(mongoose) {
        // This is the schema we need to store questions in MongoDB
        const questionSchema = new mongoose.Schema({
            title: String,
            question: String,
            answers: [{
                    text: String,
                    votes: Number
            }] // A list of answers and votes as string
        });

        // This model is used in the methods of this class to access questions
        this.questionModel = mongoose.model('question', questionSchema);
    }

    async getQuestions() {
        try {
            return await this.questionModel.find({});
        } catch (error) {
            console.error("getQuestions:", error.message);
            return {};
        }
    }

    async getQuestion(id) {
        try {
            return await this.questionModel.findById(id);
        } catch (error) {
            console.error("getQuestion:", error.message);
            return {};
        }
    }

    async createQuestion(newQuestion) {
        // TODO: Error handling
        let question = new this.questionModel(newQuestion);
        return await question.save();
    }

    async addAnswer(questionId, answer) {
        // TODO: Error handling
        const question = await this.getQuestion(questionId);
        question.hobbies.push(answer);
        return await question.save();
    }

    /**
     * This method adds a bunch of test data if the database is empty.
     * @param count The amount of questions to add.
     * @returns {Promise} Resolves when everything has been saved.
     */
    async bootstrap(count = 10) {
        const hobbies = ['sleeping', 'purring', 'eating', 'people watching'];
        function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min);
        }

        function getRandomName() {
            return ['Garfield', 'Tom', 'Felix', 'Snowball'][getRandomInt(0,3)]
        }

        function getRandomHobbies() {
            const shuffled = hobbies.sort(() => 0.5 - Math.random());
            return shuffled.slice(0, getRandomInt(1,shuffled.length));
        }

        let l = (await this.getQuestions()).length;
        console.log("Question collection size:", l);

        if (l === 0) {
            let promises = [];

            for (let i = 0; i < count; i++) {
                let question = new this.questionModel({
                    name: getRandomName(),
                    hobbies: getRandomHobbies()
                });
                promises.push(question.save());
            }

            return Promise.all(promises);
        }
    }
}

// We export the object used to access the questions in the database
module.exports = mongoose => new Db(mongoose);