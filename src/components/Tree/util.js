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
    const { pId, name, id } = current;

    const exist = data.some((item) => {
      return pId ? item.id === pId : true;
    });

    const obj = {
      parentId: exist ? pId : undefined,
      title: name,
      key: id,
    };

    if (obj.parentId) {
      if (Reflect.has(treeChildren, pId)) {
        treeChildren[pId] = update(treeChildren[pId], {
          $push: [obj],
        });
      } else {
        treeChildren[pId] = [obj];
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

export const flattenData = (data, pId) => {
  if (!Array.isArray(data)) return [];
  return data.reduce((arr, current) => {
    const { children, id, ...rest } = current;
    return arr.concat(
      [
        {
          ...rest,
          pId,
          id,
        },
      ],
      flattenData(children, id),
    );
  }, []);
};

export const findMultiArray = (multiArray, findKey) => {
  if (!Array.isArray(multiArray)) return false;

  const { length } = multiArray;

  let index = 0;

  while (index < length) {
    const item = multiArray[index];

    const { key, children } = item;

    if (key === findKey) {
      return item;
    }

    if (children.length) {
      const findChildrenItem = findMultiArray(children, findKey);
      if (findChildrenItem) {
        return findChildrenItem;
      }
    }

    index += 1;
  }

  return false;
};
