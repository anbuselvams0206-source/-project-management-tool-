let projects = [];

function createProject() {
    const input = document.getElementById("projectName");
    const projectName = input.value.trim();

    if (projectName === "") {
        alert("Please enter a project name.");
        return;
    }

    const project = {
        id: Date.now(),
        name: projectName,
        tasks: []
    };

    projects.push(project);
    input.value = "";

    displayProjects();
}

function displayProjects() {
    const container = document.getElementById("projects");
    container.innerHTML = "";

    projects.forEach(project => {
        const card = document.createElement("div");
        card.className = "project-card";

        card.innerHTML = `
            <h3>${project.name}</h3>

            <input type="text" id="task-${project.id}" placeholder="New Task">

            <button onclick="addTask(${project.id})">
                Add Task
            </button>

            <ul id="list-${project.id}"></ul>
        `;

        container.appendChild(card);

        displayTasks(project.id);
    });
}

function addTask(projectId) {
    const input = document.getElementById(`task-${projectId}`);
    const taskName = input.value.trim();

    if (taskName === "") {
        alert("Enter a task.");
        return;
    }

    const project = projects.find(p => p.id === projectId);

    project.tasks.push({
        name: taskName,
        completed: false
    });

    input.value = "";
    displayProjects();
}

function displayTasks(projectId) {
    const project = projects.find(p => p.id === projectId);

    const list = document.getElementById(`list-${projectId}`);

    if (!list) return;

    list.innerHTML = "";

    project.tasks.forEach((task, index) => {

        const li = document.createElement("li");

        li.innerHTML = `
            <input type="checkbox"
                ${task.completed ? "checked" : ""}
                onchange="toggleTask(${projectId},${index})">

            ${task.name}

            <button onclick="deleteTask(${projectId},${index})">
                Delete
            </button>
        `;

        list.appendChild(li);
    });
}

function toggleTask(projectId, taskIndex) {
    const project = projects.find(p => p.id === projectId);

    project.tasks[taskIndex].completed =
        !project.tasks[taskIndex].completed;

    displayProjects();
}

function deleteTask(projectId, taskIndex) {
    const project = projects.find(p => p.id === projectId);

    project.tasks.splice(taskIndex, 1);

    displayProjects();
}
