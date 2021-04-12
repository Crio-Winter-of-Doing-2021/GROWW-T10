
export const routes = [
    {
        path: 'hi',
        params: {
            text: [" Hi! Choose what you want to eat: Hi! Choose what you want to eat: Hi! Choose what you want to eat: Hi! Choose what you want to eat:","Hi! Choose what you want to eat:"],
            reply: [
                { path: 'pizza', text: 'Pizzad sdg dg df d gfd gdg fdg d gdg d d g dgadg sfd gad g sGS gag sd gs gsd gds gdg sd g ' },
                { path: 'pasta', text: 'Pasta' },
                { path: 'pizza', text: 'Pizza' },
                { path: 'pasta', text: 'Pasta' },
                { path: 'pizza', text: 'Pizza' },
                { path: 'pasta', text: 'Pasta' },
                { path: 'pizza', text: 'Pizza' },
                { path: 'pasta', text: 'Pasta' }
            ]
        },
        action: "Hi",
        childRoutes: [
            {
                path: 'pizza',
                params: [],
                action: "Pizza",
                childRoutes: [
                    {
                        path: 'sausage',
                        params: [],
                        action: "Sausage",
                        childRoutes: [{
                            path: 'redirect',
                            redirect: 'hi'
                        }
                        ]
                    },
                    { path: 'bacon', params: [], action: "Bacon" },
                ],
            },
            {
                path: 'pasta',
                params: [],
                action: "Pasta",
                childRoutes: [
                    { path: 'cheese', params: [], action: "Cheese" },
                    { path: 'tomato', params: [], action: "Tomato" },
                ],
            },
        ],
    },
    {
        path: 'end',
        params: [],
        action: "Bye"
    }
]
