class Habit {
    constructor(id, name, completed, streak) {
        this.id = id;
        this.name = name;
        this.completed = completed;
        this.streak = streak;
    }

    toggleCompleted() {
        this.completed = !this.completed;
        if (this.completed) {
            this.streak++;
        } else {
            this.streak--;
        }
    }
}

export default Habit