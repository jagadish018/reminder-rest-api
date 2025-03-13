import { serve } from "@hono/node-server";
import { Hono } from "hono";

const app = new Hono();

type Reminder = {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  isCompleted: boolean;
};

let remindersDB: Reminder[] = [];

// Add a reminder
app.post("/reminders", async (c) => {
  try {
    const body = await c.req.json();
    const { id, title, description, dueDate, isCompleted } = body;

    if (
      !id ||
      !title ||
      !description ||
      !dueDate ||
      isCompleted === undefined) {
      return c.json(
        { error: "If the reminder with the given ID does not exist" },
        400);}

    const newReminder: Reminder = {
      id,
      title,
      description,
      dueDate,
      isCompleted,
    };
    remindersDB.push(newReminder);

    return c.json(
      { message: "Reminder created successfully", reminder: newReminder },
      201
    );
  } catch (error) {
    return c.json({ error: "Invalid JSON format" }, 400);
  }
});

// Get all completed reminders
app.get("/reminders/completed", (c) => {
  const completedReminders = remindersDB.filter((reminder) => reminder.isCompleted);
  if (completedReminders.length === 0) {
    return c.json({ error: "No completed reminders found" }, 404);
  }
  return c.json(completedReminders,200);
  });

// Get all not completed reminders
app.get("/reminders/not-completed", (c) => {

  const notCompletedReminders = remindersDB.filter(
    (reminder) => reminder.isCompleted === false
  );
  if (notCompletedReminders.length === 0) {
    return c.json({ error: "No not completed reminders found" }, 404);
  }
  return c.json(notCompletedReminders,200);
});


// Get reminders due today
app.get("/reminders/due-today", (c) => {
  const todayDateString = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
  const dueTodayReminders = remindersDB.filter(
    (reminder) => reminder.dueDate >= todayDateString && reminder.isCompleted===false);
  if (dueTodayReminders.length === 0) {
    return c.json({ error: "No reminders due today" }, 404);
    }
  return c.json(dueTodayReminders,200);
});


// Get a specific reminder
app.get("/reminders/:id", (c) => {
  const id = c.req.param("id");
  const reminder = remindersDB.find((reminder) => reminder.id === id);
  if (!reminder) return c.json({ error: "Reminder not found hello" }, 404);
  return c.json(reminder,200);
});

// Get all reminders
app.get("/reminders", (c) => {
  if (remindersDB.length === 0) {
    return c.json({ error: "No reminders found" }, 404);
  }
  return c.json(remindersDB,200);
});


// Update a reminder
app.patch("/reminders/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const body = await c.req.json();
    const { title, description, dueDate, isCompleted } = body;

    const reminder = remindersDB.find((reminder) => reminder.id === id);
    if (!reminder) return c.json({ error: "Reminder not found" }, 404);

    if (title) reminder.title = title;
    if (description) reminder.description = description;
    if (dueDate) reminder.dueDate = dueDate;
    if (isCompleted !== undefined) reminder.isCompleted = isCompleted;

    return c.json({ message: "Reminder updated successfully", reminder },200);
  } catch (error) {
    return c.json({ error: "Invalid JSON format" }, 400);
  }
});

// Delete a reminder
app.delete("/reminders/:id", (c) => {
  const id = c.req.param("id");
  const index = remindersDB.findIndex((reminder) => reminder.id === id);

  if (index === -1) return c.json({ error: "Reminder not found" }, 404);

  remindersDB.splice(index, 1);
  return c.json({ message: "Reminder deleted successfully" },200);
});

// Mark a reminder as completed
app.post("/reminders/:id/mark-completed", (c) => {
  const id = c.req.param("id");
  const reminder = remindersDB.find((reminder) => reminder.id === id);
  if (!reminder) return c.json({ error: "Reminder not found" }, 404);

  reminder.isCompleted = true;
  return c.json({ message: "Reminder marked as completed", reminder },200); // ✅ Added `reminder` in response for clarity
});

//Mark a reminder as uncompleted
app.post("/reminders/:id/unmark-completed", (c) => {
  const id = c.req.param("id");
  const reminder = remindersDB.find((reminder) => reminder.id === id);
  if (!reminder) return c.json({ error: "Reminder not found" }, 404);
  reminder.isCompleted = false;
  return c.json({ message: "Reminder unmarked as completed", reminder },200); 
});




serve(app);
console.log("✅ Server is running on http://localhost:3000");
