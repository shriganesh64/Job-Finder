const ITEM_HEIGHT = 40;
const MenuItemAvatarDimension = 36;

export default theme => ({
    menuAvatar: {
        width: MenuItemAvatarDimension,
        height: MenuItemAvatarDimension
    },
    menuItemAvatar: {
        width: MenuItemAvatarDimension / 2,
        height: MenuItemAvatarDimension / 2,
        marginRight: MenuItemAvatarDimension / 2
    },
    menuPaper: {
        marginTop: 50,
        minHeight: ITEM_HEIGHT * 2,
        width: 160
    },
    container: { padding: '5px 20px' }
});
