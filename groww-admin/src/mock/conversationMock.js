import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import { mock } from 'src/utils';
const position = { x: 0, y: 0 };
const edgeType = 'smoothstep';

const db = {
    conversations: [{
        id: '5e8891ab188cd2855e6029b7',
        name: 'Stock',
        createdAt: moment().toISOString(),
        updatedAt: moment().toISOString(),
        isActive: true,
        routes: [
            {
                id: '1',
                type: 'input',
                data: { label: 'input', action: 'MultiChoice' },
                position,
              }
            
        ]
    },
    {
        id: '5e887a62195cc5aef7e8ca5d',
        name: 'Mutual Funds',
        createdAt: moment().toISOString(),
        updatedAt: moment().toISOString(),
        isActive: true,
    },
    {
        id: '5e887a62195cc5aef7e8ca24',
        name: 'Gold',
        createdAt: moment().toISOString(),
        updatedAt: moment().toISOString(),
        isActive: true,
    },
    {
        id: '5e887a62195cc5aef7e81111',
        name: 'US Stocks',
        createdAt: moment().toISOString(),
        updatedAt: moment().toISOString(),
        isActive: true,
    }
    ]
};

mock.onGet('/api/bot/conversations').reply(200, {
    conversations: db.conversations
})

mock.onPost('/api/bot/conversations/new').reply((request) => {
    const { name } = JSON.parse(request.data);
    let obj = {};
    obj.id = uuidv4();
    obj.name = name;
    obj.createdAt = moment().toISOString()
    obj.updatedAt = moment().toISOString()
    db.conversations.push(obj);
    return [200, obj];
});

mock.onGet(/api\/bot\/conversations\/?.*/).reply((request) => {
    const { id } = parseQueryString(request.url);

    const obj = db.conversations.find((conversation) => conversation.id === id);
    return [202, obj];
});

function parseQueryString(url) {
    const queryString = url.replace(/.*\?/, '');

    if (queryString === url || !queryString) {
        return null;
    }

    const urlParams = new URLSearchParams(queryString);
    const result = {};

    urlParams.forEach((val, key) => {
        if (result.hasOwnProperty(key)) {
            result[key] = [result[key], val];
        } else {
            result[key] = val;
        }
    });

    return result;
}
