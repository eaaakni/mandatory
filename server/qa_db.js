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

    async postQuestion(newQuestion) {
        // TODO: Error handling
        let question = new this.questionModel(newQuestion);
        return await question.save();
    }

    async postAnswer(questionId, answer) {
        // TODO: Error handling
        const question = await this.getQuestion(questionId);
        //question.hobbies.push(answer);
        return await question.save();
    }

    async voteAnswer(id, aid) {
        const question = await this.getQuestion(id);
        console.log(question);
        const answer = await question.answers.id(aid);
        answer.votes++;
        return await question.save();
    }

    /**
     * This method adds a bunch of test data if the database is empty.
     * @param count The amount of questions to add.
     * @returns {Promise} Resolves when everything has been saved.
     */
    async bootstrap(count = 10) {
        let l = (await this.getQuestions()).length;
        console.log("Question collection size:", l);

        if (l === 0) {
            const q1 = {

                title: "What’s your favorite genre of book or movie?",
                question:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                answers: [{
                    text: "Spirited Away",
                    votes: 0}]
            };
            const q2 = {

                title: "Do you think that humans as a species have gotten better through the generations or worse? Why?",
                question:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                answers: [{
                    text: "Both",
                    votes: 0}]
            };
            const q3 = {
                 title: "What have you recently become obsessed with?",
                question:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                answers: [
                    {   text: "Crochet",
                        votes: 0},
                    {
                        text: "Calligraphy",
                        votes: 0}]
            };
            const q4 =  {
                title: "How has the education you received changed your life?",
                question:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                answers: [{
                    text: "Getting smarter",
                    votes: 0}]
            };

            await this.postQuestion(q1);
            await this.postQuestion(q2);
            await this.postQuestion(q3);
            await this.postQuestion(q4);
        }
    }
}

// We export the object used to access the questions in the database
module.exports = mongoose => new Db(mongoose);