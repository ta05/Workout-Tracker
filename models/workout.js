const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema({
    day: {
        type: Date,
        default: Date.now()
    },
    exercises: [{
        name: {
            type: String,
            trim: true,
            required: "Enter a name for the exercise"
        },
        type: {
            type: String,
            trim: true,
            required: "Enter the type of exercise"
        },
        weight: {
            type: Number
        },
        sets: {
            type: Number
        },
        reps: {
            type: Number
        },
        distance: {
            type: Number
        },
        duration: {
            type: Number,
            required: "Enter the duration of the exercise"
        }
    }],
    totalDuration: {
        type: Number,
        default: 0
    }
});

const Workout = mongoose.model("workout", workoutSchema);

module.exports = Workout;