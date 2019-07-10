var Disney = Disney || {};
Disney.Social = {
    debugMode: !0,
    currentLand: "disney:land:clubpenguin",
    ieVer: -1,
    pageLang: "en",
    init: function() {
        this.getPageLang(), this.augmentTypes(), "undefined" != typeof jQuery && (jQuery.fn.allData = function() {
            var e = jQuery.data(this.get(0));
            return jQuery.cache[e]
        })
    },
    getPageLang: function() {
        var e = "en";
        return document.documentElement.lang && "" !== document.documentElement.lang && (e = document.documentElement.lang.toLowerCase()), this.pageLang = e
    },
    getLandDOMElement: function(e) {
        return void 0 === e && (e = Disney.Social.currentLand), void 0 === e ? null : $("." + e.replace(/(:|\.)/g, "_") + "_player")[0]
    },
    setCurrentLand: function(e) {
        void 0 === e ? delete Disney.Social.currentLand : Disney.Social.currentLand = e, Disney.Social.Event.updateListeners(Disney.Social.Event.LAND_CHANGE, e)
    },
    getUrl: function() {
        var e, i, n = arguments.length;
        return (i = arguments[n - 1]) && "boolean" == typeof i ? (i = "", n--) : i = "?v=" + DISNEY_FRIENDS_INI.VERSION, 1 === n ? (n = Disney.Social.Environment.FRIENDS_BASE_URL + "/", e = arguments[0]) : (n = arguments[0], e = arguments[1]), n + e + i
    },
    getUrlForLanguage: function() {
        return 1 === arguments.length ? this.getUrl(arguments[0].replace(/\{0\}/g, Disney.Social.pageLang)) : this.getUrl(arguments[0], arguments[1].replace(/\{0\}/g, Disney.Social.pageLang))
    },
    getJavascriptSafeUrl: function(e) {
        var i = location.protocol + "//" + location.hostname + ":" + location.port;
        return i = i + e + "?v=" + DISNEY_FRIENDS_INI.VERSION
    },
    getUrlVars: function() {
        for (var e, i = [], n = window.location.href.slice(window.location.href.indexOf("?") + 1).split("&"), t = 0; t < n.length; t++) e = n[t].split("="), i.push(e[0]), i[e[0]] = e[1];
        return i
    },
    getUrlVar: function(e) {
        return this.getUrlVars()[e]
    },
    logDebug: function() {},
    log: function(e) {
        "undefined" != typeof console && console.info(e)
    },
    logWarn: function(e) {
        "undefined" != typeof console && console.warn(e)
    },
    logError: function(e) {
        "undefined" != typeof console && ("function" == typeof console.trace && console.trace(), e ? console.error("Error: ", e, e.name, e.message) : console.error("Undefined error."))
    },
    typeOf: function(e) {
        var i = typeof e;
        return "object" === i && (e ? e instanceof Array && (i = "array") : i = "null"), i
    },
    isNumeric: function(e) {
        return !isNaN(parseFloat(e)) && isFinite(e)
    },
    isNumber: function(e) {
        return "number" == typeof e && isFinite(e)
    },
    isValidSwid: function(e) {
        return void 0 !== e && null !== e && "" !== e
    },
    shortCircuit: function(e, i, n, t) {
        return void 0 === t[e] && (setTimeout(function() {
            var e = Array.prototype.slice.call(t, 0);
            e.push(!0), n.apply(i, e)
        }, 5), !0)
    },
    augmentTypes: function() {
        Function.prototype.bind || (Function.prototype.bind = function(e) {
            return function(i) {
                var n = this;
                if (1 < arguments.length) {
                    var t = e.call(arguments, 1);
                    return function() {
                        return n.apply(i, arguments.length ? t.concat(e.call(arguments)) : t)
                    }
                }
                return function() {
                    return arguments.length ? n.apply(i, arguments) : n.call(i)
                }
            }
        }(Array.prototype.slice)), "function" != typeof Object.create && (Object.create = function(e) {
            function i() {}
            return i.prototype = e, new i
        }), "function" != typeof Object.extend && (Object.extend = function(e, i) {
            for (var n in i) i.hasOwnProperty(n) && (e[n] = i[n]);
            return e
        }), "function" != typeof Object.include && (Object.include = function(e) {
            for (var i in e) e.hasOwnProperty(i) && (this[i] = e[i])
        }), "function" != typeof Object.size && (Object.size = function(e) {
            var i, n = 0;
            for (i in e) e.hasOwnProperty(i) && n++;
            return n
        })
    },
    stopEvent: function(e) {
        e.cancelable && e.preventDefault(), e.cancelBubble = !0, e.stopPropagation && e.stopPropagation(), Disney.Social.Event && Disney.Social.Event.updateListeners(Disney.Social.Event.EVENT_STOPPED, e)
    },
    unbindAll: function(e) {
        if (!e) return !1;
        $(e).unbind().find("*").each(function() {
            $(this).unbind()
        })
    }
}, Disney.Social.init(), Disney.Social.Environment = {
    DEBUG_CONFIG: "true",
    DEBUG: !0,
    FRIENDS_BASE_URL: "http://" + window.location.host,
    CLUBPENGUIN_CONTENT_URL: "http://" + window.location.host,
    BOSH_PATH: "/friends/bind",
    CLUB_PENGUIN_AVATAR_URL: "http://" + window.location.hostname + "/paperdoll",
    PRESENCE_LIMIT_CONFIG: "true",
    PRESENCE_LIMIT: !1,
    PRESENCE_TIME_PERIOD: "120",
    MAX_PRESENCE_UPDATES: "1",
    DIMG_LOGGING_HOST: "log.data.disney.com",
    DIMG_LOGGING_APP_ID: "cpfriends",
    ROOMS_PATH: "/{0}/web_service/game_configs/rooms.jsonp",
    WORLDS_PATH: "/content/disney-land-clubpenguin/{0}/worlds.jsonp",
    CHARACTERS_PATH: "/content/disney-land-clubpenguin/{0}/characters.jsonp",
    MASCOTS_PATH: "/{0}/web_service/game_configs/mascots.jsonp",
    JUMP_STATUS_FOR_ROOMS_URL: "http://jump.friends.go.com/jump_world",
    JUMP_STATUS_POLLING_INTERVAL: "60000",
    LANDS_PATH: "/content/{0}/lands.jsonp",
    MARKUP_PATH: "/content/markup.jsonp",
    TEXT_PATH: "/content/{0}/text.jsonp",
    IMAGES_PATH: "/content/images.jsonp",
    BEST_FRIENDS_ENABLED_THRESHHOLD: 10,
    init: function() {
        void 0 === Disney.Social.getUrlVar("debug") && "true" !== this.DEBUG_CONFIG || (this.DEBUG = !0), "true" === this.PRESENCE_LIMIT_CONFIG && (this.PRESENCE_LIMIT = !0), Disney.Social.debugMode = this.DEBUG
    }
}, Disney.Social.Environment.init(), Disney.Social.EventAbstract = {
    addListener: function(e, i) {
        return !(!e || "string" != typeof e) && (!(!i || "function" != typeof i) && (this.listeners[e] || (this.listeners[e] = []), void(this.listeners[e].indexOf(i) < 0 && this.listeners[e].push(i))))
    },
    removeListener: function(e, i) {
        if (e && i && "string" == typeof e && "function" == typeof i && this.listeners[e]) {
            var n = this.listeners[e].indexOf(i);
            n >= 0 && this.listeners[e].splice(n, 1)
        }
    },
    addGameListener: function(e, i) {
        void 0 === this.gameListeners[e] && (this.gameListeners[e] = []), $.inArray(i, this.gameListeners[e]) < 0 && this.gameListeners[e].push(i)
    },
    updateListeners: function(e) {
        var i, n, t, s = Array.prototype.slice.call(arguments, 1);
        if (!e || "string" != typeof e) return !1;
        if (this.listeners[e])
            for (t = (i = this.listeners[e]).length, n = 0; n < t; n++) try {
                i[n].apply(null, s)
            } catch (e) {}
        if (this.gameListeners && this.gameListeners[e]) {
            for (i = [], t = s.length, n = 0; n < t; n++) switch (Disney.Social.typeOf(s[n])) {
                case "string":
                case "boolean":
                case "number":
                case "array":
                    i.push(s[n]);
                    break;
                default:
                    s[n].tagName || i.push(s[n])
            }
            for (s = 0; s < this.gameListeners[e].length; s++) {
                n = this.gameListeners[e][s];
                try {
                    console.log(e, i, n), Disney.Social.getLandDOMElement(n).friendsEventHandler(e, i)
                } catch (e) {}
            }
        }
    }
}, Disney.Social.Event = {
    LAND_CHANGE: "landChange",
    ROOM_UPDATE: "roomUpdate",
    EVENT_STOPPED: "eventStopped",
    addListener: function(e, i) {
        this.eventManager.addListener(e, i)
    },
    addGameListener: function(e, i) {
        this.eventManager.addGameListener(e, i)
    },
    initEventManager: function() {
        this.eventManager = new Disney.Social.Event.Manager
    },
    updateListeners: function() {
        this.eventManager.updateListeners.apply(this.eventManager, Array.prototype.slice.call(arguments, 0))
    }
}, Disney.Social.Event.Manager = function() {
    this.listeners = {}, this.gameListeners = {}
}, Disney.Social.Event.Manager.prototype = Disney.Social.EventAbstract, Disney.Social.Event.initEventManager(), Disney.Social.API = {
    setCurrentLand: function(e) {
        Disney.Social.setCurrentLand(e)
    }
}, Disney.Social.Data = {
    lands: {},
    worlds: {},
    rooms: {},
    characters: {},
    mascots: {},
    init: function() {
        var e = Disney.Social,
            i = e.Environment;
        $.ajax(e.getUrlForLanguage(i.FRIENDS_BASE_URL, i.CHARACTERS_PATH), {
            cache: !0,
            dataType: "jsonp",
            jsonpCallback: "charactersData",
            success: function(e) {
                Disney.Social.Data.characters = e
            }
        }), $.ajax(e.getUrlForLanguage(i.FRIENDS_BASE_URL, i.LANDS_PATH), {
            cache: !0,
            dataType: "jsonp",
            jsonpCallback: "landsData",
            success: function(e) {
                Disney.Social.Data.lands = e
            }
        }), $.ajax(e.getUrlForLanguage(i.FRIENDS_BASE_URL, i.WORLDS_PATH), {
            cache: !0,
            dataType: "jsonp",
            jsonpCallback: "worldsData",
            success: function(e) {
                Disney.Social.Data.worlds = e
            }
        }), $.ajax(e.getUrlForLanguage(i.CLUBPENGUIN_CONTENT_URL, i.ROOMS_PATH), {
            cache: !0,
            dataType: "jsonp",
            jsonpCallback: "cp_rooms",
            success: function(e) {
                Disney.Social.Data.rooms = e
            }
        }), $.ajax(e.getUrlForLanguage(i.CLUBPENGUIN_CONTENT_URL, i.MASCOTS_PATH), {
            cache: !0,
            dataType: "jsonp",
            jsonpCallback: "cp_mascots",
            success: function(e) {
                Disney.Social.Data.mascots = e
            }
        })
    }
}, Disney.Social.Data.init(), Disney.ClubPenguin = {
    MARGIN: 6,
    GAME_WIDTH: 760,
    GAME_HEIGHT: 480,
    GAME_ASPECT_RATIO: 760 / 480,
    BUDDY_ICON_POSITION_X: 575,
    BUDDY_ICON_POSITION_Y: 445,
    getNotifyPosition: function() {
        var e = $("#D_F_GameSection"),
            i = e.width(),
            n = e.height(),
            t = 0,
            s = 0;
        i / n > this.GAME_ASPECT_RATIO ? s = (t = n) * this.GAME_ASPECT_RATIO : t = (s = i) / this.GAME_ASPECT_RATIO;
        var r = t * this.BUDDY_ICON_POSITION_Y / this.GAME_HEIGHT,
            d = s * this.BUDDY_ICON_POSITION_X / this.GAME_WIDTH;
        return e = e.offset(), {
            left: e.left + (i - s) / 2 + d,
            top: e.top + (n - t) / 2 + r
        }
    }
}, Disney.Friends = {
    PRESENCE_DOMAIN: "d",
    createJidFromSwid: function(e) {
        return e + "@" + this.PRESENCE_DOMAIN
    },
    activeConnection: null,
    activeUser: null
}, Disney.Friends.Data = {}, Disney.Friends.Data.RosterItem = {
    swid: "",
    name: "",
    weight: 0,
    canJumpTo: !1,
    groups: [],
    presence: {}
}, Disney.Friends.Data.Presence = {
    status: {},
    id: "",
    location: {}
}, Disney.Friends.Data.LandPresence = {
    ns: "",
    id: 0,
    location: {}
}, Disney.Friends.StanzaConstants = {
    XMLNS: "xmlns",
    JID: "jid",
    ID: "id",
    FROM: "from",
    IQ: "iq",
    IQ_GET: "get",
    IQ_SET: "set",
    IQ_TYPE_ERROR: "error",
    IQ_TYPE_RESULT: "result",
    IQ_QUERY: "query",
    IQ_ITEM: "item",
    IQ_CHARACTER: "character",
    IQ_NAME: "name",
    LAND: "land",
    STANZA_TYPE: "type",
    PRESENCE: "presence",
    SUBSCRIPTION: "subscription",
    SUBSCRIPTION_REMOVE: "remove",
    SUBSCRIPTION_BOTH: "both",
    IGNORE_ITEM: "item",
    IGNORE_JID: "jid",
    IGNORE_REMOVE: "remove",
    PRESENCE_TYPE_ERROR: "error",
    PRESENCE_TYPE_SUBSCRIBE: "subscribe",
    PRESENCE_TYPE_SUBSCRIBED: "subscribed",
    PRESENCE_TYPE_UNSUBSCRIBED: "unsubscribed",
    PRESENCE_TYPE_UNAVAILABLE: "unavailable",
    SETTING_ITEM: "setting",
    SETTING_NAME: "name",
    SETTING_VALUE: "value",
    SETTING_REMOVE: "remove",
    WEIGHT: "weight",
    MESSAGE: "message"
}, Disney.Friends.Event = {
    USER_PRESENCE_UPDATE: "userPresenceUpdate",
    FRIENDS_NEW: "friendsNew",
    FRIENDS_UPDATE: "friendsUpdate",
    FRIENDS_GOT_SETTINGS: "friendsGotSettings",
    FRIENDS_WEIGHT_UPDATE: "friendsWeightUpdate",
    FRIENDS_REMOVE: "friendsRemove",
    PENDING_UPDATE: "pendingUpdate",
    PENDING_REMOVE: "pendingRemove",
    HUD_UPDATE: "hudUpdate",
    SHOWING_NOTIFICATION: "showingNotification",
    CLOSED_NOTIFICATION: "closedNotification",
    CHARACTER_INVITE: "characterInvite",
    IGNORED_UPDATE: "ignoredUpdate",
    FRIENDS_JUMP: "friendsJump",
    FRIENDS_JUMP_AVAILABLE: "friendsJumpAvailable",
    FRIENDS_JUMP_FAILED: "friendsJumpFailed",
    JUMP_STATUS_FOR_ROOMS_UPDATE: "jumpStatusForRoomsUpdate",
    SHOW_PLAYER_CARD: "showPlayerCard",
    SHOW_CHARACTER_CARD: "showCharacterCard",
    DISCONNECTED: "disconnected",
    CONNECTED: "connected",
    FIND_PLAYER: "findPlayer",
    FOUND_PLAYER: "foundPlayer",
    FIND_PLAYER_NOT_FOUND: "findPlayerNotFound",
    FIND_PLAYER_EXISTING_FRIEND: "findPlayerExistingFriend",
    FIND_PLAYER_EXISTING_IGNORE: "findPlayerExistingIgnore",
    SAFE_CHAT_CONNECTION_UPDATE: "safeChatConnectionUpdate",
    RECEIVED_SNOWBALL: "receivedSnowball",
    addListener: function(e, i) {
        this.eventManager.addListener(e, i)
    },
    addGameListener: function(e, i) {
        this.eventManager.addGameListener(e, i)
    },
    initEventManager: function() {
        this.eventManager = new Disney.Friends.Event.Manager
    },
    updateListeners: function() {
        console.log(Array.prototype.slice.call(arguments, 0)), this.eventManager.updateListeners.apply(this.eventManager, Array.prototype.slice.call(arguments, 0))
    }
}, Disney.Friends.Event.Manager = function() {
    this.listeners = {}, this.gameListeners = {}
}, Disney.Friends.Event.Manager.prototype = Disney.Social.EventAbstract, Disney.Friends.Event.initEventManager(), Disney.Friends.Event.Warning = {
    FRIENDS_LIMIT: "friendsLimit",
    IGNORED_LIMIT: "ignoreLimit",
    BEST_FRIENDS_LIMIT: "bestFriendsLimit"
}, Disney.Friends.API = {
    getFriends: function() {
        return Disney.Friends.activeUser.getRoster().getFriends()
    },
    getOnlineFriends: function() {
        return Disney.Friends.activeUser.getRoster().getOnlineFriends()
    },
    getIgnored: function() {
        return Disney.Friends.activeUser.getRoster().getIgnored()
    },
    connect: function(e, i) {
        console.log("Disney.Friends.API.connect()"), Disney.Friends.activeConnection = new Disney.Friends.Connection, Disney.Friends.activeConnection.connect(), Disney.Friends.activeConnection.swid = e
    },
    getSwid: function() {
        var e = null;
        return void 0 !== Disney.Friends.activeConnection && null !== Disney.Friends.activeConnection && (e = Disney.Friends.activeConnection.swid), e
    },
    disconnect: function(e) {
        Disney.Friends.activeConnection && "gameTimeout" === e && this.toggle(0)
    },
    requestFriendship: function(e) {
        Disney.Friends.activeUser.roster.requestFriendship(e)
    },
    acceptFriendship: function(e) {
        Disney.Friends.activeUser.roster.acceptFriendship(e)
    },
    rejectFriendship: function(e) {
        Disney.Friends.activeUser.roster.rejectFriendship(e)
    },
    toggle: function(e) {
        console.log("Disney.Friends.API.toggle()"), void 0 === e || null === e ? Disney.Friends.UI.toggleFriendsSection() : e ? Disney.Friends.UI.showFriendsSection() : Disney.Friends.UI.hideFriendsSection()
    },
    updateFriend: function(e) {
        Disney.Friends.activeUser.roster.updateFriend(e)
    },
    connectedToSafeChat: function() {
        return Disney.Friends.activeUser.connectedToSafeChat
    },
    jumpToFriend: function(e) {
        return this.jump(e, Disney.Friends.Jump.MAKE_RESERVATION_AND_DO_THE_JUMP)
    },
    jumpToCharacter: function(e) {
        void 0 !== e && void 0 !== e.id && void 0 !== e.location && Disney.Friends.Event.updateListeners(Disney.Friends.Event.FRIENDS_JUMP, {
            id: e.id,
            location: e.location,
            type: Disney.Friends.Jump.DO_THE_JUMP
        })
    },
    jump: function(e, i) {
        var n = this.getFriends();
        return void 0 !== n[e] && void 0 !== n[e].presence && void 0 !== n[e].presence.id && (Disney.Friends.Event.updateListeners(Disney.Friends.Event.FRIENDS_JUMP, {
            id: n[e].presence.id,
            location: n[e].presence.location,
            swid: e,
            type: i
        }), Disney.Friends.UI.HudNotification.notifyJump(e), Disney.Social.getLandDOMElement().jumpServer(n[e].presence.location.world), !0)
    },
    pollJumpStatus: function(e) {
        console.log("Disney.Friends.API.pollJumpStatus()");
        Disney.Friends.Jump.pollJumpStatus(e)
    },
    getJumpStatus: function(e) {
        Disney.Friends.Jump.getJumpStatus(e)
    },
    findPlayerByName: function(e) {
        Disney.Friends.Event.updateListeners(Disney.Friends.Event.FIND_PLAYER, e)
    },
    foundPlayer: function(e) {
        e.playerId > 0 ? void 0 !== Disney.Friends.activeUser.roster.findFriend(e.swid) ? Disney.Friends.Event.updateListeners(Disney.Friends.Event.FIND_PLAYER_EXISTING_FRIEND, e.name) : void 0 !== Disney.Friends.activeUser.roster.findIgnore(e.swid) ? Disney.Friends.Event.updateListeners(Disney.Friends.Event.FIND_PLAYER_EXISTING_IGNORE, e.name) : Disney.Friends.Event.updateListeners(Disney.Friends.Event.FOUND_PLAYER, e) : Disney.Friends.Event.updateListeners(Disney.Friends.Event.FIND_PLAYER_NOT_FOUND, e.name)
    },
    showPlayerCard: function(e) {
        var i = Disney.Friends.activeUser.roster.findGuest(e),
            n = null;
        void 0 !== i && void 0 !== i.presence && void 0 !== i.presence.location ? n = i.presence.location.land : void 0 !== i && (n = "disney:land:clubpenguin"), Disney.Social.currentLand === n && Disney.Friends.Event.updateListeners(Disney.Friends.Event.SHOW_PLAYER_CARD, e)
    },
    showCharacterCard: function(e) {
        Disney.Friends.activeUser.roster.findGuest(e) && Disney.Friends.Event.updateListeners(Disney.Friends.Event.SHOW_CHARACTER_CARD, e)
    },
    showingNotification: function() {
        Disney.Friends.Event.updateListeners(Disney.Friends.Event.SHOWING_NOTIFICATION)
    },
    closedNotification: function() {
        Disney.Friends.Event.updateListeners(Disney.Friends.Event.CLOSED_NOTIFICATION)
    },
    hudVisibilityChanged: function(e) {
        Disney.Social.shortCircuit(1, this, arguments.callee, arguments) || ("number" == typeof this.currentHudVisibilityTimeout && clearTimeout(this.currentHudVisibilityTimeout), e ? this.currentHudVisibilityTimeout = setTimeout(function() {
            Disney.Friends.Event.updateListeners(Disney.Friends.Event.HUD_UPDATE, e)
        }, 500) : Disney.Friends.Event.updateListeners(Disney.Friends.Event.HUD_UPDATE, e))
    }
}, Disney.Friends.User = function(e) {
    this.connection = e, this.settings = this.roster = null, this.isPreActivated = !1, this.presenceUpdateCount = this.lastPresenceSent = 0, this.presence = $pres().tree()
}, Disney.Friends.User.prototype = {
    getRoster: function() {
        return this.roster
    },
    setRoster: function(e) {
        this.roster = e
    },
    getSettings: function() {
        return this.settings
    },
    setSettings: function(e) {
        this.settings = e
    },
    getPresence: function() {
        return this.presence
    },
    setIsPreActivated: function(e) {
        this.isPreActivated = e
    }
}, Disney.Friends.Roster = function(e, i) {
    this.connection = e, this.user = i, this.friends = {}, this.pending = {}, this.ignored = {}, this.snowballReceipts = {}
}, Disney.Friends.Roster.prototype = {
    getFriends: function() {
        return this.friends
    },
    findGuest: function(e) {
        var i = this.findFriend(e);
        return void 0 === i && void 0 === (i = this.findPending(e)) && (i = this.findIgnore(e)), i
    },
    findFriend: function(e) {
        return this.friends[e]
    },
    findIgnore: function(e) {
        return this.ignored[e]
    },
    findPending: function(e) {
        return this.pending[e]
    },
    getOnlineFriends: function() {
        var e, i = {};
        for (e in this.friends) {
            var n = this.friends[e];
            void 0 !== n.presence.status && n.presence.status !== Disney.Friends.Presence.Status.OFFLINE && (i[e] = n)
        }
        return i
    },
    getIgnored: function() {
        return this.ignored
    },
    getPending: function() {
        return this.pending
    },
    requestFriendship: function(e) {
        Disney.Social.getLandDOMElement().sendBuddyRequest(e)
    },
    acceptFriendship: function(e) {
        Disney.Social.getLandDOMElement().sendAcceptBuddyRequest(e), delete this.pending[e], Disney.Friends.Event.updateListeners(Disney.Friends.Event.PENDING_REMOVE, e)
    },
    rejectFriendship: function(e) {
        Disney.Social.getLandDOMElement().sendRejectBuddyRequest(e), delete this.pending[e], Disney.Friends.Event.updateListeners(Disney.Friends.Event.PENDING_REMOVE, e)
    },
    updateFriend: function(e) {
        this.friends[e.swid] = $.extend({}, this.friends[e.swid], e), Disney.Friends.Event.updateListeners(Disney.Friends.Event.FRIENDS_UPDATE, this.friends)
    },
    addIgnoredResultHandler: function(e) {
        return $(e).attr(Disney.Friends.StanzaConstants.STANZA_TYPE) === Disney.Friends.StanzaConstants.IQ_TYPE_ERROR && "7" === $(e).find("error").attr("code") && Disney.Friends.Event.updateListeners(Disney.Friends.Event.Warning.IGNORED_LIMIT), !1
    },
    populateRoster: function(e) {
        var i = this;
        return e.forEach(function(e) {
            i.updateFriendItem(e, !0)
        }), Disney.Friends.Event.updateListeners(Disney.Friends.Event.FRIENDS_UPDATE, this.friends), !1
    },
    populateCharacterRoster: function(e) {
        var i = this;
        return e.forEach(function(e) {
            i.addCharacterItem(e)
        }), Disney.Friends.Event.updateListeners(Disney.Friends.Event.FRIENDS_UPDATE, Disney.Friends.activeConnection.user.roster.friends), !1
    },
    populateIgnored: function(e) {
        var i = this;
        return this.ignored = {}, e.length > 0 && e.forEach(function(e, n) {
            i.updateIgnoredItem(n)
        }), Disney.Friends.Event.updateListeners(Disney.Friends.Event.IGNORED_UPDATE, this.ignored), !1
    },
    populatePending: function(e) {
        var i = this;
        e.forEach(function(e) {
            e = e.split("|");
            var n = i.addPendingItem(e[0], e[1]);
            Disney.Friends.Event.updateListeners(Disney.Friends.Event.PENDING_UPDATE, n)
        })
    },
    populateBestFriends: function(e) {
        e.forEach(function(e) {
            Disney.Friends.UI.setBestFriend(e)
        })
    },
    characterRosterUpdateHandler: function(e, i) {
        return 0 == i ? (e = this.removeCharacterItem(e), Disney.Friends.Event.updateListeners(Disney.Friends.Event.FRIENDS_REMOVE, e)) : (e = this.addCharacterItem(e, i), Disney.Friends.Event.updateListeners(Disney.Friends.Event.FRIENDS_UPDATE, e)), !0
    },
    ignoreUpdateHandler: function(e) {
        var i = this;
        return (e = $(e).find("query item")).length > 0 && e.each(function(e, n) {
            i.updateIgnoredItem(n)
        }), Disney.Friends.Event.updateListeners(Disney.Friends.Event.IGNORED_UPDATE, this.ignored), !0
    },
    buddyRequestHandler: function(e) {
        swid = e[0], name = e[1], b = this.addPendingItem(swid, name), console.log("Disney.Friends.Roster.prototype.buddyRequestHandler()"), Disney.Friends.Event.updateListeners(Disney.Friends.Event.PENDING_UPDATE, b)
    },
    friendOffline: function(e) {
        var i = this.friends[e];
        void 0 !== i && (i.presence.status = Disney.Friends.Presence.Status.OFFLINE, delete i.presence.id, delete i.presence.location, Disney.Friends.Event.updateListeners(Disney.Friends.Event.FRIENDS_UPDATE, i))
    },
    friendOnline: function(e, i, n, t) {
        var s = this.friends[e];
        void 0 !== s && (s.presence.id = i, s.presence.location = {
            land: "disney:land:clubpenguin",
            world: n,
            room: t
        }, s.presence.status = Disney.Friends.Presence.Status.ONLINE, s.presence.mobile = !1, Disney.Friends.Event.updateListeners(Disney.Friends.Event.FRIENDS_UPDATE, s))
    },
    characterOffline: function(e) {
        void 0 !== (e = this.friends[e]) && (e.presence.status = Disney.Friends.Presence.Status.OFFLINE, Disney.Friends.Event.updateListeners(Disney.Friends.Event.FRIENDS_UPDATE, e))
    },
    characterOnline: function(e) {
        void 0 !== (e = this.friends[e]) && (e.presence.status = Disney.Friends.Presence.Status.ONLINE, Disney.Friends.Event.updateListeners(Disney.Friends.Event.FRIENDS_UPDATE, e))
    },
    addFriendItem: function(e) {
        Disney.Friends.activeConnection.user.roster.updateFriendItem(e, !1), Disney.Friends.Event.updateListeners(Disney.Friends.Event.FRIENDS_UPDATE, this.friends)
    },
    updateFriendItem: function(i, n) {
        var t, s;
        return i = i.split("|"), e = Object.create(Disney.Friends.Data.RosterItem), e.swid = i[1], e.name = i[2], e.safeChatName = "", e.groups = [], e.jumpAvailable = !1, t = this.friends[e.swid], s = Disney.Friends.Event.FRIENDS_UPDATE, void 0 === t ? (e.presence = {
            id: i[0],
            status: i[3],
            mobile: !1
        }, void 0 !== n && !1 !== n || (s = Disney.Friends.Event.FRIENDS_NEW)) : (e.weight = t.weight, e.presence = $.extend(!0, {}, t.presence), delete this.friends[e.swid]), this.friends[e.swid] = e, void 0 !== n && !1 !== n || Disney.Friends.Event.updateListeners(s, e), e
    },
    removeFriendItem: function(e) {
        delete this.friends[e], Disney.Friends.Event.updateListeners(Disney.Friends.Event.FRIENDS_REMOVE, e)
    },
    addCharacterItem: function(e, i) {
        e = {
            character: !0,
            id: e,
            name: i
        };
        var n = this.friends[e.id];
        return void 0 === n ? e.presence = {
            status: Disney.Friends.Presence.Status.OFFLINE
        } : (e.presence = $.extend(!0, {}, n.presence), delete this.friends[e.id]), this.friends[e.id] = e
    },
    removeCharacterItem: function(e) {
        return delete this.friends[e], e
    },
    addPendingItem: function(e, i) {
        return a = {
            swid: e,
            name: i,
            safeChatName: i,
            presence: {
                status: Disney.Friends.Presence.Status.PENDING
            }
        }, this.pending[e] = a
    },
    updateIgnoredItem: function(e) {
        e = $(e);
        var i = Strophe.getNodeFromJid(e.attr("jid")),
            n = e.attr("remove");
        void 0 !== n && null !== n && "true" === n ? delete this.ignored[i] : (e = e.attr("name").split("|"), this.ignored[i] = {
            swid: i,
            name: e[0],
            safeChatName: void 0 !== e[1] ? e[1] : null
        })
    }
}, Disney.Friends.Settings = function(e) {
    this.connection = e, this.settings = {}, Strophe.addNamespace("SETTING", "disney:friends:setting")
}, Disney.Friends.Settings.prototype = {
    settingRequestHandler: function() {
        return !1
    },
    settingRequestResultHandler: function(e) {
        if (this.settings = {}, e.length > 0) {
            var i = this;
            e.forEach(function(e) {
                var n = (e = e.split("|"))[0],
                    t = e[1];
                i.settings[n] = t, console.log("Disney.Friends.activeUser.settings.settings[" + n + "] = " + t)
            })
        }
        return Disney.Friends.Event.updateListeners(Disney.Friends.Event.FRIENDS_GOT_SETTINGS, this.settings), !1
    },
    getSetting: function(e) {
        return this.settings[e]
    },
    addSetting: function(e, i) {
        this.settings[e]
    }
}, Disney.Friends.Settings.Constants = {
    BEST_FRIEND_ENABLED: "be",
    BEST_HINT_COUNT: "bc",
    NOTIFICATION_AWARE: "na",
    FRIENDS_ENABLED: "fe"
}, Disney.Friends.Character = function(e) {
    this.connection = e
}, Disney.Friends.Character.prototype = {
    messageHandler: function(e) {
        return e = $(e).find("presence"), Disney.Friends.Event.updateListeners(Disney.Friends.Event.CHARACTER_INVITE, e[0]), !0
    }
}, Disney.Friends.Presence = {
    Status: {
        OFFLINE: "offline",
        ONLINE: "online",
        PENDING: "pending"
    },
    MobileRoomID: 1100,
    DetailLevel: {
        STATUS: 0,
        LAND: 1,
        LAND_DETAILS: 2
    }
}, Disney.Friends.Connection = function(e) {
    this.serviceUri = e, this.password = this.swid = this.user = null, this.connectionStatus = Strophe.Status.DISCONNECTED
}, Disney.Friends.Connection.prototype = {
    UNLOADING: "unloading",
    GAME_TIMEOUT: "gameTimeout",
    SERVICE_UNAVAILABLE: "503",
    LOW_RECONNECT_TIME_OUT_MAX_ITERATIONS: 2,
    LOW_RECONNECT_TIME_OUT_LENGTH: 15e3,
    LOW_RECONNECT_TIME_OUT_RANDOMIZER: 15e3,
    HIGH_RECONNECT_TIME_OUT_LENGTH: 24e4,
    HIGH_RECONNECT_TIME_OUT_RANDOMIZER: 6e4,
    disconnectReason: "",
    retries: 0,
    hasConnected: !1,
    connect: function() {
        console.log("Disney.Friends.Connection.connect()"), null === this.user && (this.user = new Disney.Friends.User(this)), this.connectionStatus = Strophe.Status.CONNECTED, Disney.Friends.activeUser = this.user;
        var e = new Disney.Friends.Roster(this, this.user);
        this.user.setRoster(e), e = new Disney.Friends.Settings(this), this.user.setSettings(e), this.characterHandler = new Disney.Friends.Character(this), this.disconnectReason = "", Disney.Friends.Event.updateListeners(Disney.Friends.Event.CONNECTED, {
            sid: "sid"
        }), this.retries = 0, this.hasConnected = !0
    }
}, Disney.Friends.Jump = {
    MAKE_RESERVATION: 1,
    DO_THE_JUMP: 2,
    MAKE_RESERVATION_AND_DO_THE_JUMP: 3,
    START_OF_IGLOO_ROOM_IDS: 1e3,
    availableRoomLocations: {},
    availableIglooLocations: {},
    lastPollTimestamp: 0,
    pendingJump: null,
    jumpEnabled: !1,
    canJump: function(e, i) {
        if (!this.jumpEnabled) return !1;
        var n = Number(i),
            t = Number(e);
        if (-1 !== $.inArray(n, this.availableRoomLocations[t])) return !0;
        if (void 0 === (t = this.availableIglooLocations[t])) return !1;
        if (-1 !== $.inArray(n, t.open)) return !0;
        if (-1 !== $.inArray(n, t.closed)) {
            var s, r = Disney.Friends.activeUser.getRoster().getOnlineFriends();
            for (s in r)
                if (r.hasOwnProperty(s) && void 0 !== (t = r[s].presence.id) && t + this.START_OF_IGLOO_ROOM_IDS === n) return !0
        }
        return !1
    },
    pollJumpStatus: function(e) {
        console.log("Disney.Friends.Jump.pollJumpStatus()");
        this.jumpEnabled && (e && this.startPolling(), e || this.stopPolling())
    },
    startPolling: function() {
        console.log("Disney.Friends.Jump.startPolling()");
        this.pollInterval || (this.lastPollTimestamp + Disney.Social.Environment.JUMP_STATUS_POLLING_INTERVAL < (new Date).getTime() && this.pollJumpState(), this.pollInterval = setInterval(this.pollJumpState.bind(this), Disney.Social.Environment.JUMP_STATUS_POLLING_INTERVAL))
    },
    stopPolling: function() {
        if (!this.pollInterval) return !1;
        clearInterval(this.pollInterval), delete this.pollInterval
    },
    pollJumpState: function() {
        console.log("Disney.Friends.Jump.pollJumpState()");
        var e = this.findUniqueWorlds();
        e.length > 0 && (this.queryJumpStateServiceForRooms(e), this.lastPollTimestamp = (new Date).getTime())
    },
    findUniqueWorlds: function() {
        if (null === Disney.Friends.activeUser) return [];
        var e, i, n = {},
            t = Disney.Friends.activeUser.getRoster().getOnlineFriends();
        for (i in t) t.hasOwnProperty(i) && void 0 !== (e = t[i]).presence.location && null !== e.presence.location && (n[e.presence.location.world] = !0);
        t = [];
        for (var s in n) t.push(Number(s).valueOf());
        return t
    },
    queryJumpStateServiceForRooms: function(e) {
        e = {
            s: Disney.Friends.activeConnection.swid,
            l: Disney.Social.getPageLang(),
            w: e
        }, $.ajax(Disney.Social.Environment.JUMP_STATUS_FOR_ROOMS_URL, {
            dataType: "jsonp",
            data: {
                query: JSON.stringify(e)
            },
            success: this.processJumpStateResponseForRooms.bind(this)
        })
    },
    processJumpStateResponseForRooms: function(e) {
        this.availableRoomLocations = {}, this.availableIglooLocations = {};
        for (var i, n = 0; n < e.length; n++) i = e[n], this.availableRoomLocations[i.w] = i.r, this.availableIglooLocations[i.w] = {
            open: i.o,
            closed: i.c
        };
        Disney.Friends.Event.updateListeners(Disney.Friends.Event.JUMP_STATUS_FOR_ROOMS_UPDATE, null)
    }
}, Disney.Friends.UI = {
    gotLayout: !1,
    DELAY_NORMAL: 1e4,
    DELAY_FIRST: 3e4,
    BEST_HINT_COUNT_MAX: 2,
    init: function() {
        $("#D_F_FriendSection").draggable({
            containment: "window"
        }), this.bestCount = 0, this.bestEnabled = !1, this.delay = this.DELAY_FIRST, this.notificationAware = !1;
        var e = Disney.Friends.Event;
        e.addListener(e.DISCONNECTED, this.friendDisconnect.bind(this)), e.addListener(e.CONNECTED, this.friendConnect.bind(this)), e.addListener(e.FRIENDS_GOT_SETTINGS, this.updateSettings.bind(this)), (e = Disney.Social.Event).addListener(e.EVENT_STOPPED, this.bubbleEvent.bind(this)), this.friendConnect()
    },
    initUIComponents: function() {
        var e = Disney.Friends.UI;
        e.Me.init(), e.Friends.init(), e.FriendsTile.init(), e.Pending.init(), e.AddFriend.init(), e.BarNotification.init(), e.ContextNotification.init(), $(window).bind("resize", e.resized), e.HudNotification.init()
    },
    updateSettings: function() {
        var e = Disney.Friends.activeUser.settings,
            i = Disney.Friends.Settings.Constants,
            n = e.settings[i.BEST_HINT_COUNT];
        void 0 !== n && (n = parseInt(n, 10)) && (this.bestCount = n), void 0 === (n = e.settings[i.BEST_FRIEND_ENABLED]) || "true" !== n && "false" !== n || (this.bestEnabled = !0), void 0 === (n = e.settings[i.NOTIFICATION_AWARE]) || "true" !== n && "false" !== n || ("true" === n ? (this.notificationAware = !0, this.delay = this.DELAY_NORMAL) : this.notificationAware = !0), n = !1, "false" == e.settings[i.FRIENDS_ENABLED] && (n = !0), Disney.Friends.activeUser.setIsPreActivated(n), Disney.Friends.activeUser.isPreActivated && this.preActivatedFriendsPanel()
    },
    preActivatedFriendsPanel: function() {
        if (!$("#D_F_FriendsPanel .preactivated-message").length) {
            var e = Disney.Friends.UI.setText("D26"),
                i = Disney.Friends.UI.setText("D27");
            $("#D_F_FriendSection").addClass("preactivated"), $("#D_F_FriendsPanel").prepend('<div class="preactivated-message"><p>' + e + '</p><div class="about-activation"><a href="#" class="button">' + i + "</a></div></div>"), $(".preactivated-message .about-activation .button").click(function(e) {
                e.preventDefault(), $("#club_penguin")[0].handleShowPreactivation(), $("#D_F_FriendSection").fadeOut()
            })
        }
        $("#D_F_FriendsGrid").remove()
    },
    friendConnect: function() {
        $("#D_F_FriendSectionReconnect").css("display", "none")
    },
    friendDisconnect: function() {
        $("#D_F_FriendSectionReconnect").show()
    },
    resized: function() {
        Disney.Friends.UI.HudNotification.reposition()
    },
    toggleFriendsSection: function() {
        "none" === $("#D_F_FriendSection").css("display") ? this.showFriendsSection() : this.hideFriendsSection()
    },
    showFriendsSection: function() {
        console.log("Disney.Friends.UI.showFriendsSection()");
        if ("none" === $("#D_F_FriendSection").css("display")) {
            var e = Disney.Social,
                i = Disney.Friends,
                n = i.UI;
            "none" === $("#D_F_HudNotification").css("display") && i.API.pollJumpStatus(!0), e.ieVer > 0 && e.ieVer < 9 ? $("#D_F_FriendSection").show() : $("#D_F_FriendSection").fadeIn(200), n.Friends.updateGrid(), n.Friends.updateWidget(), n.AddFriend.closePanel(), n.BarNotification.update(), n.ContextNotification.bestHintShown = !1, n.ContextNotification.showBestHint(), n.Images.preloadAvatars()
        }
    },
    hideFriendsSection: function() {
        "none" !== $("#D_F_FriendSection").css("display") && (Disney.Friends.UI.ContextNotification.cancel(), Disney.Social.ieVer > 0 && Disney.Social.ieVer < 9 ? $("#D_F_FriendSection").css("display", "none") : $("#D_F_FriendSection").fadeOut(200), "none" === $("#D_F_HudNotification").css("display") && Disney.Friends.API.pollJumpStatus(!1))
    },
    getCharacterAvatar: function(e, i, n) {
        var t = "images/CP/" + i + "_" + n.toString();
        $("#D_F_FriendsPanel").data(i) && ((i = $("#D_F_FriendsPanel").data(i).status) && i === Disney.Friends.Presence.Status.ONLINE || (t += "Off")), t += ".png", t = Disney.Social.getUrl(t, !0), Disney.Friends.UI.Images.checkValidAvatar(e, t, n)
    },
    getAvatarUriByFriendId: function(e, i, n, t, s) {
        return n = Disney.Friends.UI.Images, t || (t = 88), t = t < 88 ? 60 : 88, 0 === i.indexOf("character_") ? (this.getCharacterAvatar(e, i, t), !1) : i && "null" !== i ? (i = Disney.Social.Environment.CLUB_PENGUIN_AVATAR_URL + "/" + i + "/cp", i += "?size=" + t.toString(), i += "&language=" + Disney.Social.getPageLang(), i += s ? "&photo=true" : "&photo=false", i += "&bypassPlayerSettingCache=false", void n.checkValidAvatar(e, i, t)) : (s = "18", t < 88 && (s = "14"), $(e).unbind("load").unbind("error").attr("longdesc", s), Disney.Friends.UI.Images.setAttrs(e, s, !1), !1)
    },
    getAvatarUriBySwid: function(e, i, n, t) {
        var s = null;
        void 0 !== $("#D_F_FriendsGrid").data(i) && (s = $("#D_F_FriendsGrid").data(i).Id), Disney.Friends.UI.getAvatarUriByFriendId(e, i, s, n, t)
    },
    getFriendNameBySwid: function(e) {
        var i = "Friend";
        return void 0 === e || null === e ? i : (void 0 !== $("#D_F_FriendsGrid").data(e) && (i = $("#D_F_FriendsGrid").data(e).name), i)
    },
    getPendingNameBySwid: function(e) {
        var i = "";
        return e && Disney.Friends.activeUser && Disney.Friends.activeUser.roster.pending[e] && Disney.Friends.activeUser.roster.pending[e].name && (i = Disney.Friends.activeUser.roster.pending[e].name), i
    },
    disableSelectText: function(e) {
        void 0 !== document.body.style.webkitUserSelect ? $(e).each(function() {
            this.style.webkitUserSelect = "none"
        }) : void 0 !== document.body.onselectstart && $(e).each(function() {
            this.onselectstart = function() {
                return window.event.cancelBubble = !0, !1
            }
        }), void 0 !== document.body.style.MozUserSelect && $(e).each(function() {
            this.style.MozUserSelect = "-moz-none"
        })
    },
    frameIt: function(e, i, n, t, s) {
        $("#" + e).append($("#" + i + " > div").clone(!0)), $("#" + e + " > .D_F_BoxW").addClass(e + "_BoxW"), $("#" + e + " > .D_F_BoxH").addClass(e + "_BoxH"), $("#" + e).addClass(e + "_BoxW").addClass(e + "_BoxH"), $("." + e + "_BoxW").css("width", n + "px"), $("." + e + "_BoxH").css("height", t + "px"), $("#" + e + " > .D_F_BoxC").addClass("D_F_BoxCBg" + s), $("#" + e + " > .D_F_BoxT").addClass("D_F_BoxTBg" + s), $("#" + e + " > .D_F_BoxB").addClass("D_F_BoxBBg" + s), $("#" + e + " > .D_F_BoxR").addClass("D_F_BoxRBg" + s), $("#" + e + " > .D_F_BoxL").addClass("D_F_BoxLBg" + s), $("#" + e + " > .D_F_BoxI").addClass("D_F_BoxIBg" + s)
    },
    frameIt20: function(e, i, n, t) {
        $("#" + e).append($("#" + i + " > div").clone(!0)), $("#" + e + " > .D_F_BoxW20").addClass(e + "_BoxW20"), $("#" + e + " > .D_F_BoxH20").addClass(e + "_BoxH20"), $("#" + e).addClass(e + "_BoxW20").addClass(e + "_BoxH20"), $("." + e + "_BoxW20").css("width", n + "px"), $("." + e + "_BoxH20").css("height", t + "px")
    },
    setTheme: function() {
        var e, i = null;
        e = "url('" + Disney.Social.getUrl("css/themes/CP/D_F_btnCloseHover.png", !0) + "')", i = "url('" + Disney.Social.getUrl("css/themes/CP/D_F_btnClose.png", !0) + "')", $(".D_F_CloseButton").hover(function() {
            $(this).css("background-image", e)
        }, function() {
            $(this).css("background-image", i)
        })
    },
    setTagText: function(e) {
        var i = Disney.Friends.UI.Data.text,
            n = $(e).attr("lang");
        if (n = n.substr(n.lastIndexOf("-") + 1), i.hasOwnProperty(n))
            for (var t in i[n]) switch (t) {
                case "a":
                    $(e).attr("alt", i[n].a);
                    break;
                case "c":
                    $(e).attr("content", i[n].c);
                    break;
                case "h":
                    "title" === e.nodeName.toLowerCase() ? document.title = i[n].h : $(e).html(i[n].h);
                    break;
                case "r":
                    $(e).attr("href", i[n].r);
                    break;
                case "s":
                    $(e).attr("src", Disney.Social.getUrl(i[n].s), !0);
                    break;
                case "t":
                    $(e).attr("title", i[n].t);
                    break;
                case "v":
                    $(e).attr("value", i[n].v)
            }
    },
    setText: function(e) {
        return Disney.Friends.UI.Data.text ? Disney.Friends.UI.Data.text.dynamic[e] : ""
    },
    setLayout: function() {
        var e;
        (e = Disney.Friends.UI).gotLayout = !0;
        var i = e.Data;
        if (!i.markup) return !1;
        $("body").append('<div id="D_F"></div>'), $("#D_F").append(i.markup), $("#D_F_FriendSection").unwrap(), i.setText(), i.setImages(), e.init(), e.HudNotification.reposition(), e.initUIComponents(), e.setTheme(), e.disableSelectText(".D_F"), (e = Disney.Social.ieVer) > 0 && e < 8 && $("a").each(function() {
            $(this).attr("hideFocus", "hideFocus")
        })
    },
    resizeFriendsWidgetWith: function(e, i) {
        var n, t, s;
        if (e) {
            for (t = (s = [".D_F_SectionW", ".D_F_FriendSection_BoxW", ".D_F_FriendSectionReconnect_BoxW"]).length, n = 0; n < t; n++) $(s[n]).each(function() {
                var i = parseInt($(this).css("width"), 10);
                $(this).css("width", (i + e).toString() + "px")
            });
            t = ((n = $("#D_F_HeaderTop")).parent().width() - n.width()) / 2, n.css("left", t.toString() + "px"), $("#D_F_ReconnectTop").css("left", (t - 25).toString() + "px"), Disney.Friends.UI.AddFriend.resize(), Disney.Friends.UI.BarNotification.resize()
        }
        if (i)
            for (t = (s = [".D_F_SectionH", ".D_F_FriendSection_BoxH", ".D_F_FriendSectionReconnect_BoxH"]).length, n = 0; n < t; n++) $(s[n]).each(function() {
                var e = parseInt($(this).css("height"), 10);
                $(this).css("height", (e + i).toString() + "px")
            })
    },
    isVisible: function(e) {
        return !(e.parents().map(function() {
            return $(this).css("display")
        }).get().indexOf("none") >= 0)
    },
    showPlayerCard: function(e) {
        0 === e.indexOf("character_") && (e = e.substr(e.indexOf("_") + 1)), Disney.Friends.API.showPlayerCard(e)
    },
    jumpToFriend: function(e) {
        Disney.Friends.API.jumpToFriend(e)
    },
    jumpToCharacter: function(e) {
        Disney.Friends.API.jumpToCharacter(e)
    },
    bubbleEvent: function(e) {
        "mousedown" === e.type && $(e.target).parents().map(function() {
            var e = $(this).attr("id");
            e && "D_F_FriendSection" === e && Disney.Friends.UI.ContextNotification.cancel()
        })
    },
    setBestFriend: function(e) {
        console.log("Disney.Friends.UI.setBestFriend()");
        var i = Disney.Friends.UI.Friends,
            n = i.getGroupIndexBySwid(e),
            t = 1,
            s = "f";
        (n = i.groupNames[n[0]]).substr(0, i.BEST_CHARACTER.length) !== i.BEST_CHARACTER && n.substr(0, i.BEST_FRIEND.length) !== i.BEST_FRIEND || (t = 0), 0 === e.indexOf("character_") && (e = e.substr(e.indexOf("_") + 1), s = "c"), Disney.Friends.API.updateFriend({
            swid: e,
            groups: [t],
            type: s
        }), null !== Disney.Friends.activeUser && Disney.Friends.activeUser.settings.addSetting(Disney.Friends.Settings.Constants.BEST_HINT_COUNT, Disney.Friends.UI.BEST_HINT_COUNT_MAX.toString())
    },
    animateSprite: function(e, i, n, t, s, r) {
        var d = 0,
            a = 1,
            o = 1,
            c = (new Date).getTime();
        s = 1e3 / s;
        var l = function() {
            if ($(e).css("background-position", "-" + d.toString() + "px 0px"), t && t[a] && o < t[a] ? (o++, a--) : (o = 1, d += i), ++a <= n) {
                var u = (new Date).getTime();
                setTimeout(l, s - (u - c)), c = u
            } else setTimeout(function() {
                $(e).remove(), r()
            }, 2 * s)
        };
        l()
    }
}, Disney.Friends.UI.Event = {
    FRIENDS_COUNT: "friendsCount",
    PENDINGS_UPDATED: "pendingsUpdated",
    PENDING_ACCEPTED: "pendingAccepted",
    PENDING_REJECTED: "pendingRejected",
    PENDING_REMOVED: "pendingRemoved",
    SUBPANEL_TOGGLED: "subpanelToggled",
    init: function() {
        this.eventManager = Object.create(Disney.Social.EventAbstract), this.eventManager.listeners = {}
    },
    addListener: function(e, i) {
        this.eventManager.addListener(e, i)
    },
    removeListener: function(e) {
        this.eventManager.removeListener(e)
    },
    updateListeners: function() {
        this.eventManager.updateListeners.apply(this.eventManager, Array.prototype.slice.call(arguments, 0))
    }
}, Disney.Friends.UI.Event.init(), Disney.Friends.UI.Images = {
    implicit: {
        u: "images/D_F_implicit.gif",
        d: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAtJREFUCB1j+M8AAAIBAQDFXxteAAAAAElFTkSuQmCC"
    },
    queue: [],
    isSet: !1,
    init: function() {
        var e = Disney.Social,
            i = Disney.Friends.UI.Images;
        if (i.isSet || !Disney.Friends.UI.Data.images || !Disney.Friends.UI.gotLayout) return !1;
        $(".D_F img").each(function() {
            var e = $(this).attr("longdesc");
            e && !$(this).hasClass("D_F_FriendAvatar") && Disney.Friends.UI.Images.setAttrs(this, e, !0)
        }), e.ieVer > 0 && e.ieVer < 8 && ($.preloadCssImages(), this.preloadAll()), i.processQueue(), i.isSet = !0
    },
    setImplicit: function() {
        if (Disney.Friends.UI.Data.images) return !1;
        $(".D_F img").each(function() {
            var e, i, n = Disney.Friends.UI.Images;
            e = $(this).attr("longdesc"), i = $(this).attr("alt"), e && !i && (i = n.implicit.d, Disney.Social.ieVer > 0 && Disney.Social.ieVer < 8 && (i = Disney.Social.getUrl(n.implicit.u, !0)), $(this).attr("src", i), Disney.Friends.UI.Data.images || n.queue.push({
                i: e,
                e: this
            }))
        })
    },
    processQueue: function() {
        for (var e, i = Disney.Friends.UI.Images; i.queue.length > 0;) e = i.queue.shift(), i.setAttrs(e.e, e.i, !1)
    },
    getSrcById: function(e) {
        var i, n = Disney.Friends.UI.Data,
            t = "";
        return n.images.hasOwnProperty(e) ? (i = n.images[e].u, Disney.Social.ieVer > 0 && Disney.Social.ieVer < 8 ? t = Disney.Social.getUrl(i, !0) : (i = i.substr(i.lastIndexOf(".") + 1)) && (t = "data:image/" + i + ";base64," + n.images[e].d), t) : t = Disney.Social.getUrl(Disney.Friends.UI.Images.implicit.u, !0)
    },
    getHWbyId: function(e) {
        var i = Disney.Friends.UI.Data;
        return i.images.hasOwnProperty(e) ? [i.images[e].h, i.images[e].w] : []
    },
    setAttrs: function(e, i, n) {
        if (!e || !i) return !1;
        var t = Disney.Friends.UI.Images;
        if (!Disney.Friends.UI.Data.images) return n && t.queue.push({
            i: i,
            e: e
        }), !1;
        t.setHW(e, i), t.setSrc(e, i)
    },
    setSrc: function(e, i) {
        if (!e || !i) return !1;
        $(e).attr("src", Disney.Friends.UI.Images.getSrcById(i))
    },
    setHW: function(e, i) {
        var n;
        return !(!e || !i) && (!$(e).attr("height") && (n = Disney.Friends.UI.Images.getHWbyId(i), void(e && n && 2 === n.length && $(e).attr("width", n[1]).attr("height", n[0]))))
    },
    preloadAll: function() {
        var e, i = Disney.Friends.UI.Data;
        for (e in i.images) i.images.hasOwnProperty(e) && Disney.Friends.UI.Images.loadImage(Disney.Social.getUrl(i.images[e].u), !0)
    },
    loadImage: function(e) {
        var i = new Image;
        i.onerror = function() {
            $(this).unbind("error").attr("src", Disney.Social.getUrl(Disney.Friends.UI.Images.implicit.u, !0))
        }, i.src = e
    },
    getAvatarCache: function(e, i) {
        var n = !1;
        return $("#D_F_FriendsPanel").data(e) && $("#D_F_FriendsPanel").data(e).cache && $("#D_F_FriendsPanel").data(e).cache[i] && (n = $("#D_F_FriendsPanel").data(e).cache[i]), n
    },
    setAvatarCache: function(e, i, n) {
        if (!e || !i) return !1;
        $("#D_F_FriendsPanel").data(e) && ($("#D_F_FriendsPanel").data(e).cache || ($("#D_F_FriendsPanel").data(e).cache = {}), $("#D_F_FriendsPanel").data(e).cache[i] = n)
    },
    preloadAvatars: function() {
        var e, i, n = 36,
            t = (e = Disney.Friends.UI.Friends).arrAllFriends,
            s = e.getIndexAllFriends(),
            r = t.length;
        for (s > r && (s = r - 1), (s -= 9) < 0 && (s = 0), n += s; s < r && !(s > n); s++)
            if ((i = t[s]) && "null" !== i && 0 !== i.indexOf("character_") && !(e = this.getAvatarCache(i, 88))) {
                n = Disney.Social.Environment.CLUB_PENGUIN_AVATAR_URL + "/" + i + "/cp?size=88&language=" + Disney.Social.getPageLang() + "&photo=true", n += "&bypassPlayerSettingCache=false", Disney.Friends.UI.Images.preloadAvatar(n);
                break
            }
    },
    preloadAvatar: function(e) {
        var i = new Image;
        i.onload = function() {
            var e, i, n, t, s = (n = this.src).lastIndexOf("%7B") + 3,
                r = Disney.Friends.UI.Images;
            for (s > 0 && (t = n.indexOf("%7D", s)), s > 0 && t > s && (e = "{" + n.substring(s, t) + "}"), t = n.slice(n.indexOf("?") + 1).split("&"), s = 0; s < t.length; s++) "size" === (n = t[s].split("="))[0] && (i = n[1]);
            e && i && (r.setAvatarCache(e, i, !0), r.preloadAvatars())
        }, i.src = e
    },
    checkValidAvatar: function(e, i, n) {
        var t = "18";
        n < 88 && (t = "14"), $(e).unbind("load").unbind("error").attr("longdesc", t).error(function() {
            if (Disney.Social.ieVer < 9) {
                $(this).unbind("error");
                var e = $(this).attr("longdesc");
                Disney.Friends.UI.Images.setAttrs(this, e, !1)
            }
        }).load(function() {
            Disney.Social.ieVer < 9 && $(this).unbind("load")
        }).attr("src", i)
    }
}, Disney.Friends.UI.HudNotification = {
    SLIDE_TIME: 500,
    CHARACTER_ONLINE: "CO",
    CHARACTER_INVITE: "CI",
    FRIEND_ACCEPTANCE: "FA",
    FRIEND_REQUEST: "FR",
    JUMP_AVAILABLE: "FJ",
    FRIEND_ONLINE: "FO",
    crtSwid: null,
    crtNotifyType: null,
    characterPresences: {},
    timeStarted: null,
    crtArray: null,
    crtSplice: 0,
    requestCount: 1,
    init: function() {
        var e, i, n = Disney.Friends.Event,
            t = Disney.Friends.UI.Event;
        for (this.notifyTypes = [this.CHARACTER_ONLINE, this.CHARACTER_INVITE, this.FRIEND_ACCEPTANCE, this.JUMP_AVAILABLE, this.FRIEND_ONLINE, this.FRIEND_REQUEST], this.notifyArrays = [], i = this.notifyTypes.length, e = 0; e < i; e++) this.notifyArrays.push([]);
        Disney.Friends.UI.frameIt("D_F_HudNotifBubble", "D_F_Box25Template", 190, 30, "2"), n.addListener(n.HUD_UPDATE, this.hudUpdate.bind(this)), n.addListener(n.FRIENDS_JUMP_AVAILABLE, this.notifyJump.bind(this)), n.addListener(n.CHARACTER_INVITE, this.notifyInvite.bind(this)), t.addListener(t.PENDINGS_UPDATED, this.pendingsUpdated.bind(this)), t.addListener(t.PENDING_ACCEPTED, this.clearRequest.bind(this)), t.addListener(t.PENDING_REJECTED, this.clearRequest.bind(this)), $("#D_F_HudNotifClose").mousedown(function(e) {
            Disney.Social.stopEvent(e), Disney.Friends.UI.HudNotification.close()
        }), $("#D_F_HudNotifBubble").mousedown(function(e) {
            Disney.Social.stopEvent(e), Disney.Friends.UI.HudNotification.notificationClick()
        }), $("#D_F_HudNotification").mouseenter(function(e) {
            Disney.Social.stopEvent(e), Disney.Friends.UI.HudNotification.bindMouseLeave()
        }), this.bindClickAvatar(), this.bindClickAccept(), this.bindClickReject()
    },
    hudUpdate: function(e) {
        var i = Disney.Friends.UI.HudNotification;
        (i.hudVisible = e) ? i.rescan(): (this.crtArray = null, this.crtSplice = 0, i.close())
    },
    pendingsUpdated: function(e) {
        var i = Disney.Friends.UI.HudNotification;
        i.notify(e.name, i.FRIEND_REQUEST, e.swid)
    },
    notifyJump: function(e) {
        var i, n;
        return !!e && (!!$("#D_F_FriendsPanel").data(e) && (i = $("#D_F_FriendsPanel").data(e).name, n = $("#D_F_FriendsPanel").data(e).roomID, !(!i || !n) && (this.notify(i, this.JUMP_AVAILABLE, e), Disney.Friends.UI.ContextNotification.hide(), void Disney.Friends.UI.Friends.meUpdate())))
    },
    notifyInvite: function(e) {
        var i, n, t;
        if (e = $(e), i = Number(e.find("characterId").text()), n = Number(e.find("id").text()), !e || !Disney.Social.Data.mascots || !Disney.Social.Data.mascots[i]) return !1;
        t = "character_" + i, i = Disney.Social.Data.mascots[i].name, this.characterPresences[t] = {
            id: n,
            location: {
                world: Number(e.find("worldId").text()),
                room: Number(e.find("roomId").text())
            }
        }, this.notify(i, this.CHARACTER_INVITE, t)
    },
    reposition: function() {
        var e, i = Disney.ClubPenguin.getNotifyPosition();
        e = $("#D_F_HudNotification").height(), $("#D_F_HudNotification").css("top", (i.top - e).toString() + "px"), $("#D_F_HudNotification").css("left", (i.left - 83).toString() + "px")
    },
    bindClickAvatar: function() {
        $("#D_F_HudNotifCard").unbind("mousedown").mousedown(function(e) {
            Disney.Social.stopEvent(e), "string" == typeof(e = Disney.Friends.UI.HudNotification.crtSwid) ? Disney.Friends.UI.showPlayerCard(e) : Disney.Friends.UI.HudNotification.notificationClick()
        })
    },
    bindClickAccept: function() {
        $("#D_F_HudNotifBtnY").mousedown(function(e) {
            Disney.Social.stopEvent(e), e = Disney.Friends.UI.HudNotification.crtSwid, Disney.Friends.UI.HudNotification.close(), Disney.Friends.UI.Pending.accept(e)
        })
    },
    bindClickReject: function() {
        $("#D_F_HudNotifBtnN").mousedown(function(e) {
            Disney.Social.stopEvent(e), e = Disney.Friends.UI.HudNotification.crtSwid, Disney.Friends.UI.HudNotification.close(), Disney.Friends.UI.Pending.reject(e)
        })
    },
    bindMouseLeave: function() {
        Disney.Friends.UI.HudNotification.clearTimer(), $("#D_F_HudNotification").unbind("mouseleave").mouseleave(function(e) {
            if ($(this).unbind("mouseleave"), Disney.Social.stopEvent(e), (e = Disney.Friends.UI.HudNotification).hidding) return !1;
            e.clearTimer(), e.slidedUp()
        })
    },
    notificationClick: function() {
        Disney.Friends.UI.showFriendsSection()
    },
    deQueue: function() {
        var e, i, n, t, s, r, d, a, o;
        for (this.crtArray && this.crtSplice && (this.crtArray.splice(0, this.crtSplice), this.crtArray = null, this.crtSplice = 0), a = this.notifyTypes.length, e = 0; e < a; e++)
            if (n = this.notifyTypes[e], s = this.notifyArrays[e], (d = s.length) > 0) {
                if (o = s[0].p, i = s[0].n, t = s[0].s, n === this.CHARACTER_ONLINE || n === this.CHARACTER_INVITE) r = 1;
                else if (d > 1) {
                    for (i = d.toString(), t = [], e = 0; e < d; e++) t.push(s[e].s);
                    r = s.length
                } else r = 1;
                break
            } if (i && n && t) {
            if (n === this.FRIEND_REQUEST) {
                if (this.accumulateTimeout && clearTimeout(this.accumulateTimeout), r > this.requestCount) return this.requestCount = r, this.accumulateTimeout = setTimeout(function() {
                    Disney.Friends.UI.HudNotification.rescan()
                }, Disney.Friends.UI.delay), !1;
                this.requestCount = 1
            }
            this.crtArray = s, this.crtSplice = r, setTimeout(function() {
                this.show(i, n, t, o)
            }.bind(this), 50)
        }
    },
    show: function(e, i, n, t) {
        this.timeStarted = (new Date).getTime(), Disney.Friends.API.showingNotification(), this.crtSwid = null, this.crtNotifyType = i, this.reposition();
        var s, r, d, a = Disney.Social,
            o = "string" != typeof n;
        if ($(".D_F_HudNotifBubble_BoxW").css("width", "190px"), $("#D_F_HudNotifLine2").show(), $("#D_F_HudNotifJump").css("display", "none").siblings("input[type=hidden]").val(n), d = $("#D_F_HudNotifLine1"), r = $("#D_F_HudNotifLine2"), $("#D_F_HudNotifBtns").css("display", "none"), i === this.CHARACTER_ONLINE || i === this.CHARACTER_INVITE) Disney.Friends.UI.getAvatarUriBySwid("#D_F_HudNotifAvatar", n, 60, !1), s = Disney.Friends.UI.setText("D4"), Disney.Friends.activeUser.isPreActivated ? $("#D_F_HudNotifBtns").remove() : i === this.CHARACTER_INVITE && $("#D_F_HudNotifBtns").show();
        else if ("string" == typeof n) {
            switch (Disney.Friends.UI.getAvatarUriBySwid("#D_F_HudNotifAvatar", n, 60, !1), this.crtSwid = n, i) {
                case this.FRIEND_ACCEPTANCE:
                    $("#D_F_HudNotifBtnY").css("zoom", "").hide(), $("#D_F_HudNotifBtnN").css("zoom", "").hide(), s = Disney.Friends.UI.setText("D8").replace("{0}", e), (d = $("#D_F_HudNotifLine2")).css("display", "none"), r = $("#D_F_HudNotifLine1");
                    break;
                case this.FRIEND_REQUEST:
                    s = Disney.Friends.UI.setText("D6");
                    break;
                case this.JUMP_AVAILABLE:
                    s = Disney.Friends.UI.setText("D2");
                    break;
                case this.FRIEND_ONLINE:
                    s = Disney.Friends.UI.setText("D25")
            }
            Disney.Friends.activeUser.isPreActivated ? $("#D_F_HudNotifBtns").remove() : $("#D_F_HudNotifBtns").show()
        } else switch (Disney.Friends.UI.Images.setAttrs("#D_F_HudNotifAvatar", "14", !1), i) {
            case this.FRIEND_ACCEPTANCE:
                s = Disney.Friends.UI.setText("D12").replace("{0}", e), (d = $("#D_F_HudNotifLine2")).css("display", "none"), r = $("#D_F_HudNotifLine1");
                break;
            case this.FRIEND_REQUEST:
                s = Disney.Friends.UI.setText("D5").replace("{0}", e), (d = $("#D_F_HudNotifLine2")).css("display", "none"), r = $("#D_F_HudNotifLine1");
                break;
            case this.JUMP_AVAILABLE:
                e += " " + Disney.Friends.UI.setText("D9"), s = Disney.Friends.UI.setText("D1");
                break;
            case this.FRIEND_ONLINE:
                e += " " + Disney.Friends.UI.setText("D9"), s = Disney.Friends.UI.setText("D3")
        }
        d.empty().text(e).css("font-weight", "bold"), r.empty().text(s).css("font-weight", "normal"), e = $("#D_F_HudNotification .D_F_FriendPresence"), i === this.FRIEND_ONLINE && t && !o ? (e.text(t.mobile ? Disney.Friends.UI.setText("D24") : Disney.Friends.UI.setText("D23")), e.show()) : e.hide(), $("#D_F_HudNotifBtnY").css("display", "none").css("zoom", ""), $("#D_F_HudNotifBtnN").css("display", "none").css("zoom", ""), i !== this.FRIEND_REQUEST || o || (a.ieVer > 0 && a.ieVer < 8 ? ($("#D_F_HudNotifBtnY").css("zoom", "1").css("display", "inline"), $("#D_F_HudNotifBtnN").css("zoom", "1").css("display", "inline")) : ($("#D_F_HudNotifBtnY").css("display", "inline-block"), $("#D_F_HudNotifBtnN").css("display", "inline-block"))), "none" === $("#D_F_FriendSection").css("display") && Disney.Friends.API.pollJumpStatus(!0), $("#D_F_HudNotification").show(), $("#D_F_HudNotifBtnY").width(), $("#D_F_HudNotifBtnN").width(), Disney.Friends.UI.HudNotification.reStyleBubble(), $("#D_F_HudNotifBubble").stop(!0, !1).css("top", "124px").animate({
            top: "-=99"
        }, Disney.Friends.UI.HudNotification.SLIDE_TIME, Disney.Friends.UI.HudNotification.slidedUp)
    },
    reStyleBubble: function() {
        var e, i;
        if ("none" === $("#D_F_HudNotification").css("display")) return !1;
        $("#D_F_HudNotifMessage").css("top", ((30 - $("#D_F_HudNotifMessage").height() - $("#D_F_HudNotifBtns").height()) / 2).toString() + "px"), $("#D_F_HudNotifBtns").css("top", (parseInt($("#D_F_HudNotifMessage").css("top"), 10) + $("#D_F_HudNotifMessage").height() + 2).toString() + "px"), "none" === $("#D_F_HudNotifBtnJ").css("display") ? $("#D_F_HudNotifRoom").css("text-align", "left").css("left", "0px").css("color", "gray") : $("#D_F_HudNotifRoom").css("left", "5px").css("text-align", "center"), e = 0, "none" !== $("#D_F_HudNotifLine1").css("display") && (e = Math.max(e, $("#D_F_HudNotifLine1").width())), "none" !== $("#D_F_HudNotifLine2").css("display") && (e = Math.max(e, $("#D_F_HudNotifLine2").width())), "none" !== $("#D_F_HudNotifBtnJ").css("display") && (e = Math.max(e, $("#D_F_HudNotifBtnJ").width())), "none" !== $("#D_F_HudNotifRoom").css("display") && (e = Math.max(e, $("#D_F_HudNotifRoom").width())), "none" !== $("#D_F_HudNotifBtnY").css("display") && "none" !== $("#D_F_HudNotifBtnN").css("display") && (i = $("#D_F_HudNotifBtnY").width() + $("#D_F_HudNotifBtnN").width(), e = Math.max(e, i)), e > 151 && (e = 151), e < 60 && (e = 60), $(".D_F_HudNotifBubble_BoxW").css("width", (60 + e).toString() + "px")
    },
    slidedUp: function() {
        var e = Disney.Friends.UI.HudNotification,
            i = Disney.Friends.UI.delay;
        if (e.timeStarted) {
            var n = (new Date).getTime() - e.timeStarted;
            n >= i && (n = i - 20), i -= n
        }
        e.timeout = setTimeout(function() {
            Disney.Friends.UI.HudNotification.hide()
        }, i)
    },
    hide: function() {
        var e = Disney.Friends.UI.HudNotification;
        e.hidding = !0, $("#D_F_HudNotification").unbind("mouseleave"), $("#D_F_HudNotifBubble").stop(!0, !1).css("top", "26px").animate({
            top: "+=99"
        }, e.SLIDE_TIME, e.slidedDown)
    },
    slidedDown: function() {
        $("#D_F_HudNotification").hide();
        var e, i, n = Disney.Friends.UI.HudNotification;
        n.hidding = !1, "none" === $("#D_F_FriendSection").css("display") && Disney.Friends.API.pollJumpStatus(!1), Disney.Friends.UI.delay = Disney.Friends.UI.DELAY_NORMAL, Disney.Friends.UI.notificationAware || null === Disney.Friends.activeUser || (e = Disney.Friends.Settings.Constants.NOTIFICATION_AWARE, (i = Disney.Friends.activeUser.settings).settings[e] || i.addSetting(e, "true")), n.timeStarted = null, Disney.Friends.API.closedNotification(), n.rescan()
    },
    clearTimer: function() {
        var e = Disney.Friends.UI.HudNotification;
        "number" == typeof e.timeout && clearTimeout(e.timeout)
    },
    close: function() {
        var e = Disney.Friends.UI.HudNotification;
        e.clearTimer(), $("#D_F_HudNotification").unbind("mouseleave"), $("#D_F_HudNotifBubble").stop(!0, !1), $("#D_F_HudNotification").hide(), $("#D_F_HudNotifBubble").css("top", "124px"), e.timeStarted = null, Disney.Friends.API.closedNotification(), e.rescan()
    },
    rescan: function() {
        var e = Disney.Friends.UI.HudNotification;
        if (!e.hudVisible || e.timeStarted) return !1;
        e.deQueue()
    },
    clearRequest: function(e) {
        if (!e) return !1;
        var i, n, t, s, r = Disney.Friends.UI.HudNotification;
        for (i = r.notifyTypes.indexOf(r.FRIEND_REQUEST), s = -1, n = (t = r.notifyArrays[i]).length, i = 0; i < n; i++)
            if (t[i].s === e) {
                s = i;
                break
            } s > -1 && t.splice(s, 1), e === r.crtSwid && r.crtNotifyType === r.FRIEND_REQUEST && r.close()
    },
    notify: function(e, i, n, t) {
        if (!e || !i || !n) return !1;
        var s, r;
        if ((i = this.notifyTypes.indexOf(i)) < 0) return !1;
        for (s = (r = this.notifyArrays[i]).length, i = 0; i < s; i++)
            if (r[i].s === n) return !1;
        r.push({
            s: n,
            n: e,
            p: t
        }), this.rescan()
    }
}, Disney.Friends.UI.ContextNotification = {
    bestHintShown: !1,
    queue: [],
    init: function() {
        Disney.Friends.UI.frameIt("D_F_ContextNotification", "D_F_Box25Template", 150, 30, "2");
        var e = Disney.Friends.Event;
        e.addListener(e.FRIENDS_JUMP_FAILED, this.showJumpError.bind(this)), $("#D_F_ContextNotifClose").mousedown(function(e) {
            Disney.Social.stopEvent(e), Disney.Friends.UI.ContextNotification.hide()
        })
    },
    showBestHint: function() {
        var e, i = Disney.Friends.UI;
        return e = i.ContextNotification, !(i.bestCount >= i.BEST_HINT_COUNT_MAX || e.bestHintShown || !i.bestEnabled && i.Friends.arrAllFriends.length < 10) && (e.active ? (e.queue.indexOf("show_best") < 0 && e.queue.push("show_best"), !1) : "none" !== $("#D_F_FriendSection").css("display") && (e.bestHintShown = !0, i.bestCount++, null !== Disney.Friends.activeUser && (e = Disney.Friends.Settings.Constants.BEST_HINT_COUNT, Disney.Friends.activeUser.settings.addSetting(e, i.bestCount.toString())), this.delay = i.DELAY_FIRST, $("#D_F_ContextNotifUp").css("left", "33px").show(), i.Images.setAttrs("#D_F_ContextNotifIcon", "41", !1), $("#D_F_ContextNotifText").text(i.setText("D11")), $(".D_F_ContextNotification_BoxH").css("height", "30px"), $(".D_F_ContextNotification_BoxW").css("width", "140px"), $("#D_F_ContextNotifText").css("height", "48px").css("width", "85px"), $("#D_F_ContextNotification").css("top", "60px").css("left", "60px"), void this.display()))
    },
    showJumpError: function(e) {
        var i, n, t;
        if ("none" === $("#D_F_FriendSection").css("display")) return !1;
        if (!e) return !1;
        if (!(n = Disney.Friends.UI.Friends.getTileIdBySwid(e))) return !1;
        if (self.active) return self.queue.indexOf(e) < 0 && self.queue.push(e), !1;
        switch (this.delay = Disney.Friends.UI.delay, $(".D_F_ContextNotification_BoxH").css("height", "30px"), $(".D_F_ContextNotification_BoxW").css("width", "150px"), $("#D_F_ContextNotifText").css("height", "51px").css("width", "100px"), e = $("#" + n).position(), i = $("#" + n).parent().position(), n = e.top + i.top + 155, i = e.left + i.left + 25, t = -5, e.left) {
            case 100:
                i -= 50, t += 50;
                break;
            case 200:
                i -= 100, t += 100
        }
        256 === e.top ? (n -= 120, $("#D_F_ContextNotifDn").show()) : $("#D_F_ContextNotifUp").show(), $("#D_F_ContextNotification").css("top", n.toString() + "px").css("left", i.toString() + "px"), $("#D_F_ContextNotifUp").css("left", t.toString() + "px"), $("#D_F_ContextNotifDn").css("left", t.toString() + "px"), Disney.Friends.UI.Images.setAttrs("#D_F_ContextNotifIcon", "42", !1), $("#D_F_ContextNotifText").text(Disney.Friends.UI.setText("D14")), this.display()
    },
    display: function() {
        var e = Disney.Friends.UI.ContextNotification;
        $("#D_F_ContextNotification").show(), e.clearTimer(), e.timeout = setTimeout(function() {
            Disney.Friends.UI.ContextNotification.hide()
        }, e.delay)
    },
    clearTimer: function() {
        var e = Disney.Friends.UI.ContextNotification;
        "number" == typeof e.timeout && (clearTimeout(e.timeout), delete e.timeout)
    },
    hide: function() {
        var e = Disney.Friends.UI.ContextNotification;
        e.clearTimer(), $("#D_F_ContextNotification").css("display", "none"), $("#D_F_ContextNotifUp").css("display", "none"), $("#D_F_ContextNotifDn").css("display", "none");
        var i = Disney.Friends.UI;
        i.delay = i.DELAY_NORMAL, e.active = !1, e.loop()
    },
    cancel: function() {
        var e = Disney.Friends.UI.ContextNotification;
        e.clearTimer(), e.queue.length = 0, e.hide()
    },
    loop: function() {
        var e, i = Disney.Friends.UI.ContextNotification;
        i.queue.length > 0 && (0 === (e = i.queue.shift()).indexOf("show_best") ? i.showBestHint() : i.showJumpError(e))
    }
}, Disney.Friends.UI.Data = {
    markup: null,
    text: null,
    images: null,
    init: function() {
        if ("number" == typeof this.timeoutID && (clearTimeout(this.timeoutID), delete this.timeoutID), this.markup && this.text && this.images) return !1;
        var e = Disney.Social,
            i = e.Environment;
        this.markup || $.ajax(e.getUrl(i.FRIENDS_BASE_URL, i.MARKUP_PATH), {
            cache: !0,
            dataType: "jsonp",
            jsonpCallback: "markupData",
            success: function(e) {
                Disney.Friends.UI.Data.markup = e, Disney.Friends.UI.Data.setMarkup()
            }
        }), this.text || $.ajax(e.getUrlForLanguage(i.FRIENDS_BASE_URL, i.TEXT_PATH), {
            cache: !0,
            dataType: "jsonp",
            jsonpCallback: "textData",
            success: function(e) {
                Disney.Friends.UI.Data.text = e, Disney.Friends.UI.Data.setText()
            }
        }), this.images || $.ajax(e.getUrl(i.FRIENDS_BASE_URL, i.IMAGES_PATH), {
            cache: !0,
            dataType: "jsonp",
            jsonpCallback: "imagesData",
            success: function(e) {
                Disney.Friends.UI.Data.images = e, Disney.Friends.UI.Data.setImages()
            }
        }), this.timeoutID = setTimeout(function() {
            Disney.Friends.UI.Data.init()
        }, 12e4)
    },
    setMarkup: function() {
        var e = Disney.Friends.UI;
        if (!e.gotLayout) return !1;
        e.setLayout()
    },
    setText: function() {
        var e = Disney.Friends.UI;
        if (!e.Data.text || !e.gotLayout) return !1;
        $("[lang]").each(function() {
            "html" !== this.nodeName.toLowerCase() && e.setTagText(this)
        }), Disney.Friends.UI.Images.setImplicit()
    },
    setImages: function() {
        Disney.Friends.UI.Images.init()
    }
}, Disney.Friends.UI.Data.init(), Disney.Friends.UI.Me = {
    worldId: null,
    roomId: null,
    init: function() {
        $("#D_F_FriendsSectionClose").mousedown(function(e) {
            Disney.Social.stopEvent(e), Disney.Friends.UI.hideFriendsSection()
        });
        var e = Disney.Friends.Event;
        e.addListener(e.USER_PRESENCE_UPDATE, this.updatePresence.bind(this))
    },
    updatePresence: function(e) {
        if (!e) return !1;
        this.worldId = $(e).find("world").text(), this.roomId = $(e).find("room").text(), Disney.Friends.UI.Friends.meUpdate()
    }
}, Disney.Friends.UI.Slider = {
    crtSlider: null,
    crtHandle: null,
    crtPanel: null,
    crtFadingUp: null,
    crtFadingDn: null,
    totalScroll: 0,
    handleHeightMin: 52,
    sliderStep: 1,
    sliderMin: 0,
    sliderMax: 100,
    holdScroll: null,
    init: function(e, i, n, t, s, r) {
        e && (i || (i = 0), n || (n = 0), t || (t = 0), s && (this.sliderMax = s), r && (this.sliderMax = r), this.crtPanel = $("#" + e), this.crtPanel.parent().append($("#D_F_GenericSliderTemplate > div").clone(!0)), this.crtSlider = $(this.crtPanel.siblings(":last").children(".D_F_Slider")[0]), this.crtSlider.slider({
            orientation: "vertical",
            range: "min",
            min: this.sliderMin,
            max: this.sliderMax,
            value: 0,
            start: function() {},
            slide: function(e, i) {
                this.scrollToValue(i)
            }.bind(this)
        }), this.crtHandle = this.crtSlider.find(".ui-slider-handle")[0], this.buildHandle(), this.crtSlider.parent().css("top", i.toString() + "px").css("right", n.toString() + "px").css("height", t.toString() + "px"), this.crtSlider.show(), e = this.crtSlider.parent().find(".D_F_SliderArrowTop")[0], $(e).mousedown(function(e) {
            Disney.Social.stopEvent(e), this.scrollUp(), this.holdScroll = setInterval(function() {
                this.scrollUp()
            }.bind(this), 100)
        }.bind(this)), $(e).mouseup(function(e) {
            Disney.Social.stopEvent(e), this.holdScroll && clearInterval(this.holdScroll)
        }.bind(this)), e = this.crtSlider.parent().find(".D_F_SliderTop")[0], $(e).mousedown(function(e) {
            Disney.Social.stopEvent(e), this.scrollToTop()
        }.bind(this)), e = this.crtSlider.parent().find(".D_F_SliderBottom")[0], $(e).mousedown(function(e) {
            Disney.Social.stopEvent(e), this.scrollBottom()
        }.bind(this)), e = this.crtSlider.parent().find(".D_F_SliderArrowBottom")[0], $(e).mousedown(function(e) {
            Disney.Social.stopEvent(e), this.scrollDown(), this.holdScroll = setInterval(function() {
                this.scrollDown()
            }.bind(this), 100)
        }.bind(this)), $(e).mouseup(function(e) {
            Disney.Social.stopEvent(e), this.holdScroll && clearInterval(this.holdScroll)
        }.bind(this)))
    },
    buildHandle: function() {
        $(this.crtHandle).append($("#D_F_SliderHandleTopTemplate > div").clone(!0)), $(this.crtHandle).append($("#D_F_SliderHandleBottomTemplate > div").clone(!0))
    },
    bindMousewheel: function() {
        var e = this;
        e.crtPanel.unbind("mousewheel").bind("mousewheel", function(i, n) {
            Disney.Social.stopEvent(i), e.onMousewheel(), e.mousewheelSlide(n)
        }), e.crtSlider.parent().unbind("mousewheel").bind("mousewheel", function(i, n) {
            Disney.Social.stopEvent(i), e.onMousewheel(), e.mousewheelSlide(n)
        })
    },
    unbindMousewheel: function() {
        this.scrollToTop(), this.crtPanel.unbind("mousewheel"), this.crtSlider.parent().unbind("mousewheel")
    },
    scrollToValue: function(e) {
        var i = Math.round(this.totalScroll * (this.sliderMax - e.value) / this.sliderMax);
        i = this.getCustomTop(i, e.value), this.crtPanel.scrollTop(i), this.crtFadingUp && (e.value === this.sliderMax || "none" === this.crtSlider.parent().css("display") ? this.crtFadingUp.css("display", "none") : this.crtFadingUp.show()), this.crtFadingDn && (e.value === this.sliderMin || "none" === this.crtSlider.parent().css("display") ? this.crtFadingDn.css("display", "none") : this.crtFadingDn.show())
    },
    getCustomTop: function(e) {
        return e
    },
    onMousewheel: function() {},
    scrollUp: function() {
        this.mousewheelSlide(1)
    },
    scrollDown: function() {
        this.mousewheelSlide(-1)
    },
    scrollToTop: function() {
        this.scrollToValue({
            value: this.sliderMax
        }), this.crtSlider.slider("value", this.sliderMax)
    },
    scrollBottom: function() {
        this.scrollToValue({
            value: this.sliderMin
        }), this.crtSlider.slider("value", this.sliderMin)
    },
    mousewheelSlide: function(e) {
        var i = this.crtSlider.slider("value");
        if (i === this.sliderMax && e > 0 || i === this.sliderMin && e < 0) return !1;
        (i += e * this.sliderStep) > this.sliderMax && (i = this.sliderMax), i < this.sliderMin && (i = this.sliderMin), this.scrollToValue({
            value: i
        }), this.crtSlider.slider("value", i)
    },
    getCustomHeight: function(e) {
        return e
    },
    resize: function() {
        if (!Disney.Friends.UI.isVisible(this.crtSlider)) return !1;
        var e, i, n, t = this.crtPanel.height();
        this.crtSlider.parent().css("height", t.toString() + "px"), e = Math.max(this.crtPanel[0].scrollHeight, this.crtPanel[0].clientHeight) - t, this.totalScroll = e = this.getCustomHeight(e), i = this.sliderMax, e + t > 0 && (i = Math.round(this.sliderMax * t / (e + t))), e = this.crtSlider.parent().height(), (i = 2 * Math.round((e - 50) * i / (2 * this.sliderMax))) < this.handleHeightMin - 8 && (i = this.handleHeightMin - 8), n = i / 2, $(this.crtSlider).prev().css("height", (4 + n).toString() + "px"), $(this.crtSlider).next().css("height", (4 + n).toString() + "px"), (i = e - 2 * n - 50) <= 0 && (i = 1), $(this.crtSlider).css("height", i.toString() + "px").css("top", (n + 25).toString() + "px"), $(this.crtHandle).children().each(function() {
            var e = (n - 7).toString() + "px";
            $(this).css("height", e), $(this).hasClass("D_F_SliderHandleMTop") ? $(this).css("top", "-" + e) : $(this).css("bottom", "-" + e)
        })
    },
    show: function() {
        this.crtSlider.parent().show()
    },
    hide: function() {
        this.crtSlider.parent().hide()
    }
}, Disney.Friends.UI.Friends = {
    SECTION_HEIGHT: 360,
    TILE_WIDTH: 100,
    TILE_HEIGHT: 128,
    BEST_FRIEND: "BF_",
    BEST_CHARACTER: "BC_",
    CHARACTER: "C_",
    FRIEND: "F_",
    START_IGLOO_ROOM_ID: 2e3,
    oldScrollTop: null,
    arrAllFriends: [],
    crtSwid: null,
    swids: [],
    grid: {},
    columns: 2,
    init: function() {
        var e, i = Disney.Friends.Presence.Status,
            n = Disney.Friends.Event,
            t = Disney.Social.Event,
            s = Disney.Friends.UI.Event;
        for ($("#D_F_FriendsPanel").data(), Disney.Friends.UI.frameIt("D_F_FriendSection", "D_F_Box25Template", 180, this.SECTION_HEIGHT, "0"), Disney.Friends.UI.frameIt("D_F_FriendSectionReconnect", "D_F_Box25Template", 180, this.SECTION_HEIGHT, "1"), this.groupNames = [this.BEST_FRIEND + i.ONLINE, this.BEST_CHARACTER + i.ONLINE, this.CHARACTER + i.ONLINE, this.FRIEND + i.ONLINE, this.BEST_FRIEND + i.OFFLINE, this.BEST_CHARACTER + i.OFFLINE, this.FRIEND + i.OFFLINE, this.CHARACTER + i.OFFLINE], this.groupArrays = [], e = this.groupNames.length, i = 0; i < e; i++) this.groupArrays.push([]);
        this.gridInit(), this.gridFill(), this.listSlider = Object.create(Disney.Friends.UI.Slider), this.listSlider.init("D_F_FriendsPanel", 20, -16, 3 * this.TILE_HEIGHT, 0, 100), this.listSlider.crtFadingUp = $("#D_F_FriendsGridFadeUp"), this.listSlider.crtFadingDn = $("#D_F_FriendsGridFadeDn"), this.listSlider.getCustomTop = this.getCustomTop, this.listSlider.getCustomHeight = this.getCustomHeight, this.listSlider.onMousewheel = this.onMousewheel, $(this.listSlider.crtSlider.parent()).mousedown(function() {
            Disney.Friends.UI.ContextNotification.cancel()
        }), n.addListener(n.FRIENDS_UPDATE, this.updateList.bind(this)), n.addListener(n.FRIENDS_WEIGHT_UPDATE, this.updatePriority.bind(this)), n.addListener(n.FRIENDS_NEW, this.updateNew.bind(this)), n.addListener(n.FRIENDS_REMOVE, this.removeFriend.bind(this)), n.addListener(n.SAFE_CHAT_CONNECTION_UPDATE, this.safeChatConnectionUpdate.bind(this)), t.addListener(t.ROOM_UPDATE, this.roomUpdate.bind(this)), n.addListener(n.JUMP_STATUS_FOR_ROOMS_UPDATE, this.updateJumpStatus.bind(this)), s.addListener(s.SUBPANEL_TOGGLED, this.resize.bind(this))
    },
    getCustomTop: function(e, i) {
        var n = Disney.Friends.UI.Friends,
            t = Disney.Friends.UI.Friends.TILE_HEIGHT,
            s = n.getIndexAllFriends(),
            r = 3 * Math.floor(e / t),
            d = n.getIndexAllFriendsMax();
        return r > d && (r = d), n.crtSwid = n.arrAllFriends[r], s !== r && n.updateGrid(), i === this.sliderMax ? e = 0 : i === this.sliderMin ? e = t : e %= t, e
    },
    getIndexAllFriendsMax: function() {
        var e = 3 * (Math.ceil(this.arrAllFriends.length / 3) - 4);
        return e < 0 && (e = 0), e
    },
    getIndexAllFriends: function() {
        var e, i = 0;
        return 0 === this.arrAllFriends.length ? (this.crtSwid = null, i) : (e = this.columns, this.crtSwid && ((i = this.arrAllFriends.indexOf(this.crtSwid)) < 0 ? i = 0 : (e > 0 && (i = e * Math.floor(i / e)), i > (e = this.getIndexAllFriendsMax()) && (i = e))), this.crtSwid = this.arrAllFriends[i], i)
    },
    checkIndexAllFriends: function(e) {
        if (this.bestSwid) return !1;
        var i;
        e === this.crtSwid && (e = this.arrAllFriends.indexOf(e) + 1, (i = 3 * (Math.ceil(this.arrAllFriends.length - 1 / 3) - 3)) < 0 && (i = 0), e > i && (e = i), this.crtSwid = this.arrAllFriends[e])
    },
    getCustomHeight: function(e) {
        var i = (e = Disney.Friends.UI.Friends).TILE_HEIGHT,
            n = this.sliderMin;
        return (e = Math.ceil(e.arrAllFriends.length / 3) * i - 3 * i) < 0 && (e = 0), e > 0 && (n = Math.ceil(this.sliderMax * i / e)), n < 1 && (n = 1), n > this.sliderMax && (n = this.sliderMax), this.sliderStep = n, e
    },
    onMousewheel: function() {
        Disney.Friends.UI.ContextNotification.cancel()
    },
    roomUpdate: function() {},
    safeChatConnectionUpdate: function(e) {
        var i = $("#D_F_FriendsPanel");
        i.find(".D_F_FriendName").each(function() {
            var n = $(this).siblings("input[type=hidden]").val(),
                t = $(this).siblings(".D_F_FriendPName")[0];
            if (void 0 !== (n = i.data(n))) {
                var s = n.name;
                void 0 !== s && null !== s && (!0 === e && null !== n.safeChatName && (t ? $(t).text("(" + n.safeChatName + ")") : s += " (" + n.safeChatName + ")"), $(this).text(s))
            }
        })
    },
    meUpdate: function() {
        $(".D_F_FriendJump").each(function() {
            $(this).hasClass("D_F_JumpTemplate") || Disney.Friends.UI.Friends.updateJump(this)
        }), Disney.Friends.UI.HudNotification.reStyleBubble()
    },
    updateJumpStatus: function() {
        Disney.Friends.UI.Friends.meUpdate()
    },
    gridInit: function() {
        for (var e = 0; e < 4; e++)
            for (var i = 0; i < 3; i++) {
                $("#D_F_FriendsGrid").append($("#D_F_TileTemplate > div").clone(!0));
                var n = "D_F_Tile_" + e.toString() + i.toString();
                $("#D_F_FriendsGrid").children(":last").attr("id", n).addClass("D_F_Tile_R" + e.toString()).addClass("D_F_Tile_C" + i.toString())
            }
    },
    gridFill: function() {
        var e, i, n, t;
        for (e = 0; e < 4; e++)
            for (i = 0; i < 3; i++) this.grid[e] || (this.grid[e] = {}), this.grid[e][i] || (this.grid[e][i] = {}), this.grid[e][i].swid = null;
        for (t = this.swids.length, e = 0; e < t; e++) i = this.swids[e], n = this.getCoordByIndex(e), this.grid[n[0]][n[1]].swid = i;
        this.gridPaint()
    },
    resize: function() {
        var e, i, n;
        n = 2;
        var t, s = 0;
        e = 0, (t = this.arrAllFriends.length) > 5 && (n = 3), e = this.SECTION_HEIGHT, i = parseInt($("#D_F_FriendSection").css("height"), 10), (5 === t || t > 6) && (e += 44), "none" !== $("#D_F_AddFriendPanel").css("display") && (e += 25), "none" !== $("#D_F_NotificationPanel").css("display") && (e += 20), n !== this.columns && (s = (n - this.columns) * this.TILE_WIDTH, this.columns = n, $("#D_F_FriendsPanel").width(n * this.TILE_WIDTH)), n = this.listSlider.crtSlider.parent(), t > 9 ? ($("#D_F_FriendsPanel").css("left", "-13px"), $(".D_F_FriendFavorite").show(), this.listSlider.bindMousewheel(), "none" === $(n).css("display") && ($(n).show(), s += parseInt($(n).css("width"), 10) - 10), e += 3) : ($("#D_F_FriendsPanel").css("left", "-10px"), Disney.Friends.UI.bestEnabled ? $(".D_F_FriendFavorite").show() : $(".D_F_FriendFavorite").css("display", "none"), this.listSlider.unbindMousewheel(), this.listSlider.scrollToTop(), "none" !== $(n).css("display") && (s -= parseInt($(n).css("width"), 10) - 10, $(n).hide())), e -= i, (s || e) && Disney.Friends.UI.resizeFriendsWidgetWith(s, e)
    },
    gridPaint: function() {
        var e, i, n, t, s, r = $("#D_F_FriendsGrid").detach();
        for (e = 0; e < 4; e++)
            for (i = 0; i < 3; i++)(n = this.getTileIdByCoord(e, i)) && (n = r.find("#" + n)) && ((t = this.grid[e][i].swid) ? (void 0 === (s = $(n).find(".D_F_FriendAvatar")[0]) && (Disney.Social.unbindAll(n), $(n).empty().append($("#D_F_FriendTileTemplate > *").clone(!0)), s = $(n).find(".D_F_JumpTemplate")[0], $(s).removeClass("D_F_JumpTemplate")), this.displayTile(n, t)) : e < 3 ? void 0 === (s = $(n).find(".D_F_AddFriendBtn")[0]) && this.arrAllFriends.length < 9 && (Disney.Social.unbindAll(n), $(n).empty().append($("#D_F_AddTileTemplate > *").clone(!0))) : (Disney.Social.unbindAll(n), $(n).empty()));
        r.appendTo("#D_F_FriendsPanel"), $("#D_F_FriendsPanel").scrollTop(0)
    },
    updateArrays: function() {
        var e, i, n, t = Disney.Friends.UI.Event;
        for (i = this.arrAllFriends.length, this.arrAllFriends.length = 0, n = this.groupArrays.length, e = 0; e < n; e++) this.parseFriendsArr(this.groupArrays[e]);
        i !== (e = this.arrAllFriends.length) && t.updateListeners(t.FRIENDS_COUNT, e), this.updateGrid(), this.bestSwid = null, this.arrAllFriends.length > 9 ? (Disney.Friends.UI.ContextNotification.showBestHint(), this.listSlider.resize(), $("#D_F_HeaderFriendsCount").text("(" + this.arrAllFriends.length.toString() + ")").show(), t = Math.ceil(this.arrAllFriends.length / 3), i = Math.ceil(this.getIndexAllFriends() / 3), t = (e = this.listSlider.sliderMax) - Math.round(e * i / t), this.listSlider.crtSlider.slider("value", t)) : $("#D_F_HeaderFriendsCount").css("display", "none"), Disney.Friends.UI.Images.preloadAvatars()
    },
    parseFriendsArr: function(e) {
        var i, n, t = e.length;
        for (i = 0; i < t; i++) n = e[i].swid, this.arrAllFriends.push(n)
    },
    updateGrid: function() {
        var e, i;
        if ("none" === $("#D_F_FriendSection").css("display")) return !1;
        for (this.swids.length = 0, e = this.getIndexAllFriends(), i = this.arrAllFriends.length, e = e; e < i && (this.swidsAdd(this.arrAllFriends[e]), 12 !== this.swids.length); e++);
        this.gridFill()
    },
    swidsAdd: function(e) {
        return !!e && (!(this.swids.length > 11) && (!(this.swids.indexOf(e) >= 0) && (this.swids.push(e), !0)))
    },
    getSwidIndex: function(e, i) {
        for (var n = i.length; n--;)
            if (i[n].swid === e) return n;
        return -1
    },
    getTileIdByCoord: function(e, i) {
        return "D_F_Tile_" + e.toString() + i.toString()
    },
    getTileIdBySwid: function(e) {
        return (e = this.swids.indexOf(e)) < 0 ? null : (e = this.getCoordByIndex(e), e ? this.getTileIdByCoord(e[0], e[1]) : null)
    },
    getGroupIndexBySwid: function(e) {
        var i, n, t = this.groupArrays.length;
        for (i = 0; i < t; i++)
            if ((n = this.getSwidIndex(e, this.groupArrays[i])) > -1) return [i, n];
        return [-1, -1]
    },
    getCoordByIndex: function(e) {
        return !this.columns || e < 0 || e > 11 ? null : [Math.floor(e / this.columns), (e + this.columns) % this.columns]
    },
    getSwidByTileId: function(e) {
        var i = null,
            n = e.lastIndexOf("_"),
            t = e.substr(n + 1, 1);
        return e = e.substr(n + 2, 1), this.grid[t] && this.grid[t][e] && (i = this.grid[t][e].swid), i
    },
    displayTile: function(e, i) {
        var n = Disney.Friends.Presence.Status,
            t = Disney.Friends.UI.Images,
            s = this.getGroupIndexBySwid(i),
            r = $("#D_F_FriendsPanel").data(i);
        if (!r) return !1;
        var d = r.Id,
            a = r.name;
        r = r.status;
        var o, c, l;
        $(e).children("input[type=hidden]").val(i), (o = $(e).find(".D_F_PlayerCard")[0]) && 0 === i.indexOf("character_") && (Disney.Friends.UI.FriendsTile.bindCharacterCard(o), Disney.Social.Data.mascots && Disney.Social.Data.mascots[d] && (a = Disney.Social.Data.mascots[d].name)), o || $(e).find(".D_F_CharacterCard"), c = $(e).find(".D_F_FriendAvatar")[0], l = $(e).find(".D_F_FriendAvatarOff")[0], d = $(e).find(".D_F_FriendFavorite")[0], o = $(e).find(".D_F_FriendName")[0], Disney.Friends.UI.getAvatarUriBySwid(c, i, 88, !0), r === n.ONLINE ? $(l).css("display", "none") : $(l).show(), $(c).show(), (n = this.groupNames[s[0]]).substr(0, this.BEST_FRIEND.length) === this.BEST_FRIEND || n.substr(0, this.BEST_CHARACTER.length) === this.BEST_CHARACTER ? (t.setAttrs(d, "20", !1), $(d).attr("title", Disney.Friends.UI.setText("D7"))) : (t.setAttrs(d, "22", !1), $(d).attr("title", Disney.Friends.UI.setText("D10"))), void 0 !== o && null !== o && $(o).text(a), this.updateJump($(e).find(".D_F_FriendJump")[0])
    },
    updateJump: function(e, i) {
        if (!e) return !1;
        $(e).css("cursor", "default").unbind("mousedown");
        var n, t, s, r, d = Disney.Friends.Presence.Status,
            a = Disney.Friends.UI.Me,
            o = Disney.Social.Data,
            c = Disney.Friends.UI.Friends;
        if (!(r = $(e).siblings("input[type=hidden]").val())) return !1;
        if ((n = $("#D_F_FriendsPanel").data(r)) || (n = {
                status: d.OFFLINE,
                roomID: null,
                worldID: null
            }, i && (n.status = d.ONLINE, n.roomID = i.location.room, n.worldID = i.location.world)), t = n.status, (s = $(e).siblings(".D_F_FriendStatus")[0]) && (t === d.ONLINE ? $(s).css("display", "none") : $(s).show()), t !== d.ONLINE) return $(e).css("display", "none"), !1;
        if ($(e).css("display", "none"), d = $(e).find(".D_F_FriendJumpBtn")[0], $(d).css("display", "none"), t = $(e).find(".D_F_FriendRoom")[0], $(t).css("top", "4px"), $(t).text("").css("display", "none"), 0 === r.indexOf("character_") && !i) return !1;
        if ((r = n.roomID) && o.rooms && o.rooms[r]) $(e).show(), $(t).text(n.mobile ? Disney.Friends.UI.setText("D24") : Disney.Friends.UI.setText("D23")).css("left", "15px").css("color", "#6DABD7").css("display", "block");
        else {
            if (!(r > this.START_IGLOO_ROOM_ID)) return !1;
            $(e).show(), $(t).text(Disney.Friends.UI.setText("D22")).css("left", "15px").css("color", "#6DABD7").css("display", "block")
        }
        return !(!(o = n.worldID) || r === a.roomId && o === a.worldId) && (!(!i && !Disney.Friends.Jump.canJump(o, r)) && (c.bindJump(e), $(e).css("cursor", "pointer"), $(t).css("left", "5px").css("color", "white"), void $(d).show()))
    },
    bindJump: function(e) {
        $(e).mousedown(function(e) {
            Disney.Social.stopEvent(e), Disney.Friends.UI.HudNotification.close(), 0 === (e = $(this).siblings("input[type=hidden]").val()).indexOf("character_") ? Disney.Friends.UI.jumpToCharacter(Disney.Friends.UI.HudNotification.characterPresences[e]) : Disney.Friends.UI.jumpToFriend(e)
        })
    },
    updatePriority: function(e) {
        var i, n, t, s;
        for (i in e) e.hasOwnProperty(i) && e[i].weight && $("#D_F_FriendsPanel").data(i) && ($("#D_F_FriendsPanel").data(i).weight = e[i].weight);
        for (s = this.groupArrays.length, e = 0; e < s; e++) {
            for (t = (i = this.groupArrays[e]).length, n = 0; n < t; n++) i[n].weight = $("#D_F_FriendsPanel").data(i[n].swid).weight;
            this.sortListByWeight(e)
        }
        this.updateArrays()
    },
    updateTile: function(e) {
        if ("none" === $("#D_F_FriendSection").css("display")) return !1;
        var i = this.getTileIdBySwid(e);
        if (!i) return !1;
        void 0 !== $("#D_F_FriendsPanel").data(e) && null !== $("#D_F_FriendsPanel").data(e) && this.displayTile($("#" + i), e)
    },
    sortNames: function(e, i) {
        return e.name ? i.name ? e.name.toLocaleUpperCase().localeCompare(i.name.toLocaleUpperCase()) : -1 : 1
    },
    sortWeights: function(e, i) {
        return e.weight !== i.weight ? e.weight > i.weight ? -1 : 1 : 0
    },
    updateNew: function(e) {
        this.oldScrollTop = null;
        var i, n, t;
        e.hasOwnProperty("swid") && (n = e.swid, t = e.name, i = this.processSingleEntry(n, e), this.sortAffected(i), this.updateArrays(n)), this.updateWidget(), (i = Disney.Friends.UI.HudNotification).notify(t, i.FRIEND_ACCEPTANCE, n), Disney.Friends.UI.BarNotification.newFriendCallback(e)
    },
    updateList: function(e) {
        console.log("Disney.Friends.UI.Friends.updateList()"), this.oldScrollTop = null;
        var i, n;
        if (e.hasOwnProperty("character")) i = e.id.toString(), e = this.processSingleEntry(i, e), i = "character_" + i, this.sortAffected(e), 0 === e.length ? this.updateTile(i) : this.updateArrays();
        else if (e.hasOwnProperty("swid")) i = e.swid, e = this.processSingleEntry(i, e), this.sortAffected(e), 0 === e.length ? this.updateTile(i) : this.updateArrays();
        else {
            for (n in e) e.hasOwnProperty(n) && this.processSingleEntry(n, e[n]);
            for (e = [], len = this.groupArrays.length, n = 0; n < len; n++) e[n] = n;
            this.sortAffected(e), this.updateArrays()
        }
        this.updateWidget(), Disney.Friends.UI.AddFriend.updateSearchTile(i)
    },
    updateWidget: function() {
        this.arrAllFriends.length > 9 && this.listSlider.resize()
    },
    sortAffected: function(e) {
        var i, n = e.length;
        for (i = 0; i < n; i++) this.sortListByName(e[i]), this.sortListByWeight(e[i])
    },
    sortListByName: function(e) {
        this.groupArrays[e].sort(this.sortNames)
    },
    sortListByWeight: function(e) {
        this.groupArrays[e].sort(this.sortWeights)
    },
    processSingleEntry: function(e, i) {
        var n = [],
            t = null,
            s = null,
            r = null,
            d = 0,
            a = null,
            o = null,
            c = null;
        i.hasOwnProperty("character") ? (e = "character_" + e, void 0 !== i.id && null !== i.id && (t = i.id), n = void 0 !== n[0] && null !== n[0] && 1 === n[0] ? this.BEST_CHARACTER : this.CHARACTER) : (void 0 !== i.groups && null !== i.groups && (n = i.groups), n = void 0 !== n[0] && null !== n[0] && 1 === n[0] ? this.BEST_FRIEND : this.FRIEND, void 0 !== i.presence.id && null !== i.presence.id && (t = i.presence.id)), void 0 !== i.name && null !== i.name && (s = $.trim(i.name)), void 0 !== i.safeChatName && null !== i.safeChatName && (r = $.trim(i.safeChatName)), void 0 !== i.weight && null !== i.weight && (d = i.weight), void 0 !== i.presence.status && null !== i.presence.status && (a = i.presence.status), void 0 !== i.presence.location && null !== i.presence.location && (void 0 !== i.presence.location.world && null !== i.presence.location.world && "" !== i.presence.location.world && (o = i.presence.location.world), void 0 !== i.presence.location.room && null !== i.presence.location.room && "" !== i.presence.location.room && (c = i.presence.location.room));
        var l, u, F = Disney.Friends.UI.HudNotification,
            h = Disney.Friends.Presence.Status,
            D = "";
        return void 0 !== $("#D_F_FriendsPanel").data(e) && null !== $("#D_F_FriendsPanel").data(e) && (D = $("#D_F_FriendsPanel").data(e).status, l = $("#D_F_FriendsPanel").data(e).type, $("#D_F_FriendsPanel").data(e), u = $("#D_F_FriendsPanel").data(e).cache), n !== this.BEST_FRIEND && n !== this.BEST_CHARACTER || void 0 === l || l === this.BEST_FRIEND || l === this.BEST_CHARACTER || (this.crtSwid = this.bestSwid = e), $("#D_F_FriendsPanel").data(e, {
            type: n,
            Id: t,
            name: s,
            safeChatName: r,
            weight: d,
            status: a,
            worldID: o,
            roomID: c,
            mobile: c == Disney.Friends.Presence.MobileRoomID
        }), a !== h.ONLINE ? $("#D_F_FriendsPanel").data(e).cache = {} : u && ($("#D_F_FriendsPanel").data(e).cache = u), a === h.ONLINE && D === h.OFFLINE && (Disney.Friends.UI.Images.setAvatarCache(e, 88, !1), n === this.BEST_CHARACTER || n === this.CHARACTER ? F.notify(s, F.CHARACTER_ONLINE, e) : F.notify(s, F.FRIEND_ONLINE, e, i.presence)), t = this.getGroupIndexBySwid(e), a = this.groupNames.indexOf(n + a), t[0] === a ? (console.log([a, t]),this.groupArrays[t[0]][t[1]] = {
            name: s,
            weight: d,
            swid: e
        }, []) : (t[0] > -1 && (this.checkIndexAllFriends(e), this.groupArrays[t[0]].splice(t[1], 1)), this.groupArrays[a].push({
            name: s,
            weight: d,
            swid: e
        }), [a])
    },
    removeFriend: function(e) {
        parseInt(e, 10) > 0 && (e = "character_" + e), $("#D_F_FriendsPanel").data(e, null), $("#D_F_FriendsPanel").removeData(e), this.checkIndexAllFriends(e), e = this.getGroupIndexBySwid(e), this.groupArrays[e[0]].splice(e[1], 1), this.updateArrays()
    }
}, Disney.Friends.UI.FriendsTile = {
    friendGroups: {
        swid: null,
        groups: []
    },
    init: function() {
        $(".D_F_PlayerCard").mousedown(function(e) {
            Disney.Social.stopEvent(e), Disney.Friends.UI.FriendsTile.showPlayerCard(this)
        }), $(".D_F_FriendFavorite").mousedown(function(e) {
            Disney.Social.stopEvent(e), Disney.Friends.UI.FriendsTile.toggleBest(this)
        }), $(".D_F_AddFriendBtn").mousedown(function(e) {
            Disney.Social.stopEvent(e), Disney.Friends.UI.AddFriend.showAddFriend(this)
        })
    },
    showPlayerCard: function(e) {
        e = $(e).siblings("input[type=hidden]").val(), Disney.Friends.UI.showPlayerCard(e)
    },
    bindCharacterCard: function(e) {
        $(e).unbind("mousedown").addClass("D_F_CharacterCard").removeClass("D_F_PlayerCard").mousedown(function(e) {
            Disney.Social.stopEvent(e), Disney.Friends.UI.FriendsTile.showCharacterCard(this)
        })
    },
    showCharacterCard: function(e) {
        e = (e = $(e).siblings("input[type=hidden]").val()).substr(e.lastIndexOf("_") + 1), Disney.Friends.API.showCharacterCard(e)
    },
    toggleBest: function(e) {
        console.log("Disney.Friends.UI.FriendsTile.toggleBest()"), e = $(e).siblings("input[type=hidden]").val(), Disney.Friends.UI.setBestFriend(e), Disney.Social.getLandDOMElement().sendToggleBestFriend(e)
    }
}, Disney.Friends.UI.Pending = {
    sortedList: [],
    init: function() {
        var e = Disney.Friends.Event;
        e.addListener(e.PENDING_UPDATE, this.update.bind(this)), e.addListener(e.PENDING_REMOVE, this.remove.bind(this))
    },
    update: function(e) {
        var i, n, t = Disney.Friends.UI.Event;
        return !(!e || !e.swid) && (i = e.swid, !!(n = $.trim(e.name)) && (this.sortedList.push({
            name: n,
            swid: i
        }), this.sortedList.sort(Disney.Friends.UI.Friends.sortNames), console.log("Disney.Friends.UI.Pending.update()"), void t.updateListeners(t.PENDINGS_UPDATED, e)))
    },
    accept: function(e) {
        var i = Disney.Friends.UI.Event;
        if (!e) return !1;
        Disney.Friends.API.acceptFriendship(e), i.updateListeners(i.PENDING_ACCEPTED, e)
    },
    reject: function(e) {
        var i = Disney.Friends,
            n = i.UI.Event;
        if (!e) return !1;
        e && i.activeUser && i.activeUser.roster.pending[e] && Disney.Friends.API.rejectFriendship(e), n.updateListeners(n.PENDING_REJECTED, e)
    },
    remove: function(e) {
        var i, n = Disney.Friends.UI.Pending,
            t = Disney.Friends.UI.Event;
        if (!e) return !1;
        (i = Disney.Friends.UI.Friends.getSwidIndex(e, n.sortedList)) > -1 && n.sortedList.splice(i, 1), t.updateListeners(t.PENDING_REMOVED, e)
    }
}, Disney.Friends.UI.BarNotification = {
    state: null,
    states: {
        CLOSED: "closed",
        OPEN: "open",
        ANIMATING: "animating"
    },
    scroller: null,
    dragging: !1,
    dragStartTime: null,
    dragStartState: null,
    dragStartPosition: null,
    dragMinimum: 300,
    animationSpeed: 300,
    maxHeight: 176,
    largeMaxHeight: 176,
    largeHalfHeight: 102,
    smallMaxHeight: 150,
    timeoutDuration: 2e4,
    timeouts: [],
    newFriendAnimationFrames: {
        3: 2,
        4: 2,
        5: 2,
        6: 2,
        7: 2,
        8: 2,
        14: 2,
        15: 2,
        16: 2,
        17: 2,
        18: 2,
        19: 2,
        20: 2,
        21: 2,
        22: 2,
        23: 2,
        24: 2,
        25: 2,
        26: 3,
        27: 2,
        29: 2
    },
    pendingAccept: !1,
    init: function() {
        this.state = this.states.CLOSED, this.scroller = Object.create(Disney.Friends.UI.Slider), this.scroller.init("D_F_Notifications", 20, 0, 130, 0, 100), this.scroller.bindMousewheel(), this.friendsCount = Disney.Friends.UI.Friends.arrAllFriends.length;
        var e = Disney.Friends.UI.Event;
        e.addListener(e.FRIENDS_COUNT, this.friendsCountUpdate.bind(this)), e.addListener(e.PENDINGS_UPDATED, this.pendingUpdateCallback.bind(this)), e.addListener(e.PENDING_ACCEPTED, this.friendshipAccepted.bind(this)), e.addListener(e.PENDING_REJECTED, this.friendshipRejected.bind(this)), e.addListener(e.PENDING_REMOVED, this.pendingRemoveCallback.bind(this)), $("#D_F_NotificationHandleHolder").mousedown(this.startDragCallback)
    },
    friendsCountUpdate: function(e) {
        this.friendsCount = e, this.togglePanel(!0), this.resizeHeight(), $("#D_F_NotificationPanel").height(this.maxHeight), $("#D_F_Notifications").height(this.maxHeight - 24)
    },
    update: function() {
        this.state = this.states.OPEN, this.checkScroller(), setTimeout(this.showQueuedAccept, 300)
    },
    togglePanel: function(e) {
        this.resize(), e && $("#D_F_Notifications").children().length ? (this.showQueuedAccept(), $("#D_F_NotificationPanel").show(), this.state = this.states.OPEN, this.hideCount()) : ($("#D_F_NotificationPanel").hide(), this.state = this.states.CLOSED, this.showCount()), this.updateHandle(), (e = Disney.Friends.UI.Event).updateListeners(e.SUBPANEL_TOGGLED)
    },
    togglePanelCallback: function(e, i) {
        var n = Disney.Friends.UI.BarNotification;
        switch (e && Disney.Social.stopEvent(e), i && (n.state = i === n.states.CLOSED ? n.states.OPEN : n.states.CLOSED), n.state) {
            case n.states.CLOSED:
                n.togglePanel(!0), n.hideCount(), $("#D_F_NotificationPanel").animate({
                    height: n.maxHeight + "px"
                }, n.animationSpeed, function() {
                    n.state = n.states.OPEN, n.updateHandle()
                }), n.state = n.states.ANIMATING;
                break;
            case n.states.OPEN:
                $("#D_F_NotificationPanel").animate({
                    height: "20px"
                }, n.animationSpeed, function() {
                    n.state = n.states.CLOSED, n.updateHandle(), n.showCount(), $("#D_F_Notifications").children().length || n.togglePanel(!1)
                }), n.state = n.states.ANIMATING
        }
    },
    updateHandle: function() {
        var e = 44;
        this.state === this.states.OPEN && (e = 38), Disney.Friends.UI.Images.setAttrs($("#D_F_NotificationHandle"), e)
    },
    showCount: function() {
        var e = $("#D_F_Notifications .D_F_FriendNotification").length;
        e ? ($("#D_F_NotificationCountText").html(e), $("#D_F_NotificationCount, #D_F_NotificationCountText").css("display", "block")) : this.hideCount()
    },
    hideCount: function() {
        $("#D_F_NotificationCount, #D_F_NotificationCountText").css("display", "none")
    },
    checkHidingPanel: function() {
        $("#D_F_Notifications").children().length || this.togglePanelCallback(null, this.states.CLOSED)
    },
    checkBarHeight: function(e, i) {
        var n = $("#D_F_Notifications").height();
        this.resizeHeight(), this.state === this.states.CLOSED && !0 !== i || n === this.maxHeight - 24 ? ($("#D_F_NotificationPanel").height(this.maxHeight), $("#D_F_Notifications").height(this.maxHeight - 24), e()) : ($("#D_F_NotificationPanel").animate({
            height: this.maxHeight
        }, this.animationSpeed, e), $("#D_F_Notifications").animate({
            height: this.maxHeight - 24
        }, this.animationSpeed)), this.resizeActions()
    },
    resizeHeight: function() {
        this.maxHeight = $("#D_F_NotificationPanel").hasClass("D_F_FriendNotificationBgL") ? $("#D_F_Notifications").children().length > 1 || $("#D_F_Notifications").find(".D_F_FriendNotificationAccept").length ? this.largeMaxHeight : this.largeHalfHeight : this.smallMaxHeight
    },
    pendingUpdateCallback: function(e) {
        var i = Disney.Friends.UI.BarNotification,
            n = Disney.Friends.UI,
            t = e.swid;
        if ($("#D_F_Notifications").find("input[value='" + t + "']").length) return !1;
        var s = $("#D_F_FriendNotificationTemplate").contents().clone(!0);
        s.find("input").val(t), s.find(".D_F_FriendNotificationName").html(e.name), s.find(".D_F_FriendNotificationMessage").html(Disney.Friends.UI.setText("D6")), n.getAvatarUriBySwid(s.find(".D_F_FriendNotificationAvatar"), t, 60, !1), Disney.Friends.activeUser.isPreActivated ? s.find(".D_F_FriendNotificationActions").remove() : (s.find(".D_F_FriendNotificationAvatar").click(function() {
            Disney.Friends.UI.showPlayerCard(t)
        }), s.find(".D_F_FriendNotificationAdd").click(function() {
            Disney.Friends.UI.Pending.accept(t)
        }), s.find(".D_F_FriendNotificationDeny").click(function() {
            i.queue("Deny" + t, Disney.Friends.UI.Pending.reject, [s, t], i.timeoutDuration), Disney.Friends.UI.Pending.reject(t)
        })), $("#D_F_Notifications").append(s), $("#D_F_Notifications").children().length > 1 ? i.checkScroller(!0) : this.scroller.hide(), i.state === i.states.CLOSED && i.togglePanelCallback(null, i.states.OPEN), this.resizeActions()
    },
    pendingRemoveCallback: function(e) {
        this.dequeue("Deny" + e)
    },
    newFriendCallback: function(e) {
        var i = Disney.Friends.UI.BarNotification,
            n = $("#D_F_Notifications"),
            t = Disney.Friends.UI;
        n = n.find(".D_F_FriendNotificationAccept");
        var s = e.name;
        e = e.swid, (e = $("#D_F_Notifications").find("input[value='" + e + "']")).length && i.removeNotification(e.parents(".D_F_FriendNotification")), n.length ? (s = parseInt(n.data("count"), 10), n.find(".D_F_FriendNotificationAcceptName").html(++s + " " + t.setText("D21")), n.data("count", s)) : ((n = $("#D_F_FriendNotificationAcceptTemplate").contents().clone(!0)).find(".D_F_FriendNotificationAcceptName").html(s), n.data("count", 1), i.checkBarHeight(function() {
            i.scroller.scrollToTop(), i.togglePanelCallback(null, i.states.OPEN), i.pendingAccept = !0, $("#D_F_FriendsPanel:visible").length && i.showQueuedAccept()
        }, !0))
    },
    showQueuedAccept: function() {
        if (0 !== $("#D_F_FriendsPanel:visible").length) {
            var e = Disney.Friends.UI.BarNotification,
                i = $("#D_F_Notifications .D_F_FriendNotificationAccept");
            e.pendingAccept && (e.pendingAccept = !1, i.length && i.slideDown(function() {
                i.css("visibility", "visible").hide().fadeIn(function() {
                    Disney.Friends.UI.animateSprite("#D_F_NotificationAnimation", 80, 29, e.newFriendAnimationFrames, 10, function() {
                        i.empty(), e.removeNotification(i)
                    })
                })
            }))
        }
    },
    friendshipAccepted: function(e) {
        this.removeNotification($("#D_F_Notifications").find("input[value='" + e + "']").parents(".D_F_FriendNotification"))
    },
    friendshipRejected: function(e) {
        this.removeNotification($("#D_F_Notifications").find("input[value='" + e + "']").parents(".D_F_FriendNotification"))
    },
    removeNotification: function(e, i, n) {
        i ? setTimeout(function() {
            Disney.Friends.UI.BarNotification.removeNotification(e)
        }, i) : e.fadeOut(function() {
            Disney.Social.unbindAll(e), e.show().css("visibility", "hidden"), e.slideUp(function() {
                e.remove(), Disney.Friends.UI.BarNotification.checkScroller(), n || Disney.Friends.UI.BarNotification.checkHidingPanel()
            })
        })
    },
    checkScroller: function(e) {
        this.resize(), this.checkBarHeight(function() {
            var e = Disney.Friends.UI.BarNotification.scroller,
                i = $("#D_F_Notifications").children().length;
            i > 2 || i > 1 && $("#D_F_NotificationPanel").hasClass("D_F_FriendNotificationBgS") ? ($("#D_F_NotificationPanel").addClass("D_F_FriendNotificationWithScroller"), e.show(), e.resize(), e.scrollToTop()) : ($("#D_F_NotificationPanel").removeClass("D_F_FriendNotificationWithScroller"), e.hide())
        }, e)
    },
    resize: function() {
        this.friendsCount < 9 && this.friendsCount > 5 ? $("#D_F_NotificationPanel").css("bottom", "-5px").removeClass("D_F_FriendNotificationBgS").addClass("D_F_FriendNotificationBgL") : this.friendsCount > 8 ? $("#D_F_NotificationPanel").css("bottom", "20px").removeClass("D_F_FriendNotificationBgS").addClass("D_F_FriendNotificationBgL") : $("#D_F_NotificationPanel").css("bottom", "-5px").removeClass("D_F_FriendNotificationBgL").addClass("D_F_FriendNotificationBgS"), $("#D_F_NotificationPanel").css("width", ($("#D_F_FriendSection").width() + 32).toString() + "px"), this.scroller.resize(), this.resizeActions()
    },
    resizeActions: function() {
        var e, i;
        (i = $("#D_F_Notifications").find(".D_F_FriendNotificationYN")[0]) && Disney.Friends.UI.isVisible($(i)) && (e = $(i).children(":first").width(), e += $(i).children(":last").width(), e += 30, $(".D_F_FriendNotificationYN").css("width", e.toString() + "px").css("margin", "0 auto"), i = $(i).parent().parent().width() - 5, $("#D_F_NotificationPanel").hasClass("D_F_FriendNotificationBgL") ? $(".D_F_FriendNotificationYN").parent().css("width", e.toString() + "px") : $(".D_F_FriendNotificationYN").parent().css("width", i.toString() + "px"))
    },
    startDragCallback: function(e) {
        var i = Disney.Friends.UI.BarNotification;
        Disney.Social.stopEvent(e), i.dragStartState = i.state, i.dragStartTime = (new Date).getTime(), i.dragging = !0, i.dragStartPosition = {
            x: e.pageX,
            y: e.pageY
        }, $(document).mouseup(i.endDragCallback), $(document).mousemove(i.dragCallback)
    },
    dragCallback: function(e) {
        Disney.Social.stopEvent(e);
        var i = Disney.Friends.UI.BarNotification,
            n = i.dragStartPosition.y;
        e = e.pageY, (n = i.dragStartState === i.states.OPEN ? e - n : n - e) <= i.maxHeight - 20 && n >= 0 && (i.dragStartState === i.states.OPEN ? $("#D_F_NotificationPanel").css("height", (i.maxHeight - n).toString() + "px") : $("#D_F_NotificationPanel").css("height", (n + 20).toString() + "px"))
    },
    endDragCallback: function(e) {
        var i = Disney.Friends.UI.BarNotification,
            n = (new Date).getTime();
        i.dragging && i.dragStartTime < n - i.dragMinimum ? (n = i.dragStartPosition.y - e.pageY > $("#D_F_Notifications").height() / 2, e = e.pageY - i.dragStartPosition.y > $("#D_F_Notifications").height() / 2, i.dragStartState === i.states.CLOSED && n || i.dragStartState === i.states.OPEN && !e ? i.togglePanelCallback(null, i.states.OPEN) : (i.dragStartState === i.states.CLOSED || i.dragStartState === i.states.OPEN && e) && i.togglePanelCallback(null, i.states.CLOSED)) : i.togglePanelCallback(e), i.dragging = !1, i.startDragTime = null, i.startDragState = null, $(document).unbind("mouseup", i.endDragCallback), $(document).unbind("mousemove", i.dragCallback)
    },
    queue: function(e, i, n, t) {
        t = setTimeout(function() {
            i.apply(Disney.Friends.UI.BarNotification, n)
        }, t), this.timeouts.push({
            key: e,
            timeout: t
        })
    },
    dequeue: function(e) {
        this.timeouts = $.grep(this.timeouts, function(i) {
            return i.key !== e || (clearTimeout(i.timeout), !1)
        })
    }
}, Disney.Friends.UI.AddFriend = {
    searchName: "",
    currentFilter: "",
    filterCount: 0,
    filterStep: 200,
    filterDelay: 50,
    filterTimeout: null,
    ctrlDown: !1,
    friendRequestAnimationFrames: {
        1: 9,
        17: 2,
        18: 8,
        19: 2
    },
    modes: {
        STANDALONE: 1,
        FULL: 2
    },
    init: function() {
        Disney.Friends.UI.frameIt20("D_F_AddFriendExpanded", "D_F_Box20Template", 164, 150), this.scroller = Object.create(Disney.Friends.UI.Slider), this.scroller.init("D_F_AddFriendGrid", 15, -15, 110, 0, 100), this.scroller.bindMousewheel(), this.friendsCount = Disney.Friends.UI.Friends.arrAllFriends.length;
        var e = Disney.Friends.Event;
        e.addListener(e.FOUND_PLAYER, this.foundPlayer.bind(this)), e.addListener(e.FIND_PLAYER_EXISTING_FRIEND, this.foundPlayerExisting.bind(this)), e.addListener(e.FIND_PLAYER_EXISTING_IGNORE, this.foundPlayerIgnored.bind(this)), e.addListener(e.FIND_PLAYER_NOT_FOUND, this.playerNotFound.bind(this)), (e = Disney.Friends.UI.Event).addListener(e.FRIENDS_COUNT, this.friendsCountUpdate.bind(this)), $("#D_F_AddFriendClose").mousedown(function(e) {
            Disney.Social.stopEvent(e), Disney.Friends.UI.AddFriend.closePanel()
        }), $("#D_F_AddFriendFinderFieldDef").mousedown(function(e) {
            Disney.Social.stopEvent(e), Disney.Friends.UI.AddFriend.setFocus()
        }), $(".D_F_AddFriendItem").mousedown(function(e) {
            Disney.Social.stopEvent(e), Disney.Friends.UI.AddFriend.addClick(this)
        }), $("#D_F_AddFriendFinderFind").mousedown(function(e) {
            Disney.Social.stopEvent(e), Disney.Friends.UI.AddFriend.findClick()
        }), $(".D_F_AddFriendFavorite").mousedown(function(e) {
            Disney.Social.stopEvent(e), Disney.Friends.UI.AddFriend.toggleBest(this)
        }), void 0 !== document.body.style.MozUserSelect ? $("#D_F_AddFriendFinderField").css("MozUserSelect", "text") : void 0 !== document.body.style.webkitUserSelect ? $("#D_F_AddFriendFinderField").css("webkitUserSelect", "text") : void 0 !== document.body.onselectstart && (document.getElementById("D_F_AddFriendFinderInput").onselectstart = function() {
            return window.event.cancelBubble = !0
        })
    },
    friendsCountUpdate: function(e) {
        this.friendsCount = e, this.togglePanel()
    },
    findClick: function() {
        var e = Disney.Friends.UI.AddFriend;
        if (e.searching) return !1;
        var i = e.trimInput();
        if (i.length < 1) return e.setFocus(), !1;
        $("#D_F_AddFriendError, #D_F_AddFriendResults, #D_F_AddFriendGrid").css("display", "none"), e.scroller.hide(), $("#D_F_AddFriendFinderField").attr("value", i), e.showExpanded(), $("#D_F_AddFriendMessage").css("display", "none"), $("#D_F_AddFriendBusy").show(), e.searching = !0, e.findPlayer(i)
    },
    trimInput: function() {
        return $.trim($("#D_F_AddFriendFinderField").attr("value"))
    },
    setFocus: function() {
        Disney.Friends.UI.AddFriend.showExpanded(), setTimeout(function() {
            $("#D_F_AddFriendFinderField").focus()
        }, 100)
    },
    resetPlacehoder: function() {
        $("#D_F_AddFriendFinderField").attr("value", ""), $("#D_F_AddFriendFinderFieldDef").show()
    },
    addClick: function(e) {
        var i = Disney.Friends.UI.AddFriend;
        $(e).unbind("mousedown"), e = $(e).find("input[type=hidden]").val(), Disney.Friends.UI.AddFriend.addRequest(e), e = $('<div id="D_F_AddFriendAnimation" />'), Disney.Friends.UI.animateSprite("#D_F_AddFriendAnimation", 100, 21, i.friendRequestAnimationFrames, 15, function() {
            var e = Disney.Friends.UI.AddFriend;
            e.clearFilterResults(), $("#D_F_AddFriendResults").css("display", "none"), $("#D_F_AddFriendGrid").css("display", "none"), $("#D_F_AddFriendFinderField").val(""), e.closePanel()
        }), e.css({
            top: $("#D_F_AddFriendResults").find(".D_F_AddFriendItem").position().top + 10,
            left: ($("#D_F_AddFriendResults").width() - 100) / 2 + 10
        }), $("#D_F_AddFriendResults").find(".D_F_AddFriendItem").css("display", "none"), $("#D_F_AddFriendResults").append(e)
    },
    keyDown: function(e) {
        if (17 === (e = e.which)) return this.ctrlDown = !0, !1;
        this.searchName = $("#D_F_AddFriendFinderField").attr("value"), $("#D_F_AddFriendError").empty().css("display", "none"), this.ctrlDown && 86 === e && $("#D_F_AddFriendFinderFieldDef").css("display", "none");
        var i = this.trimInput();
        if (i.length <= 1 && (8 === e || 46 === e) || 0 === i.length && (e < 48 || e > 110) || this.ctrlDown && 8 === e) return $("#D_F_AddFriendFinderField").attr("value", ""), this.clearFilterResults(), $("#D_F_AddFriendMessage").show(), $("#D_F_AddFriendBusy").css("display", "none"), this.searching = !1, !0;
        $("#D_F_AddFriendFinderFieldDef").css("display", "none"), 13 === e ? $("#D_F_AddFriendFinderFind").mousedown() : ($("#D_F_AddFriendBusy").css("display", "none"), $("#D_F_AddFriendMessage").show(), this.searching = !1), this.typingTimeout && clearTimeout(this.typingTimeout)
    },
    keyUp: function(e) {
        return 17 === (e = e.which) ? this.ctrlDown = !1 : (32 === e && !this.searchName && $("#D_F_AddFriendFinderField").attr("value", ""), 46 === e && this.searchName && $("#D_F_AddFriendFinderField").attr("value", this.searchName.substr(0, this.searchName.length - 1)), this.searchName.length !== $("#D_F_AddFriendFinderField").attr("value").length && (this.searchName = $("#D_F_AddFriendFinderField").attr("value"), this.searchName.length > 0 && $("#D_F_AddFriendFinderFieldDef").css("display", "none"), this.typingTimeout && clearTimeout(this.typingTimeout), void(this.friendsCount > 9 && 13 !== e ? this.typingTimeout = setTimeout(function() {
            Disney.Friends.UI.AddFriend.updateFilter()
        }, 200) : this.clearFilterResults())))
    },
    updateFilter: function() {
        this.currentFilter = this.searchName.toLowerCase(), this.clearFilterResults(), this.filterRunning ? this.filterUpdated = !0 : this.lookupFriends()
    },
    stopFilter: function() {
        var e = Disney.Friends.UI.AddFriend;
        clearTimeout(e.filterTimeout), e.filterUpdated = !1, e.filterRunning = !1, e.filterCount = 0
    },
    lookupFriends: function() {
        this.filterRunning = !0;
        var e = function() {
            var i = Disney.Friends.UI.AddFriend,
                n = [],
                t = [],
                s = [],
                r = i.filterCount,
                d = !0;
            if (i.filterUpdated) i.stopFilter(), i.clearFilterResults(), i.lookupFriends();
            else {
                if (i.currentFilter) {
                    var a = function(e) {
                            for (var i = 0; i < 11; i++) e = e.replace(RegExp("\\" + "\\.[]()*+?^$" [i], "g"), "\\" + "\\.[]()*+?^$" [i]);
                            return e
                        }(i.currentFilter),
                        o = RegExp("^" + a),
                        c = RegExp(a + "$");
                    a = RegExp(a);
                    for (var l = Disney.Friends.UI.Friends.arrAllFriends, u = r; u < r + i.filterStep; u++) {
                        var F = l[u],
                            h = $("#D_F_FriendsPanel").data(F);
                        if (void 0 === F) {
                            i.stopFilter(), d = !1;
                            break
                        }
                        h = h.name.toLowerCase(), o.test(h) && $.inArray(F, n) < 0 ? n.push(F) : c.test(h) && $.inArray(F, s) < 0 ? s.push(F) : a.test(h) && $.inArray(F, t) < 0 && t.push(F), i.filterCount = u + 1
                    }
                } else i.stopFilter(), i.clearFilterResults();
                i.updateGrid([].concat(n, s, t)), d && (i.filterTimeout = setTimeout(e, i.filterDelay))
            }
        };
        e()
    },
    clearFilterResults: function() {
        Disney.Social.unbindAll("#D_F_AddFriendResults"), $("#D_F_AddFriendResults").empty(), Disney.Social.unbindAll("#D_F_AddFriendGrid"), $("#D_F_AddFriendGrid").empty(), this.scroller.hide(), $("#D_F_AddFriendMessage").show(), this.searchName || $("#D_F_AddFriendFinderFieldDef").show()
    },
    updateGrid: function(e) {
        var i = $("#D_F_AddFriendGrid");
        $.each(e, function(e, n) {
            i.append(Disney.Friends.UI.AddFriend.getFriendHTML(n))
        }), i.show(), $("#D_F_AddFriendResults").css("display", "none"), (e = i.children().length) ? ($("#D_F_AddFriendMessage").css("display", "none"), e > 3 ? (this.scroller.show(), this.scroller.resize(), this.scroller.scrollToTop(), this.scroller.bindMousewheel()) : (this.scroller.hide(), this.scroller.scrollToTop(), this.scroller.unbindMousewheel())) : ($("#D_F_AddFriendMessage").show(), this.scroller.hide())
    },
    getFriendHTML: function(e) {
        var i = Disney.Friends.UI,
            n = $("#D_F_FriendsPanel").data(e),
            t = $("#D_F_AddFriendResultsTileTemplate").contents().clone(!0),
            s = $(t).find(".D_F_AddFriendResultsTileAvatarCard"),
            r = $(t).find(".D_F_AddFriendFavorite");
        return t.find("input[type=hidden]").val(e), i.getAvatarUriByFriendId(t.find(".D_F_AddFriendResultsTileAvatar"), e, n.Id, 88, !0), n.status === Disney.Friends.Presence.Status.ONLINE ? ($(s).addClass("D_F_AvatarBg"), t.find(".D_F_FriendAvatarMask").show(), t.find(".D_F_FriendAvatarOff").css("display", "none")) : (t.find(".D_F_FriendAvatarOff, .D_F_FriendAvatarMask").show(), $(s).addClass("D_F_AvatarBg"), $(t).find(".D_F_AddFriendResultsTileJumpStatus .D_F_AddFriendStatus").show().html(i.setText("D15"))), $(s).click(function(i) {
            Disney.Social.stopEvent(i), Disney.Friends.UI.showPlayerCard(e)
        }), this.updateBestFriend(r, e), t.find(".D_F_AddFriendResultsTileName").html(n.name), t
    },
    toggleBest: function(e) {
        e = $(e).siblings("input[type=hidden]").val(), Disney.Friends.UI.setBestFriend(e), Disney.Social.getLandDOMElement().sendToggleBestFriend(e)
    },
    updateBestFriend: function(e, i, n) {
        1 === n || void 0 === n && this.isBestFriend(i) ? Disney.Friends.UI.Images.setAttrs(e, "20", !1) : Disney.Friends.UI.Images.setAttrs(e, "22", !1)
    },
    isBestFriend: function(e) {
        e = $("#D_F_FriendsPanel").data(e).type;
        var i = Disney.Friends.UI.Friends;
        return e === i.BEST_CHARACTER || e === i.BEST_FRIEND
    },
    updateSearchTile: function(e) {
        Disney.Friends.UI.AddFriend.updateBestFriend($("#D_F_AddFriendResults").find("input[value='" + e + "']").siblings(".D_F_AddFriendFavorite"), e)
    },
    openPanel: function() {
        this.setMode(), this.clearFilterResults(), this.searching = !1, $("#D_F_AddFriendError").empty().css("display", "none"), $("#D_F_AddFriendResults").css("display", "none"), $("#D_F_AddFriendGrid").css("display", "none"), $("#D_F_AddFriendBusy").css("display", "none"), this.mode === this.modes.FULL && $("#D_F_AddFriendDivider").show(), $("#D_F_AddFriendMessage, #D_F_AddFriendClose").show(), $("#D_F_AddFriendPanel").show(), this.resetPlacehoder(), this.resize(), $("#D_F_AddFriendFinderField").focus(function() {
            Disney.Friends.UI.AddFriend.showExpanded()
        }), $("#D_F_AddFriendFinder").keydown(function(e) {
            Disney.Friends.UI.AddFriend.keyDown(e)
        }).keyup(function(e) {
            Disney.Friends.UI.AddFriend.keyUp(e)
        })
    },
    showAddFriend: function(e) {
        var i = Disney.Friends.UI.Friends;
        if (this.setMode(), this.mode !== this.modes.STANDALONE) return !1;
        switch (this.openPanel(), e = $(e).parent().position().top / i.TILE_HEIGHT, Math.floor(e)) {
            case 0:
                $("#D_F_AddFriendPanel").css("bottom", "").css("top", "40px");
                break;
            case 1:
                $("#D_F_AddFriendPanel").css("bottom", "").css("top", "150px");
                break;
            case 2:
                $("#D_F_AddFriendPanel").css("top", "").css("bottom", "7px")
        }
        Disney.Friends.UI.AddFriend.setFocus(), this.showExpanded(), this.resize()
    },
    showExpanded: function() {
        if ($("#D_F_AddFriendExpanded").show()) return !1;
        this.clearFilterResults(), this.resetPlacehoder(), $("#D_F_AddFriendError").empty().css("display", "none"), $("#D_F_AddFriendResults").css("display", "none"), $("#D_F_AddFriendGrid").css("display", "none"), Disney.Friends.UI.setTagText($("#D_F_AddFriendMessage").get(0)), $("#D_F_AddFriendPanel").css("height", "150px"), $("#D_F_AddFriendExpanded").show(), $("#D_F_AddFriendDivider").css("display", "none"), $("#D_F_AddFriendMessage, #D_F_AddFriendClose").show()
    },
    closePanel: function() {
        var e = Disney.Friends.UI.AddFriend;
        e.resize(), $("#D_F_AddFriendFinderField").val("").blur(), e.clearFilterResults(), e.resetPlacehoder(), e.searching = !1, $("#D_F_AddFriendExpanded").css("display", "none"), $("#D_F_AddFriendBusy").css("display", "none"), $("#D_F_AddFriendError").empty().css("display", "none"), e.mode === e.modes.STANDALONE ? ($("#D_F_AddFriendFinder").unbind("keyup").unbind("keydown"), $("#D_F_AddFriendPanel").css("display", "none")) : e.mode === e.modes.FULL && ($("#D_F_AddFriendDivider").show(), $("#D_F_AddFriendPanel").css("height", "15px"))
    },
    setMode: function() {
        this.mode = this.friendsCount < 9 ? this.modes.STANDALONE : this.modes.FULL
    },
    resize: function() {
        this.setMode(), this.mode === this.modes.STANDALONE && this.friendsCount > 5 ? ($("#D_F_AddFriendPanel, .D_F_AddFriendExpanded_BoxW20").css("width", "264px"), $("#D_F_AddFriendPanel").css({
            height: "150px",
            left: "8px"
        }), $("#D_F_AddFriendDivider").css("width", ($("#D_F_FriendSection").width() + 32).toString() + "px")) : this.mode === this.modes.FULL ? ($("#D_F_AddFriendPanel").css({
            width: $("#D_F_FriendSection").width().toString() + "px",
            left: "0px",
            top: "auto"
        }), $(".D_F_AddFriendExpanded_BoxW20").css("width", $("#D_F_FriendSection").width().toString() + "px"), $("#D_F_AddFriendPanel").css("height", "15px"), $("#D_F_AddFriendDivider").css("width", ($("#D_F_FriendSection").width() + 32).toString() + "px")) : ($("#D_F_AddFriendPanel").css({
            width: "164px",
            left: "8px"
        }), $(".D_F_AddFriendExpanded_BoxW20").css("width", "164px"), $("#D_F_AddFriendPanel").css("height", "150px")), this.resizeFinder()
    },
    resizeFinder: function() {
        var e = $("#D_F_AddFriendFinderFind");
        e.css("width", ($("#D_F_AddFriendBtnText").width() + 10).toString() + "px"), (e = e.parent().width() - (e.width() + 30)) < 80 && (e = 80), $("#D_F_AddFriendFinderInput").css("width", e.toString() + "px"), $("#D_F_AddFriendFinderField").css("width", e.toString() + "px"), $("#D_F_AddFriendFinderFieldDef").css("width", (e - 4).toString() + "px")
    },
    findPlayer: function(e) {
        if (!e) return !1;
        this.searchName = e;
        var i = this.getCharacter(e);
        if (i[0] > -1) return this.foundCharacter(i[0], i[1]), !1;
        $("#D_F_AddFriendResults").css("display", "none"), $("#D_F_AddFriendGrid").css("display", "none"), this.scroller.hide(), Disney.Friends.API.findPlayerByName(e)
    },
    getCharacter: function(e) {
        var i, n = -1,
            t = e,
            s = Disney.Social.Data.mascots;
        for (i in s)
            if (s.hasOwnProperty(i) && s[i].name.toLowerCase() === e.toLowerCase()) {
                n = s[i].mascot_id, t = s[i].name;
                break
            } return [n, t]
    },
    foundPlayer: function(e) {
        if (!this.searching) return !1;
        var i = Disney.Friends.UI;
        if ($("#D_F_AddFriendBusy").css("display", "none"), void 0 === e || null === e || void 0 === e.swid || null === e.swid || void 0 === e.name || null === e.name) return this.showError(i.setText("D17")), this.resetPlacehoder(), !1;
        if (e.swid === Disney.Friends.activeConnection.swid) return this.showError(i.setText("D18")), !1;
        var n = $("#D_F_AddFriendResults");
        Disney.Social.unbindAll("#D_F_AddFriendResults"), n.empty().append($("#D_F_AddFriendResultItemTemplate").contents().clone(!0));
        var t = $(n).find(".D_F_AddFriendItemName")[0],
            s = $(n).find(".D_F_AddFriendItemAvatar")[0];
        n = $(n).find("input")[0], $(t).text(e.name), i.getAvatarUriByFriendId(s, e.swid, e.playerId, 60, !1), $(n).attr("value", e.swid), $("#D_F_AddFriendMessage").css("display", "none"), $("#D_F_AddFriendResults").show(), this.resetPlacehoder(), this.scroller.hide()
    },
    foundPlayerExisting: function(e) {
        if (!this.searching) return !1;
        this.showError(Disney.Friends.UI.setText("D19").replace("{0}", e))
    },
    foundPlayerIgnored: function(e) {
        if (!this.searching) return !1;
        this.showError(Disney.Friends.UI.setText("D20").replace("{0}", e))
    },
    foundCharacter: function(e, i) {
        if (!this.searching) return !1;
        $("#D_F_AddFriendBusy").css("display", "none");
        var n, t = Disney.Social.Data.characters;
        if (!t.hasOwnProperty(e) || !t[e].info) return this.playerNotFound(i), !1;
        n = t[e].info;
        var s = 0;
        t.hasOwnProperty(e) && t[e].img && (s = t[e].img), this.clearFilterResults(), (t = $("#D_F_AddFriendResults")).empty().append($("#D_F_AddFriendResultCharTemplate").contents().clone(!0));
        var r = !1;
        $("#D_F_AddFriendPanel").width() >= 280 && (r = !0);
        var d = $(t).find("input")[0],
            a = $(t).find(".D_F_AddFriendChar")[0],
            o = $(t).find(".D_F_AddFriendCharCard")[0],
            c = $(t).find(".D_F_FriendAvatarMask")[0],
            l = $(t).find(".D_F_AddFriendCharAvatar")[0],
            u = $(t).find(".D_F_AddFriendCharInfo")[0],
            F = "character_" + e.toString();
        $(d).attr("value", F), s > 0 ? (r ? ($(o).css("width", "83px").css("height", "83px"), $(c).show(), $(l).attr("width", "88").attr("height", "88").css("left", "-3px").css("top", "-3px"), Disney.Friends.UI.getAvatarUriByFriendId(l, F, e, 88, !1)) : ($(c).css("display", "none"), $(l).attr("width", "60").attr("height", "60").css("left", "0px").css("top", "0px"), $(o).css("width", "60px").css("height", "60px"), Disney.Friends.UI.getAvatarUriByFriendId(l, F, e, 60, !1)), $(o).show(), $(u).css("left", "40%"), $(a).css("left", "0"), t.css("left", "0px")) : ($(o).css("display", "none"), $(u).css("left", "21%"), $(a).css("left", "5px"), t.css("left", "0")), $(u).text(n).show(), $("#D_F_AddFriendMessage").css("display", "none"), $("#D_F_AddFriendResults").show(), this.scroller.hide(), this.setFocus()
    },
    playerNotFound: function(e) {
        if (!this.searching) return !1;
        e || (e = this.searchName), this.showError(Disney.Friends.UI.setText("D17").replace("{0}", e))
    },
    showError: function(e) {
        $("#D_F_AddFriendBusy, #D_F_AddFriendMessage").css("display", "none"), $("#D_F_AddFriendError").empty().text(e).show(), $("#D_F_AddFriendError").css("top", ($("#D_F_AddFriendError").parent().height() - $("#D_F_AddFriendError").height() - 20) / 2)
    },
    addRequest: function(e) {
        if (void 0 === e || null === e) return !1;
        Disney.Friends.API.requestFriendship(e)
    },
    togglePanel: function() {
        this.friendsCount > 8 ? "none" === $("#D_F_AddFriendPanel").css("display") && Disney.Friends.UI.AddFriend.openPanel() : "none" !== $("#D_F_AddFriendPanel").css("display") && Disney.Friends.UI.AddFriend.closePanel();
        var e = Disney.Friends.UI.Event;
        e.updateListeners(e.SUBPANEL_TOGGLED)
    }
}, $(function() {
    Disney.Social.ieVer = DISNEY_FRIENDS_INI.ieVer, Disney.Friends.UI.setLayout(), $(window).unload(function() {
        return $(window).unbind(), $("#D_F_FriendSection").css("display", "none"), $("#D_F_HudNotification").css("display", "none"), !1
    })
});