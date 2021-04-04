export default function arrayToTree(elems) {
  let nodes = {},
    paths = {};

  elems.map((elem) => {
    if (elem.source) {
      if (paths[elem.source]) {
        paths[elem.source].push(elem.target);
      } else {
        paths[elem.source] = [elem.target];
      }
    } else {
      let curdata = elem.data;
      curdata.path = curdata.label;
      delete curdata.label;
      nodes[elem.id] = curdata;
    }
    return elem;
  });

  let postObject = nodes['1'],
    q = [postObject],
    qq = ['1'],
    el,
    cur;
  postObject.placeholder = postObject.placeholder
    ? postObject.placeholder.split('---')
    : [];
  while (q.length) {
    cur = q.shift();
    el = qq.shift();
    if (!paths[el]) continue;
    // eslint-disable-next-line no-loop-func
    paths[el].map((pt) => {
      if (cur.childRoutes) {
        cur.childRoutes.push(nodes[pt]);
      } else {
        cur.childRoutes = [nodes[pt]];
      }
      qq.push(pt);
      return pt;
    });
    cur.childRoutes.map((elem) => {
      q.push(elem);
      elem.placeholder = elem.placeholder ? elem.placeholder.split('---') : [];
      return elem;
    });
  }
  return postObject;
}
