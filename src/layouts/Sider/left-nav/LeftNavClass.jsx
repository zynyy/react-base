import { isUrl } from '@/utils/is';
import { compareSimilarity } from '@/utils/utils';
import { SettingFilled } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import updated from 'immutability-helper';
import { pathToRegexp } from 'path-to-regexp';
import React from 'react';
import { Link } from 'react-router-dom';

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

const getMenuMatches = (flatMenu, path) =>
  flatMenu
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
    .map((item) => ({
      ...item,
      weight: compareSimilarity(item.path, path),
    }))
    .sort((a, b) => {
      if (a.weight > b.weight) {
        return -1;
      }
      if (a.weight < b.weight) {
        return 1;
      }
      return 0;
    })
    .pop();

class LeftNavClassSider extends React.Component {
  // static getDerivedStateFromProps() {

  // }

  constructor(props) {
    super(props);
    this.state = {
      menus: [],
      flatMenus: [],
      rootSubmenuKeys: [],
      selectedKeys: [],
      openKeys: [],
    };
  }

  componentDidMount() {
    //  storage.get(LOGIN_INFO_STORAGE_KEY) ||
    const { menus } = {
      menus: [
        {
          name: '菜单',
          path: '/main-class',
          id: '129',
        },
        {
          name: '组件菜单',
          path: '/main-class/component',
          parentPath: '/main-class',
          pid: '129',
          id: '123456789',
        },
        {
          name: '开发菜单',
          path: '/main-class/menu',
          parentPath: '/main-class',
          pid: '129',
          id: '1234569',
        },
        {
          name: '客户列表',
          path: '/main-class/client',
          parentPath: '/main-class',
          pid: '129',
          id: '123569',
        },
      ],
    };

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

    this.setState({
      menus: menusConfig,
      flatMenus: newFlatMenus,
      rootSubmenuKeys: menusConfig.map((item) => item.path),
    });
  }

  componentDidUpdate() {
    const { pathname } = location;

    const { flatMenus, selectedKeys } = this.state;
    const { path, parentPath } = getMenuMatches(flatMenus, pathname) || {};

    if (selectedKeys[0] !== path) {
      this.animationFrameId = requestAnimationFrame(() => {
        this.setState({
          openKeys: parentPath ? [parentPath] : [],
          selectedKeys: path ? [path] : [],
        });
      });
    }

    return false;
  }

  componentWillUnmount() {
    if (this.animationFrameId && window.cancelAnimationFrame) {
      window.cancelAnimationFrame(this.animationFrameId);
    }
  }

  renderItem = (item) => {
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

  renderMenu = (menu) => {
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
          {this.renderMenu(children)}
        </SubMenu>
      ) : (
        this.renderItem(item)
      );
    });
  };

  handleOpenChange = (nowOpenKeys) => {
    const { openKeys, rootSubmenuKeys } = this.state;

    const latestOpenKey = nowOpenKeys.find((key) => openKeys.indexOf(key) === -1);

    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({
        openKeys: nowOpenKeys,
      });
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : [],
      });
    }
  };

  render() {
    const { selectedKeys, openKeys, menus } = this.state;

    return (
      <Sider width={160} collapsible trigger={null} collapsed={false}>
        <Menu
          mode="inline"
          selectedKeys={selectedKeys}
          openKeys={openKeys}
          onOpenChange={this.handleOpenChange}
          inlineIndent={15}
        >
          {this.renderMenu(menus)}
        </Menu>
      </Sider>
    );
  }
}

export default LeftNavClassSider;
