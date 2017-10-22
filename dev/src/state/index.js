const mainNav = {
    tabs: {
        notification: {
            name: "Notifications",
            isFetching: true,
            loadMore: false,
            data: {
                rows: [],
                page: 1,
                pages: 0,
                total: 0
            },
            authorized: true
        },
        feed: {
            name: "Feed",
            isFetching: false,
            loadMore: false,
            data: {
                rows: [],
                page: 1,
                pages: 0,
                total: 0
            },
            authorized: true
        },
        post: {
            name: "Post",
            isFetching: false,
            loadMore: false,
            data: [],
            authorized: true
        },
        links: {
            name: "Links",
            isFetching: false,
            loadMore: false,
            data: [],
            authorized: true
        },
        search: {
            name: "Search",
            isFetching: false,
            loadMore: false,
            q: "",
            data: {
                rows: [],
                page: 1,
                pages: 0,
                total: 0
            },
            authorized: true
        },
        groups: {
            name: "Groups",
            isFetching: false,
            loadMore: false,
            data: [],
            authorized: true
        },
        settings: {
            name: "Settings",
            isFetching: false,
            loadMore: false,
            data: []
        }
    },
    active: "notification"
};
const notificationTabs = {
    tabs: {
        notLinks: {
            name: "Links",
            isFetching: true,
            loadMore: false,
            data: {
                rows: [],
                page: 1,
                pages: 0,
                total: 0
            }
        },
        notGroups: {
            name: "Groups",
            isFetching: false,
            loadMore: false,
            data: {
                rows: [],
                page: 1,
                pages: 0,
                total: 0
            }
        }
    },
    active: "notLinks"
};
const linkTabs = {
    tabs: {
        sent: {
            name: "Sent",
            isFetching: false,
            loadMore: false,
            data: {
                rows: [],
                page: 1,
                pages: 0,
                total: 0
            }
        },
        favourites: {
            name: "Favourites",
            isFetching: true,
            loadMore: false,
            data: {
                rows: [],
                page: 1,
                pages: 0,
                total: 0
            }
        }
    },
    active: "sent"
};

const settingsTabs = {
    tabs: {
        profile: {
            name: "Profile",
            isFetching: false,
            loadMore: false,
            data: []
        },
        customize: {
            name: "Customize",
            isFetching: true,
            loadMore: false,
            data: []
        },
        about: {
            name: "About",
            isFetching: false,
            loadMore: false,
            data: []
        }
    },
    active: "profile"
};

const groupTabs = {
    tabs: {
        public: {
            name: "Public",
            isFetching: true,
            loadMore: false,
            data: {
                rows: [],
                page: 1,
                pages: 0,
                total: 0
            }
        },
        manage: {
            name: "Manage",
            isFetching: true,
            loadMore: false,
            data: {
                rows: [],
                page: 1,
                pages: 0,
                total: 0
            }
        },
        create: {
            name: "Create",
            isFetching: false,
            loadMore: false,
            data: {
                rows: [],
                page: 1,
                pages: 0,
                total: 0
            }
        }
    },
    active: "public"
};

export default {
    num: 0,
    mainNav,
    notificationTabs,
    linkTabs,
    groupTabs,
    settingsTabs,
    message: "",
    version: "1.0.0",
    notificationStatus: {
        count: 0,
        links: { rows: [] },
        groups: { rows: [] },
        lastUpdateId: 0
    },
    modals: {
        notification: {
            open: false,
            data: []
        },
        forgotPassword: {
            open: false
        },
        invite: {
            open: false,
            group_id: 0,
            data: {
                users: [],
                invites: []
            }
        },
        profile: {
            open: false,
            links: {
                isFetching: false,
                data: {
                    rows: [],
                    page: 0,
                    pages: 0,
                    total: 0
                }
            },
            user: {
                id: 0
            }
        }
    },
    editComment: {
        open: false,
        data: {},
        cursor: {}
    },
    allGroups: {
        data: [],
        isFetching: false,
        selected: null
    },
    groupUsers: {
        isFetching: false,
        data: [],
        group_id: 0,
        admin_id: 0
    },
    groups: {
        loadMore: false,
        defaultGroup: 0,
        data: [],
        selected: null
    },
    chrome_id: null,
    user: {
        login: {
            requesting: false,
            msg: "",
            flag: 1
        },
        register: {
            requesting: false,
            msg: "",
            flag: 1
        },
        data: {
            id: "1",
            nickname: "Redsnow",
            last_seen: "2017-09-30 11:25:05",
            color: "hsl(138, 69%, 53%)",
            bio: "Always give ur 100%, unless you'r donating blood",
            email: "abhisheksaha11@gmai.com",
            verified: "1"
        },
        customize: {
            sound: 1,
            notification: 0,
            theme: "dark"
        },
        loggedIn: false,
        isFetching: false
    },
    post: {
        title: "",
        url: "",
        comments: "",
        thumbnail: "",
        group: 2,
        posting: false
    }
};
