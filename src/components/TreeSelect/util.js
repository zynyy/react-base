import update from 'immutability-helper';

const recursionChildren = (key, treeChildren) => {
  const data = treeChildren[key];

  if (!Array.isArray(data)) {
    return [];
  }

  return data.map((item) => {
    const { id } = item;
    return {
      ...item,
      children: recursionChildren(id, treeChildren),
    };
  });
};

export const transformTreeData = (data) => {
  if (!Array.isArray(data)) return data;

  const treeChildren = {};

  const treeData = data.map((current) => {
    const { pid, name, id } = current;

    const exist = data.some((item) => (pid ? item.id === pid : true));

    const obj = {
      ...current,
      parentId: exist ? pid : undefined,
      title: name,
      key: id,
      value: id,
      name,
      id,
    };

    if (obj.parentId) {
      if (Reflect.has(treeChildren, pid)) {
        treeChildren[pid] = update(treeChildren[pid], {
          $push: [obj],
        });
      } else {
        treeChildren[pid] = [obj];
      }
    }

    return obj;
  });

  const rootTreeData = treeData.filter((obj) => !obj.parentId);

  return rootTreeData.map((current) => {
    const { id } = current;
    return {
      ...current,
      children: recursionChildren(id, treeChildren),
    };
  });
};
