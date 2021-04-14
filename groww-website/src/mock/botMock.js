import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import mock from 'src/utils/mock';

const db = {
    conversations: [
        {
            id: uuidv4(),
            name: 'Login',
            createdAt: moment().toISOString(),
            updatedAt: moment().toISOString(),
            routes: {
                path: 'Login',
                params: {
                    text: [" Hi! Welcome to Login", "Can I help you with anything?"],
                    reply: [
                        { path: 'category', text: 'Sure!!', authRequired: false }
                    ]
                },
                action: 'MultiChoice',
                childRoutes: [{
                    path: 'category',
                    params: {
                        text: ["Would you like to recieve help among this categories?"],
                        reply: [
                            { path: 'Groww Account', text: 'Groww Account', authRequired: false },
                        ]
                    },
                    action: 'MultiChoice',
                    childRoutes: [{
                        path: 'Groww Account',
                        params: {
                            text: ["Would you like to recieve help among this categories?"],
                            reply: [
                                { path: 'Groww Account', text: 'Groww Account', authRequired: false },
                            ]
                        },
                        action: 'MultiChoice',
                    }]
                }]
            }
        },
        {
            id: uuidv4(),
            name: 'Stocks',
            createdAt: moment().toISOString(),
            updatedAt: moment().toISOString(),
            routes: {
                path: 'Stocks',
                params: {
                    text: [" Hi! Welcome to Stocks!", "Can I help you with anything?"],
                    reply: [
                        { path: 'category', text: 'Sure!!', authRequired: false }
                    ]
                },
                action: 'MultiChoice',
                childRoutes: [{
                    path: 'category',
                    params: {
                        text: ["Would you like to recieve help among this categories?"],
                        reply: [
                            { path: 'Getting Started', text: 'Getting Started', authRequired: false },
                            { path: 'About US Stocks', text: 'About US Stocks', authRequired: false },
                            { path: 'Funding', text: 'Funding', authRequired: true },
                            { path: 'Tax', text: 'Tax', authRequired: true }
                        ]
                    },
                    action: 'MultiChoice',
                }]
            }
        },
        {
            id: uuidv4(),
            name: 'Mutual Funds',
            createdAt: moment().toISOString(),
            updatedAt: moment().toISOString(),
            routes: {
                path: 'Mutual Funds',
                params: {
                    text: [" Hi! Welcome to Mutual Funds!", "Can I help you with anything?"],
                    reply: [
                        { path: 'category', text: 'Sure!!', authRequired: false }
                    ]
                },
                action: 'MultiChoice',
                childRoutes: [{
                    path: 'category',
                    params: {
                        text: ["Would you like to recieve help among this categories?"],
                        reply: [
                            { path: 'Getting Started', text: 'Getting Started', authRequired: false },
                            { path: 'About US Stocks', text: 'About US Stocks', authRequired: false },
                            { path: 'Funding', text: 'Funding', authRequired: true },
                            { path: 'Tax', text: 'Tax', authRequired: true }
                        ]
                    },
                    action: 'MultiChoice',
                }]
            }
        },
        {
            id: uuidv4(),
            name: 'KYC_Status',
            createdAt: moment().toISOString(),
            updatedAt: moment().toISOString(),
            routes: {
                path: 'KYC_Status',
                action: 'KYC_Status',
            }
        },
        {
            id: uuidv4(),
            name: 'Gold',
            createdAt: moment().toISOString(),
            updatedAt: moment().toISOString(),
            routes: {
                path: 'Gold',
                params: {
                    text: [" Hi! Welcome to Gold!", "Can I help you with anything?"],
                    reply: [
                        { path: 'category', text: 'Sure!!', authRequired: false }
                    ]
                },
                action: 'MultiChoice',
                childRoutes: [{
                    path: 'category',
                    params: {
                        text: ["Would you like to recieve help among this categories?"],
                        reply: [
                            { path: 'Getting Started', text: 'Getting Started', authRequired: false },
                            { path: 'About US Stocks', text: 'About US Stocks', authRequired: false },
                            { path: 'Funding', text: 'Funding', authRequired: true },
                            { path: 'Tax', text: 'Tax', authRequired: true }
                        ]
                    },
                    action: 'MultiChoice',
                }]
            }
        },
        {
            id: uuidv4(),
            name: 'US Stocks',
            createdAt: moment().toISOString(),
            updatedAt: moment().toISOString(),
            routes: {
                path: 'US Stocks',
                params: {
                    text: [" Hi! Welcome to US Stocks!", "Can I help you with anything?"],
                    reply: [
                        { path: 'category', text: 'Sure!!', authRequired: false }
                    ]
                },
                action: 'MultiChoice',
                childRoutes: [{
                    path: 'category',
                    params: {
                        text: ["Would you like to recieve help among this categories?"],
                        reply: [
                            { path: 'Getting Started', text: 'Getting Started', authRequired: false },
                            { path: 'About US Stocks', text: 'About US Stocks', authRequired: false },
                            { path: 'Funding', text: 'Funding', authRequired: true },
                            { path: 'Tax', text: 'Tax', authRequired: true }
                        ]
                    },
                    action: 'MultiChoice',
                    childRoutes: [{
                        path: 'Getting Started',
                        params: {
                            text: ["Alrighty!. Here are some of the FAQs I can provide you with!"],
                            reply: [
                                { path: 'Where is the account held? Who is responsible for the custody and clearing?', text: 'Where is the account held? Who is responsible for the custody and clearing?', authRequired: false },
                                { path: 'Who owns the shares?', text: 'Who owns the shares?', authRequired: false },
                                { path: 'How to add USD in Groww balance?', text: 'How to add USD in Groww balance?', authRequired: false }
                            ]
                        },
                        action: 'MultiChoice',
                        childRoutes: [{
                            path: 'Where is the account held? Who is responsible for the custody and clearing?',
                            params: {
                                text: ["Here goes your answer mentioned below!", "The brokerage account is managed by ViewTrade securities - an SEC registered and FINRA regulated broker for books and records, which works with Apex Clearing Corporation for trade the clearing and custodian aspects of user accounts.", "\n", "Did this answer helped resolve your queries?"],
                                reply: [
                                    { path: 'Yes', text: 'Yes', authRequired: false },
                                    { path: 'No', text: 'No', authRequired: false },
                                ]
                            },
                            action: 'MultiChoice',
                            childRoutes: [{
                                path: 'Yes',
                                params: {
                                    text: ["Thanks for your positive feedback!", "Would like to continue?"],
                                    reply: [
                                        { path: 'Yes Please!', text: 'Yes Please!', authRequired: false },
                                        { path: 'Nope', text: 'Nope', authRequired: false },
                                    ]
                                },
                                action: 'MultiChoice',
                                childRoutes: [{
                                    path: 'Yes Please!',
                                    redirect: 'US Stocks'
                                }],
                            },
                            {
                                path: 'No',
                                params: {
                                    text: ["We'll try to serve you better!", "Would like to continue?"],
                                    reply: [
                                        { path: 'Yes Please!', text: 'Yes Please!', authRequired: false },
                                        { path: 'Nope', text: 'Nope', authRequired: false },
                                    ]
                                },
                                action: 'MultiChoice',
                                childRoutes: [{
                                    path: 'Yes Please!',
                                    redirect: 'US Stocks'
                                }],
                            }
                            ]
                        }]
                    }]
                }
                ]
            }
        },
        {
            id: uuidv4(),
            name: 'Fixed Deposits',
            createdAt: moment().toISOString(),
            updatedAt: moment().toISOString(),
            routes: {
                path: 'Fixed Deposits',
                params: {
                    text: [" Hi! Welcome to Fixed Deposits!"],
                },
                action: 'MultiChoice'
            }
        },
        {
            id: uuidv4(),
            name: 'Orders',
            createdAt: moment().toISOString(),
            updatedAt: moment().toISOString(),
            routes: {
                path: 'Orders',
                params: {
                    text: [" Hi! Welcome to Orders!"],
                },
                action: 'MultiChoice'
            }
        }
    ]
};

mock.onGet('/api/bot/conversations/all').reply(200, {
    conversations: db.conversations.map((conversation) => {
        return conversation.routes
    })
})



