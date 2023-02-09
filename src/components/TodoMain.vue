<template>
    <div class="page">
        <header><h1>Vue Fire todo1</h1></header>
        <main>
            <div class="todos">
                <transition name="fade">
                    <div v-if="writeState === 'add'" class="write" key="add">
                        <input ref="writeArea" @keypress.enter="addItem" type="text" v-model="addItemText" />
                        <button @click="addItem" class="btn add">Add</button>
                    </div>
                    <div v-else-if="writeState === 'edit'" class="write edit" key="edit">
                        <input ref="writeArea" @keypress.enter="editSave" type="text" v-model="editItemText" />
                        <button @click="editSave" class="btn add">Save</button>
                    </div>
                </transition>
                <ul class="list" ref="list">
                    <li v-for="(todo, i) in todos" :key="i">
                        <i @click="checkItem(i)" class="fa-check-square" :class="todo.state === 'yet' ? 'far' : 'fas'"></i>
                        <span>
                            {{ todo.text }}
                            <b>
                                <a href="" @click.prevent="editShow(i)">Edit</a>
                                <a href="" @click.prevent="delItem(i)">Del</a>
                            </b>
                        </span>
                    </li>
                </ul>
            </div>
        </main>
    </div>
</template>

<script>
import { db } from "../firebase/db";
export default {
    data() {
        return {
            addItemText: "",
            crrEditItem: "",
            editItemText: "",
            writeState: "add",
            todos: [],
        };
    },
    methods: {
        addItem() {
            if (this.addItemText) {
                db.collection("todos")
                    .add({
                        text: this.addItemText,
                        state: "yet",
                    })
                    .then((sn) => {
                        db.collection("todos").doc(sn.id).update({
                            id: sn.id,
                        });
                    });
                this.addItemText = "";
            }
        },

        checkItem(index) {
            if (this.todos[index].state === "yet") {
                this.todos[index].state = "done";
            } else {
                this.todos[index].state = "yet";
            }
        },

        editShow(index) {
            this.writeState = "edit";
            this.crrEditItem = index;
            this.editItemText = this.todos[this.crrEditItem].text;
            this.$refs.list.children[index].classList.add("editing");
        },

        editSave() {
            this.writeState = "add";
            db.collection("todos").doc(this.todos[this.crrEditItem].id).update({
                text: this.editItemText,
            });
            // this.todos[this.crrEditItem].text = this.editItemText;
            this.$refs.list.children[this.crrEditItem].classList.remove("editing");
        },

        delItem(index) {
            // this.todos.splice(index, 1);
            db.collection("todos").doc(this.todos[index].id).delete();
        },
    },
    mounted() {
        this.$refs.writeArea.focus();
        db.collection("todos")
            .get()
            .then((result) => {
                result.forEach((doc) => {
                    console.log(doc.data());
                    this.todos.push(doc.data());
                });
            });
    },

    firestore: {
        todos: db.collection("todos"),
    },
};
</script>

<style></style>
