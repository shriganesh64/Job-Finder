import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router';
import classNames from 'classnames';
import compose from 'recompose/compose';
import PropTypes from 'prop-types';
import { List, ListItem, ListItemIcon, ListItemText, withStyles, Collapse } from '@material-ui/core';
import styles from './styles';
import { SidebarItems } from '../../../configs';
import { ExpandLess, ExpandMore } from '@material-ui/icons';

class Sidebar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			openKey: ''
		};
	}

	renderMenuItem(item, index, subMenu) {
		const {
			classes,
			onClose,
			match: { path: currentPath },
			location: { pathname }
		} = this.props;

		const { title, icon: MenuIcon, activeIcon: ActiveMenuIcon, path } = item;
		const isActive = !!pathname.match(path);

		let showRoute = true;
		if (showRoute || false) {
			return (
				<ListItem
					key={index}
					activeClassName={classes.activeListItem}
					className={classNames(classes.listItem, {
						[classes.sectionActiveListItem]: subMenu
					})}
					component={NavLink}
					to={`${currentPath}${path}`}
					onClick={() => {
						onClose();
						this.setOpenKey();
						window.scrollTo(0, 0);
					}}
				>
					<ListItemIcon className={classes.listItemIcon}>{isActive ? <ActiveMenuIcon /> : <MenuIcon />}</ListItemIcon>
					<ListItemText classes={{ primary: classes.listItemText }} primary={title} />
				</ListItem>
			);
		} else return null;
	}

	setOpenKey(openKey) {
		this.setState(state => ({
			openKey: state.openKey === openKey ? '' : openKey
		}));
	}

	render() {
		const {
			classes,
			className,
			location: { pathname }
		} = this.props;

		const rootClassName = classNames(classes.root, className);

		return (
			<nav className={rootClassName}>
				<List className={classes.menuList} component='div' disablePadding>
					{SidebarItems.map((item, index) => {
						if (item.subList) {
							const isActive = item.subList.some(({ path }) => {
								return !!pathname.match(path);
							});

							let { icon: MenuIcon, activeIcon: ActiveMenuIcon } = item;
							let open = item.openKey === this.state.openKey || isActive;

							let dropDown = true;
							if (dropDown) {
								return (
									<React.Fragment>
										<ListItem
											key={index}
											className={classNames(classes.listItem, {
												[classes.sectionActiveListItem]: isActive
											})}
											onClick={this.setOpenKey.bind(this, item.openKey)}
										>
											<ListItemIcon className={classes.listItemIcon}>{isActive ? <ActiveMenuIcon /> : <MenuIcon />}</ListItemIcon>
											<ListItemText classes={{ primary: classes.listItemText }} primary={item.title} />
											{open ? <ExpandLess /> : <ExpandMore />}
										</ListItem>
										<Collapse in={open} timeout='auto'>
											<List className={classes.menuList} component='div' disablePadding>
												{item.subList.map((item, index) => this.renderMenuItem(item, index, true))}
											</List>
										</Collapse>
									</React.Fragment>
								);
							} else return null;
						}

						return this.renderMenuItem(item, index);
					})}
				</List>
			</nav>
		);
	}
}

Sidebar.propTypes = {
	isMobile: PropTypes.bool,
	isCollapsed: PropTypes.bool,
	className: PropTypes.string,
	classes: PropTypes.object.isRequired
};

export default compose(withRouter, withStyles(styles))(Sidebar);
