const User = require("../models/User");
const bcrypt = require("bcrypt");

async function createAdminAccount() {
  try {
    const existingAdmin = await User.findOne({ email: "admin@test.com" });
    if (existingAdmin) {
      console.log("Admin account already exists");
    } else {
      const newAdmin = new User({
        firstName: "Admin",
        lastName: "123",
        email: "admin@test.com",
        password: await bcrypt.hash("admin", 10),
        role: "admin",
      });
      await newAdmin.save();
      console.log("Admin account created successfully");
    }
  } catch (error) {
    console.error(error.message);
  }
}

async function createUser(uid, ufirstName, ulastName, uemail, upassword) {
  try {
    const existingUser = await User.findOne({ id: uid }, { email: uemail });
    if (existingUser) {
      console.log("User already exists");
    } else {
      const newUser = new User({
        id: (await User.countDocuments()) + 1,
        firstName: ufirstName,
        lastName: ulastName,
        email: uemail,
        password: await bcrypt.hash(upassword, 10),
      });
      await newUser.save();
      console.log("User created successfully");
    }
  } catch (error) {
    console.error(error.message);
  }
}

async function createTask(
  tid,
  ttitle,
  tdescription,
  tdueDate,
  tpriorityLevel,
  tcategory,
  tstatus
) {
  try {
    const existingTask = await Task.findOne({ id: tid });
    if (existingTask) {
      console.log("Task already exists");
      return;
    }
    const newTask = new Task({
      id: (await Task.countDocuments()) + 1,
      title: ttitle,
      description: tdescription,
      dueDate: tdueDate,
      priorityLevel: tpriorityLevel,
      category: tcategory,
      status: tstatus,
    });
    await newTask.save();
    console.log("Task created successfully");
  } catch (error) {
    console.error(error.message);
  }
}

async function updateTask(tid, tcategory, tpriorityLevel, tstatus) {
  try {
    const existingTask = await Task.findOne({ id: tid });
    if (!existingTask) {
      console.log("Task not found");
      return;
    }
    existingTask.category = tcategory;
    existingTask.priorityLevel = tpriorityLevel;
    existingTask.status = tstatus;
    await existingTask.save();
    console.log("Task updated successfully");
  } catch (error) {
    console.error(error.message);
  }
}

async function deleteTask(tid) {
  try {
    const existingTask = await Task.findOne({ id: tid });
    if (!existingTask) {
      console.log("Task not found");
      return;
    }
    await existingTask.remove();
    console.log("Task deleted successfully");
  } catch (error) {
    console.error(error.message);
  }
}

async function deleteAllTasks() {
  try {
    const tasks = await Task.find({});
    for (const task of tasks) {
      await task.remove();
    }
    console.log("All tasks deleted successfully");
  } catch (error) {
    console.error(error.message);
  }
}

async function deleteAllUsers() {
  try {
    const users = await User.find({});
    for (const user of users) {
      await user.remove();
    }
    console.log("All users deleted successfully");
  } catch (error) {
    console.error(error.message);
  }
}

async function displayAllTasks() {
  try {
    const tasks = await Task.find({});

    if (!tasks) {
      console.log("No tasks found");
      return;
    }

    console.log("Tasks found");

    for (const task of tasks) {
      console.log(task);
    }
  } catch (error) {
    console.error(error.message);
  }
}

async function filterTasksByTitle(ttitle) {
  try {
    const tasks = await Task.find({ title: ttitle });

    if (!tasks) {
      console.log("No tasks found");
      return;
    }

    console.log("Tasks found");

    for (const task of tasks) {
      console.log(task);
    }
  } catch (error) {
    console.error(error.message);
  }
}

async function filterTasksByDescription(tdescription) {
  try {
    const tasks = await Task.find({ description: tdescription });

    if (!tasks) {
      console.log("No tasks found");
      return;
    }

    console.log("Tasks found");

    for (const task of tasks) {
      console.log(task);
    }
  } catch (error) {
    console.error(error.message);
  }
}

async function filterTasksByCategory(cat) {
  try {
    const tasks = await Task.find({ category: cat });
    console.log(tasks);
  } catch (error) {
    console.error(error.message);
  }
}

async function filterTasksByStatus(tstatus) {
  try {
    const tasks = await Task.find({ status: tstatus });

    if (!tasks) {
      console.log("No tasks found");
      return;
    }

    console.log("Tasks found");

    for (const task of tasks) {
      console.log(task);
    }
  } catch (error) {
    console.error(error.message);
  }
}

async function updateStatus(tid, tstatus) {
  try {
    const existingTask = await Task.findOne({ id: tid }, { status: tstatus });
    if (!existingTask) {
      console.log("Task not found");
      return;
    }
    existingTask.status = tstatus;
    await existingTask.save();
    console.log("Task status updated successfully");
  } catch (error) {
    console.error(error.message);
  }
}

async function createCategory(tcat) {
  try {
    const existingCategory = await Task.findOne({ category: tcat });
    if (existingCategory) {
      console.log("Category already exists");
    } else {
      const newCategory = new Task({
        category: tcat,
      });
      await newCategory.save();
      console.log("Category created successfully");
    }
  } catch (error) {
    console.error(error.message);
  }
}

async function sortTasksByDueDate() {
  try {
    const tasks = await Task.find({}).sort({ dueDate: 1 });

    if (!tasks) {
      console.log("No tasks found");
      return;
    }

    console.log("Tasks sorted by due date");

    for (const task of tasks) {
      console.log(task);
    }
  } catch (error) {
    console.error(error.message);
  }
}

async function sortTasksByPriorityLevel() {
  try {
    const tasks = await Task.find({}).sort({ priorityLevel: 1 });

    if (!tasks) {
      console.log("No tasks found");
      return;
    }

    console.log("Tasks sorted by priority level");

    for (const task of tasks) {
      console.log(task);
    }
  } catch (error) {
    console.error(error.message);
  }
}

async function sortTasksByStatus() {
  try {
    const tasks = await Task.find({}).sort({ status: 1 });

    if (!tasks) {
      console.log("No tasks found");
      return;
    }

    console.log("Tasks sorted by status");

    for (const task of tasks) {
      console.log(task);
    }
  } catch (error) {
    console.error(error.message);
  }
}

module.exports = {
  createAdminAccount,
  createUser,
  createCategory,
  deleteAllUsers,
  createTask,
  updateTask,
  deleteTask,
  updateStatus,
  deleteAllTasks,
  displayAllTasks,
  filterTasksByTitle,
  filterTasksByDescription,
  filterTasksByCategory,
  filterTasksByStatus,
  sortTasksByDueDate,
  sortTasksByPriorityLevel,
  sortTasksByStatus,
};
