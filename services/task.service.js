const Task = require("@internal/models/Task");
const ServiceResponse = require("@internal/classes/ServiceResponse");

const service = {};

service.insert = async (text) => { 
    try { 
        const task = new Task({
            text: text
        });

        const taskSaved = await task.save();

        if (!taskSaved) return new ServiceResponse(false);
        return new ServiceResponse(true);
    }
    catch (error) { 
        throw error;
    }
}

service.findAll = async () => { 
    try {
        const tasks = await Task.find({});

        return new ServiceResponse(true, tasks);
    } catch (error) {
        throw error;
    }
}

service.findOneById = async (id) => {
    try {
        const task = await Task.findById(id);

        if (!task) return new ServiceResponse(false);
        return new ServiceResponse(true, task);

    } catch (error) {
        throw error;
    }
}

service.updateText = async (task, text) => { 
    try {
        task.text = text;

        const taskUpdated = await task.save();

        if (!taskUpdated) return new ServiceResponse(false);
        return new ServiceResponse(true);
    } catch (error) {
        throw error;
    }
}

service.toggleActive = async (task) => { 
    try {
        const newValue = !(task.active);
        task.active = newValue;

        const taskUpdated = await task.save();

        if (!taskUpdated) return new ServiceResponse(false);
        return new ServiceResponse(true);
    } catch (error) {
        throw error;
    }
}

service.deleteOneById = async (id) => { 
    try {
        const taksDeleted = await Task.findByIdAndDelete(id);
        
        if (!taksDeleted) return new ServiceResponse(false);
        return new ServiceResponse(true);
    } catch (error) {
        throw error;
    }
}

module.exports = service;