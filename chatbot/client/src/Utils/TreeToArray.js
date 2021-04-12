export default function treeToArray(obj) {
  console.log(obj);
  let resArray = [],
    q = [{ ...obj, level: 1 }],
    counter = 1,
    levx = { 1: 0 },
    qq = [counter],
    cur,
    id;
  resArray.push({
    id: `1`,
    type: 'input',
    data: {
      label: obj.path,
      action: obj.action,
      placeholder: obj.placeholder ? obj.placeholder.join('---') : '',
      payload: obj.payload,
    },
    position: { x: 200, y: 20 },
  });
  while (q.length) {
    cur = q.shift();
    id = qq.shift();

    if (cur.childRoutes) {
      // eslint-disable-next-line no-loop-func
      cur.childRoutes.map((n) => {
        let nid = ++counter;
        q.push({ ...n, level: cur.level + 1 });
        levx[cur.level + 1] = 0;
        qq.push(`${nid}`);
        resArray.push({
          id: `e${id}-${nid}`,
          source: `${id}`,
          target: `${nid}`,
        });

        resArray.push({
          id: `${nid}`,
          type: `${n.childRoutes ? 'default' : 'output'}`,
          data: {
            label: n.path,
            action: n.action,
            placeholder: n.placeholder ? n.placeholder.join('---') : '',
            payload: n.payload,
          },
          position: { x: levx[cur.level]++ * 200, y: 20 + cur.level * 60 },
        });
        return n;
      });
    }
  }
  return { array: resArray, i: counter };
}
