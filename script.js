// 1. Charger les tâches mli t-fettah la page
document.addEventListener("DOMContentLoaded", () => {
    loadTasks();

    // Permettre d'ajouter avec la touche "Enter"
    document.getElementById("taskInput").addEventListener("keypress", (e) => {
        if (e.key === "Enter") addTask();
    });
});

function formatTaskDate(dateValue) {
    const date = new Date(dateValue);

    if (Number.isNaN(date.getTime())) {
        return "Date inconnue";
    }

    return date.toLocaleString("fr-FR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    });
}

function addTask() {
    const input = document.getElementById("taskInput");
    const taskText = input.value.trim();

    if (!taskText) {
        alert("Veuillez saisir une tâche !");
        return;
    }

    const createdAt = new Date().toISOString();
    createTaskElement(taskText, false, false, createdAt);
    saveTasks();

    input.value = "";
    input.focus();
}

function createTaskElement(text, completed = false, urgent = false, createdAt = new Date().toISOString()) {
    const li = document.createElement("li");
    li.style.cssText = "display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px; transition: all 0.3s ease;";
    li.dataset.createdAt = createdAt;

    const taskContent = document.createElement("div");
    taskContent.style.display = "flex";
    taskContent.style.flexDirection = "column";
    taskContent.style.gap = "4px";

    const span = document.createElement("span");
    span.textContent = text;
    span.style.cursor = "pointer";
    span.title = "Cliquer pour marquer comme terminé";

    if (completed) span.style.textDecoration = "line-through";
    if (urgent) span.style.color = "#e74c3c";

    const meta = document.createElement("small");
    meta.className = "task-meta";
    meta.textContent = `Ajoutée le ${formatTaskDate(createdAt)}`;

    taskContent.appendChild(span);
    taskContent.appendChild(meta);

    // Toggle Completed (Click)
    span.onclick = () => {
        span.style.textDecoration = span.style.textDecoration === "line-through" ? "none" : "line-through";
        saveTasks();
    };

    // Toggle Urgent (Double Click)
    span.ondblclick = () => {
        span.style.color = span.style.color === "rgb(231, 76, 60)" ? "inherit" : "#e74c3c";
        saveTasks();
    };

    // Bouton Supprimer
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "❌";
    deleteBtn.style.cssText = "border: none; background: transparent; cursor: pointer;";
    deleteBtn.onclick = () => {
        li.style.opacity = "0";
        li.style.transform = "translateX(20px)";
        setTimeout(() => {
            li.remove();
            saveTasks();
        }, 300);
    };

    li.appendChild(taskContent);
    li.appendChild(deleteBtn);
    document.getElementById("taskList").appendChild(li);
}

// 2. Sauvegarder f LocalStorage
function saveTasks() {
    const tasks = [];
    document.querySelectorAll("#taskList li").forEach(li => {
        const span = li.querySelector("span");
        tasks.push({
            text: span.textContent,
            completed: span.style.textDecoration === "line-through",
            urgent: span.style.color === "rgb(231, 76, 60)",
            createdAt: li.dataset.createdAt || new Date().toISOString()
        });
    });
    localStorage.setItem("myTasks", JSON.stringify(tasks));
}

// 3. Charger les tâches au démarrage
function loadTasks() {
    const saved = localStorage.getItem("myTasks");
    if (saved) {
        const tasks = JSON.parse(saved);
        tasks.forEach(t => createTaskElement(t.text, t.completed, t.urgent, t.createdAt || new Date().toISOString()));
    }
}

function filterTasks(filter) {
    const tasks = document.querySelectorAll("#taskList li");

    tasks.forEach(li => {
        const span = li.querySelector("span");
        const isCompleted = span.style.textDecoration.includes("line-through");

        if (filter === "all") {
            li.style.display = "flex";
        } else if (filter === "completed") {
            li.style.display = isCompleted ? "flex" : "none";
        }
    });
}