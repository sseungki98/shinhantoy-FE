<template>
    <div class="page">
        <header><h1>Vue Fire todo1</h1></header>
        <main>
            <div class="todos">
                <div v-if="writeState === 'add'" class="write">
                    <input ref="writeArea" @keypress.enter="addItem" type="text" v-model="addItemText" />
                    <button @click="addItem" class="btn add">Add</button>
                </div>
                <div v-else-if="writeState === 'edit'" class="write edit">
                    <input ref="writeArea" @keypress.enter="editSave" type="text" v-model="editItemText" />
                    <button @click="editSave" class="btn add">Save</button>
                </div>
                <ul class="list">
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
export default {
    data() {
        return {
            addItemText: "",
            crrEditItem: "",
            editItemText: "",
            writeState: "add",
            todos: [
                { text: "공부하기", state: "yet" },
                { text: "운동하기", state: "done" },
                { text: "글쓰기", state: "done" },
            ],
        };
    },
    methods: {
        addItem() {
            if (this.addItemText) {
                this.todos.push({
                    text: this.addItemText,
                    state: "yet",
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
        },

        editSave() {
            this.writeState = "add";
            this.todos[this.crrEditItem].text = this.editItemText;
        },

        delItem(index) {
            this.todos.splice(index, 1);
        },
    },
    mounted() {
        this.$refs.writeArea.focus();
    },
};
</script>

<style>
.edit {
    border: 2px solid green;
}
</style>
