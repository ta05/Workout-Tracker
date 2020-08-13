const Workout = require("../models/workout.js");

module.exports = function (app) {
    app.get("/api/workouts", (req, res) => {
        Workout.find({})
            .then(dbWorkout => {
                dbWorkout.forEach((workout) => {
                    let totalDuration = 0;
                    workout.exercises.forEach((exercise) => {
                        totalDuration += exercise.duration;
                    });
                    workout.totalDuration = totalDuration;
                })
                res.json(dbWorkout);
            });
    });

    app.put("/api/workouts/:id", ({ body, params }, res) => {
        Workout.findByIdAndUpdate(
            params.id,
            {   
                $inc: {totalDuration: body.duration },
                $push: { exercises: body }
            },
            { new: true, runValidators: true }
        )
            .then(dbWorkout => res.json(dbWorkout))
            .catch(err => {
                res.json(err)
            })
    });

    app.post("/api/workouts", ({ body }, res) => {
        Workout.create(body)
            .then(dbWorkout => {
                res.json(dbWorkout);
            })
            .catch(err => {
                res.status(400).json(err);
            });
    });

    app.get("/api/workouts/range", (req, res) => {
        Workout.find({}).then(dbWorkout => {
            res.json(dbWorkout);
        })
            .catch(err => {
                res.status(400).json(err);
            });
    });
}