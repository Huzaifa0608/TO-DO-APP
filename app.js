// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.5/firebase-app.js";
// import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.5/firebase-analytics.js";
// import { getDatabase, push, set, ref, onValue, update, remove } from "https://www.gstatic.com/firebasejs/9.6.5/firebase-database.js";

// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//     // ADD YOURS
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// const Db = getDatabase()

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-analytics.js";
import { getDatabase, push, set, ref, onValue, update, remove } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAtZ2IQ_tp-4teo8lJ6Gy-8j3b-nEe0DB4",
  authDomain: "to-do-app-f35f5.firebaseapp.com",
  projectId: "to-do-app-f35f5",
  storageBucket: "to-do-app-f35f5.appspot.com",
  messagingSenderId: "834842392206",
  appId: "1:834842392206:web:b5d51badea31acbc94fbdf",
  measurementId: "G-Z244BSE1F1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const Db = getDatabase()

var inp = document.getElementById('inp')

window.add = function () {
    var obj = {
        todo: inp.value
    }

    var Userref = push(ref(Db, 'Todos/'))
    obj.id = Userref.key

    set(Userref, obj)
}


function get () {
    var render = document.getElementById('render')

    onValue(ref(Db, 'Todos/'), function (todo) {
        render.innerHTML = ""
        var Todos = Object.values(todo.val())
        for (var i = 0; i < Todos.length; i++) {
            var app = Todos[i]
            console.log(app.todo)
            render.innerHTML += `<li class="ms-3 pt-4"> ${app.todo}   <button  onclick="TodoUpdate('${app.id}')" class="btn bg-success p-2 px-5 ms-5  text-light">EDIT</button>
    <button onclick="Tododel('${app.id}')" class="btn bg-danger text-center p-2 px-5  text-light">DELETE</button> </li> `

        }
        inp.value = ""

    })
}
get()
window.Tododel = function (id) {
    remove(ref(Db, `Todos/${id}`))
}
window.deleteAll = function (id) {
    remove(ref(Db, `Todos/`))
}

window.TodoUpdate = function (id) {
    // console.log(id);
    var NewTodo = prompt('Enter Update')

    update(ref(Db, `Todos/${id}`), {
        todo: NewTodo,
    })
}