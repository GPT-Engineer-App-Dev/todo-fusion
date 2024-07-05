import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tooltip } from "@/components/ui/tooltip";
import { toast } from "sonner";

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: "", description: "", dueDate: null });
  const [editTask, setEditTask] = useState(null);

  const handleAddTask = () => {
    if (!newTask.title) {
      toast.error("Task title is required");
      return;
    }
    setTasks([...tasks, { ...newTask, id: Date.now() }]);
    setNewTask({ title: "", description: "", dueDate: null });
    toast.success("Task added successfully");
  };

  const handleEditTask = () => {
    if (!editTask.title) {
      toast.error("Task title is required");
      return;
    }
    setTasks(tasks.map(task => (task.id === editTask.id ? editTask : task)));
    setEditTask(null);
    toast.success("Task updated successfully");
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
    toast.success("Task deleted successfully");
  };

  return (
    <div className="container mx-auto p-4">
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Todo Application</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Add Task</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Task</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                placeholder="Task Title"
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              />
              <Textarea
                placeholder="Task Description"
                value={newTask.description}
                onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
              />
              <Calendar
                mode="single"
                selected={newTask.dueDate}
                onSelect={(date) => setNewTask({ ...newTask, dueDate: date })}
              />
              <Button onClick={handleAddTask}>Save</Button>
            </div>
          </DialogContent>
        </Dialog>
      </header>
      <div className="grid gap-4">
        {tasks.map((task) => (
          <Card key={task.id}>
            <CardHeader>
              <CardTitle>{task.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{task.description}</p>
              {task.dueDate && <p>Due Date: {format(task.dueDate, "PPP")}</p>}
            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">Edit</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Edit Task</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <Input
                      placeholder="Task Title"
                      value={editTask?.title || ""}
                      onChange={(e) => setEditTask({ ...editTask, title: e.target.value })}
                    />
                    <Textarea
                      placeholder="Task Description"
                      value={editTask?.description || ""}
                      onChange={(e) => setEditTask({ ...editTask, description: e.target.value })}
                    />
                    <Calendar
                      mode="single"
                      selected={editTask?.dueDate || null}
                      onSelect={(date) => setEditTask({ ...editTask, dueDate: date })}
                    />
                    <Button onClick={handleEditTask}>Save Changes</Button>
                  </div>
                </DialogContent>
              </Dialog>
              <Tooltip content="Delete Task">
                <Button variant="destructive" onClick={() => handleDeleteTask(task.id)}>
                  Delete
                </Button>
              </Tooltip>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Index;