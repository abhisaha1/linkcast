import {
    navClicked,
    fetchData,
    onScroll,
    closeModal,
    setVersion,
    resetMessage
} from "./common";
import {
    fetchNotifications,
    notificationClicked,
    setNotificationCount,
    notificationJoinedGroup
} from "./notification";
import {
    fetchGroups,
    setGroups,
    fetchAllGroups,
    fetchGroupUsers,
    setDefaultGroup,
    joinGroup,
    leaveGroup,
    acceptGroupInvite,
    rejectGroupInvite,
    saveEditedGroup
} from "./group";
import { onTabChange } from "./tab";
import {
    fetchItems,
    handleFavourite,
    handleLike,
    showComments,
    handleShare,
    handleDelete,
    fetchComments,
    handleCommentInput,
    itemClicked,
    lazyLoad,
    loadMore
} from "./items";
import {
    initialize,
    doLogin,
    doRegister,
    saveProfile,
    saveCustomization,
    doLogout,
    showProfile,
    getUserLinks
} from "./user";
import { doPost, detectSite } from "./post";
import {
    showInviteModal,
    setInviteList,
    sendInvites,
    withdrawInvite
} from "./invite";

export default {
    initialize,
    navClicked,
    fetchNotifications,
    fetchGroups,
    setGroups,
    fetchItems,
    onTabChange,
    onScroll,
    loadMore,
    fetchAllGroups,
    fetchGroupUsers,
    doLogin,
    doLogout,
    doRegister,
    saveProfile,
    saveCustomization,
    handleFavourite,
    handleLike,
    showComments,
    handleShare,
    handleDelete,
    fetchComments,
    detectSite,
    doPost,
    setDefaultGroup,
    notificationClicked,
    closeModal,
    handleCommentInput,
    itemClicked,
    joinGroup,
    leaveGroup,
    lazyLoad,
    showProfile,
    getUserLinks,
    setNotificationCount,
    setVersion,
    showInviteModal,
    setInviteList,
    sendInvites,
    withdrawInvite,
    notificationJoinedGroup,
    acceptGroupInvite,
    rejectGroupInvite,
    saveEditedGroup,
    resetMessage
};
