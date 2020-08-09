import React, { useEffect } from 'react';
import storage from 'store2';
import updated from 'immutability-helper';
import { Menu, Layout } from 'antd';
import { Link } from 'react-router-dom';
import pathToRegexp from 'path-to-regexp';
import { useImmer } from 'use-immer';
import { SettingFilled } from '@ant-design/icons';

import { LOGIN_INFO_STORAGE_KEY } from '@/utils/define';
import { isUrl } from '@/utils/is';

const { SubMenu, Item } = Menu;

const { Sider } = Layout;

const recursionChildren = (item, childrenData) => {
  const { id: key } = item;

  const children = childrenData[key];

  if (!Array.isArray(children)) {
    return [];
  }

  return children.map((current) => {
    const { name, icon, path, parentPath, id } = current;

    return {
      name,
      icon,
      path,
      parentPath,
      id,
    };
  });
};

const getMenuMatches = (flatMenu, path) => {
  return flatMenu
    .filter((item) => {
      if (item.path === '/' && path === '/') {
        return true;
      }
      if (item && item.path !== '/') {
        // /a
        if (pathToRegexp(`${item.path}`).test(path)) {
          return true;
        }
        // /a/b/b
        if (pathToRegexp(`${item.path}(.*)`).test(path)) {
          return true;
        }
      }
      return false;
    })
    .sort((a, b) => {
      if (a.path === path) {
        return 100;
      }
      if (b.path === path) {
        return -100;
      }
      return a.path.substr(1).split('/').length - b.path.substr(1).split('/').length;
    })
    .pop();
};

const LeftNavSider = () => {
  const [state, updateState] = useImmer({
    menus: [],
    flatMenus: [],
    rootSubmenuKeys: [],
  });

  const [openMenuKeysState, updateOpenMenuKeys] = useImmer({
    selectedKeys: [],
    openKeys: [],
  });

  const { selectedKeys, openKeys } = openMenuKeysState;

  useEffect(() => {
    const { menus } = storage.get(LOGIN_INFO_STORAGE_KEY) || { menus: [] };

    const subMenu = [];

    const subMenuChildren = {};

    menus.forEach((item) => {
      const { pid } = item;
      if (!pid) {
        subMenu.push(item);
      } else if (Reflect.has(subMenuChildren, pid)) {
        subMenuChildren[pid] = updated(subMenuChildren[pid], {
          $push: [item],
        });
      } else {
        subMenuChildren[pid] = [item];
      }
    });

    const newFlatMenus = [];

    const menusConfig = subMenu.map((item) => {
      const { name, icon, id, path } = item;

      const children = recursionChildren(item, subMenuChildren);
      newFlatMenus.push({ name, icon, path, id });

      if (Array.isArray(children)) {
        newFlatMenus.push(...children);
      }
      return {
        name,
        icon,
        path,
        id,
        children,
      };
    });

    updateState((draft) => {
      draft.menus = menusConfig;
      draft.flatMenus = newFlatMenus;
      draft.rootSubmenuKeys = menusConfig.map((item) => item.path);
    });
  }, [updateState]);

  const { pathname } = location;
  const { menus, flatMenus, rootSubmenuKeys } = state;

  useEffect(() => {
    const { path, parentPath } = getMenuMatches(flatMenus, pathname) || {};

    const animationFrameId = requestAnimationFrame(() => {
      updateOpenMenuKeys((draft) => {
        draft.openKeys = Array.isArray(parentPath) ? parentPath : [];
        draft.selectedKeys = path ? [path] : [];
      });
    });
    return () => window.cancelAnimationFrame && window.cancelAnimationFrame(animationFrameId);
  }, [pathname, flatMenus, updateOpenMenuKeys]);

  const renderItem = (item) => {
    const { path, name } = item;

    return (
      <Item key={path}>
        {isUrl(path) ? (
          <a target="_blank" href={path} rel="noreferrer">
            <SettingFilled />
            <span>{name}</span>
          </a>
        ) : (
          <Link to={path}>
            <SettingFilled />
            <span>{name}</span>
          </Link>
        )}
      </Item>
    );
  };

  const renderMenu = (menu) => {
    if (!menu.length) return null;

    return menu.map((item) => {
      const { name, path, children } = item;
      return Array.isArray(children) && children.length ? (
        <SubMenu
          title={
            <>
              <SettingFilled />
              <span>{name}</span>
            </>
          }
          key={path}
        >
          {renderMenu(children)}
        </SubMenu>
      ) : (
        renderItem(item)
      );
    });
  };

  const handleOpenChange = (nowOpenKeys) => {
    const latestOpenKey = nowOpenKeys.find((key) => openKeys.indexOf(key) === -1);

    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      updateOpenMenuKeys((draft) => {
        draft.openKeys = nowOpenKeys;
      });
    } else {
      updateOpenMenuKeys((draft) => {
        draft.openKeys = latestOpenKey ? [latestOpenKey] : [];
      });
    }
  };

  return (
    <Sider width={160} collapsible trigger={null} collapsed={false}>
      <Menu
        mode="inline"
        theme="dark"
        selectedKeys={selectedKeys}
        openKeys={openKeys}
        onOpenChange={handleOpenChange}
        inlineIndent={15}
      >
        {renderMenu(menus)}

        <Item key="/main/menu">
          <Link to="/main/menu">
            <span>开发菜单</span>
          </Link>
        </Item>
      </Menu>
    </Sider>
  );
};

export default LeftNavSider;
