/**
 * @author: Michael
 * @date: 2017-07-19 18:03:36
 * @last modified by: Michael
 * @last modified time: 2017-07-19 18:03:36
 * @gitHub: https://github.com/maxsmu
*/
import React, { Component } from 'react';
import { Menu, Icon, Button } from 'antd';
import cssStyle from './menu-bar.scss';

import { Link } from 'react-router-dom';

const SubMenu = Menu.SubMenu;

export default class MenuBar extends Component {
	state = {
		collapsed: false
	}
	/**
	 * 点击收起按钮触发时间
	 */
	toggleCollapsed = () => {
		this.setState({
			collapsed: !this.state.collapsed
		});
	}
	render() {
		const { menus = [] } = this.props;
		// menuList,
		let boxStyle = {}

		// 接受父类组件设置的样式，存在则使用
		if (this.props.style) {
			boxStyle = {
				...this.props.style,
				flex: this.state.collapsed ? '0 0 60px' : '0 0 210px'
			}
		}

		const subMenus = menus.map(menu => {
			// 是否存在子菜单
			const isHasChildren = Array.isArray(menu.children) && menu.children.lenght > 0;
			let icon;

			// 根据是否存在子类分类处理
			if (isHasChildren) {
				// 若存在iconfont 则使用（但优先级低于icon）
				if (menu.iconfont) {
					icon = <i className={`iconfont ${menu.iconfont} ${cssStyle.iconfont}`} />
				}

				// 若存在icon 则使用（但优先级高于iconfont）
				if (menu.icon) {
					icon = <Icon type={menu.icon} />
				}
				const title = <span>{icon}<span>{menu.name}</span></span>;

				return (
					<SubMenu key={menu.key} title={title}>
						{
							menu.children.map(sub => {
								return (
									<Menu.Item key={sub.key}>
										<Link to={sub.path}>
											<span>{sub.name}</span>
										</Link>
									</Menu.Item>
								);
							})
						}
					</SubMenu>
				);

			} else {
				// 若存在iconfont 则使用（但优先级低于icon）
				if (menu.iconfont) {
					icon = <i className={`iconfont ${menu.iconfont} ${cssStyle.iconfont}`} />
				}

				// 若存在icon 则使用（但优先级高于iconfont）
				if (menu.icon) {
					icon = <Icon type={menu.icon} />
				}

				return (
					<Menu.Item key={menu.key}>
						<Link to={menu.path}>
							{icon}
							<span>{menu.name}</span>
						</Link>
					</Menu.Item>
				);
			}
		});

		return (
			<div style={boxStyle} >
				<Button className={cssStyle.sidebarToggleBtn} ghost type="primary" onClick={this.toggleCollapsed}>
					<Icon type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} style={{ color: '#797979' }} />
				</Button>
				<Menu
					defaultSelectedKeys={['1']}
					defaultOpenKeys={['sub1']}
					mode="inline"
					theme="dark"
					style={{ height: '100%', overflowY: 'scroll' }}
					inlineCollapsed={this.state.collapsed}
				>

					{subMenus}

					{/* <Menu.Item key="2">
						<Icon type="desktop" />
						<span>Option 2</span>
					</Menu.Item>
					<Menu.Item key="3">
						<Icon type="inbox" />
						<span>Option 3</span>
					</Menu.Item>
					<SubMenu key="sub1" title={<span><Icon type="mail" /><span>Navigation One</span></span>}>
						<Menu.Item key="5">Option 5</Menu.Item>
						<Menu.Item key="6">Option 6</Menu.Item>
						<Menu.Item key="7">Option 7</Menu.Item>
						<Menu.Item key="8">Option 8</Menu.Item>
					</SubMenu>
					<SubMenu key="sub2" title={<span><Icon type="appstore" /><span>Navigation Two</span></span>}>
						<Menu.Item key="9">Option 9</Menu.Item>
						<Menu.Item key="10">Option 10</Menu.Item>
						<SubMenu key="sub3" title="Submenu">
							<Menu.Item key="11">Option 11</Menu.Item>
							<Menu.Item key="12">Option 12</Menu.Item>
						</SubMenu>
					</SubMenu> */}
				</Menu>
			</div>
		);
	}
}
