const list = document.getElementById("ft_list");

function setCookie(name, value) {
    document.cookie =
        name + "=" + encodeURIComponent(JSON.stringify(value)) +
        ";path=/;expires=Fri, 31 Dec 9999 23:59:59 GMT";
}

function getCookie(name) {
    const match = document.cookie.match(
        new RegExp("(^| )" + name + "=([^;]+)")
    );
    return match ? JSON.parse(decodeURIComponent(match[2])) : [];
}

window.addEventListener("load", () => {
    const saved = JSON.parse(localStorage.getItem("todo")) || [];
    saved.forEach(text => addTask(text, false));
});

function save() {
    const todos = Array.from(list.children).map(div => div.innerText);
    localStorage.setItem("todo", JSON.stringify(todos));
}

function newTodo() {
    const text = prompt("New TO DO:");
    if (!text || !text.trim()) return;

    addTask(text.trim(), true);
    save();
}

function addTask(text, addOnTop) {
    const div = document.createElement("div");
    div.innerText = text;

    div.onclick = function () {
        if (confirm("Remove this TO DO?")) {
            div.remove();
            save();
        }
    };

    addOnTop ? list.prepend(div) : list.appendChild(div);
}
