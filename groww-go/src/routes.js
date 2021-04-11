import Bacon from './actions/bacon'
import Cheese from './actions/cheese'
import Hi from './actions/hi'
import Pasta from './actions/pasta'
import Pizza from './actions/pizza'
import Sausage from './actions/sausage'
import Tomato from './actions/tomato'
import Bye from './actions/bye'

export const routes = [
    {
        path: 'hi',
        params: [],
        action: Hi,
        childRoutes: [
            {
                path: 'pizza',
                params: [],
                action: Pizza,
                childRoutes: [
                    {
                        path: 'sausage',
                        params: [],
                        action: Sausage,
                        childRoutes: [{
                            path: 'redirect',
                            redirect: 'hi'
                        }
                        ]
                    },
                    { path: 'bacon', params: [], action: Bacon },
                ],
            },
            {
                path: 'pasta',
                params: [],
                action: Pasta,
                childRoutes: [
                    { path: 'cheese', params: [], action: Cheese },
                    { path: 'tomato', params: [], action: Tomato },
                ],
            },
        ],
    },
    {
        path: 'end',
        params: [],
        action: Bye
    }
]
