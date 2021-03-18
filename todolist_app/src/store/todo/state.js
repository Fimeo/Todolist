export default function() {
    return {
        currentListId: null,
        todolists: []
    }
}

/*
Todo list structure :

{
    createdAt,
    id,
    name,
    nb_todos,
    todos: [],
    updated_at,
    user_id
}

Todo structure :
completed: 0
created_at: "2021-03-15T22:09:20.000000Z"
id: 179
name: "new"
todolist_id: 60
updated_at: "2021-03-15T22:09:20.000000Z"

 */