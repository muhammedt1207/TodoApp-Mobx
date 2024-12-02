import { makeAutoObservable } from "mobx";

export interface TODO{
    id:number,
    completed:boolean,
    text:string
}

class TodoStore{
    todos:TODO[]=[];
    nextId=1

    constructor(){
        makeAutoObservable(this)
    }

    addTodo(text:string){
        this.todos.push({id:this.nextId++,text:text,completed:false})
    }
    toggleTodo(id:number){
        const todo=this.todos.find((t)=>t.id==id)
        if(todo){
            todo.completed=!todo.completed
        }
    }

    editTodo(id:number,newText:string){
        const todo=this.todos.find((t)=>t.id==id)
        if(todo){
            todo.text=newText
        }
    }

    removeTodo(id:number){
        this.todos=this.todos.filter((t)=>t.id!==id)
    }
}

export const todoStore=new TodoStore()