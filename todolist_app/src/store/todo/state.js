export default function() {
    return {
        todolists: [
            {
                id: 1,
                list_name: 'list 1',
                todos: [
                    {
                        id: 1,
                        name: "list 1 task 1",
                        completed: false
                    },
                    {
                        id: 2,
                        name: "list 1 task 2",
                        completed: false
                    }
                ]
            }
        ],
        cpt: 3,
        list_cpt : 2,
        currentListId: 1
    }
}