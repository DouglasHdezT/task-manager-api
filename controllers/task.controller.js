const taskService = require("@internal/services/task.service");
const mongoose = require("mongoose");

const controller = {};

controller.insert = async (req, res, next) => { 
    try {
        const { text } = req.body;

        if (!text || text === "") return res.status(400).json({ error: "Text is required" });

        const { status: taskInserted } = await taskService.insert(text);
        if (!taskInserted) return res.status(409).json({ error: "Task not inserted" });

        return res.status(201).json({ message: "Task inserted" });
    } catch (error) {
        
    }
}

controller.findAll = async (req, res, next) => { 
    try {
        const { content: tasks } = await taskService.findAll();
        return res.status(200).json(tasks);
    } catch (error) {
        
    }
}

controller.findOneByID = async (req, res, next) => { 
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ error: "No valid id" });

        const { status: taskExists, content: task } = await taskService.findOneById(id);
        if (!taskExists) return res.status(404).json({ error: "Task not found" });

        return res.status(200).json(task);
    } catch (error) {
        
    }
}

controller.updateText = async (req, res, next) => { 
    try {
        const { id, text } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ error: "No valid id" });
        if (!text || text === "") return res.status(400).json({ error: "Text is required" });

        const { status: taskExists, content: task } = await taskService.findOneById(id);
        if (!taskExists) return res.status(404).json({ error: "Task not found" });

        const { status: taskUpdated } = await taskService.updateText(task, text);
        if (!taskUpdated) return res.status(409).json({ error: "Task not updated" });

        return res.status(200).json({ message: "Task updated" });
    } catch (error) {
        
    }
} 

controller.toggleActive = async (req, res, next) => { 
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ error: "No valid id" });

        const { status: taskExists, content: task } = await taskService.findOneById(id);
        if (!taskExists) return res.status(404).json({ error: "Task not found" });

        const { status: taskUpdated } = await taskService.toggleActive(task);
        if (!taskUpdated) return res.status(409).json({ error: "Task not updated" });

        return res.status(200).json({ message: "Task updated" });
    } catch (error) {
        
    }
}

controller.deleteOneByID = async (req, res, next) => { 
    try {
        const { id } = req.params;
        
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ error: "No valid id" });

        const { status: taskExists } = await taskService.findOneById(id);
        if (!taskExists) return res.status(404).json({ error: "Task not found" });

        const { status: taskDeleted } = await taskService.deleteOneById(id);
        if (!taskDeleted) return res.status(409).json({ error: "Task not deleted" });

        return res.status(200).json({ message: "Task deleted" });
    } catch (error) {
        
    }
}

module.exports = controller;