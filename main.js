	function getDefaultExportFromCjs (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	var bcmodsdk = {};

	(function (exports) {
		(function(){const e="1.1.0";function o(e){alert("Mod ERROR:\n"+e);const o=new Error(e);throw console.error(o),o}const t=new TextEncoder;function n(e){return !!e&&"object"==typeof e&&!Array.isArray(e)}function r(e){const o=new Set;return e.filter((e=>!o.has(e)&&o.add(e)))}const i=new Map,a=new Set;function d(e){a.has(e)||(a.add(e),console.warn(e));}function s(e){const o=[],t=new Map,n=new Set;for(const r of p.values()){const i=r.patching.get(e.name);if(i){o.push(...i.hooks);for(const[o,a]of i.patches.entries())t.has(o)&&t.get(o)!==a&&d(`ModSDK: Mod '${r.name}' is patching function ${e.name} with same pattern that is already applied by different mod, but with different pattern:\nPattern:\n${o}\nPatch1:\n${t.get(o)||""}\nPatch2:\n${a}`),t.set(o,a),n.add(r.name);}}o.sort(((e,o)=>o.priority-e.priority));const r=function(e,o){if(0===o.size)return e;let t=e.toString().replaceAll("\r\n","\n");for(const[n,r]of o.entries())t.includes(n)||d(`ModSDK: Patching ${e.name}: Patch ${n} not applied`),t=t.replaceAll(n,r);return (0, eval)(`(${t})`)}(e.original,t);let i=function(o){var t,i;const a=null===(i=(t=m.errorReporterHooks).hookChainExit)||void 0===i?void 0:i.call(t,e.name,n),d=r.apply(this,o);return null==a||a(),d};for(let t=o.length-1;t>=0;t--){const n=o[t],r=i;i=function(o){var t,i;const a=null===(i=(t=m.errorReporterHooks).hookEnter)||void 0===i?void 0:i.call(t,e.name,n.mod),d=n.hook.apply(this,[o,e=>{if(1!==arguments.length||!Array.isArray(o))throw new Error(`Mod ${n.mod} failed to call next hook: Expected args to be array, got ${typeof e}`);return r.call(this,e)}]);return null==a||a(),d};}return {hooks:o,patches:t,patchesSources:n,enter:i,final:r}}function c(e,o=!1){let r=i.get(e);if(r)o&&(r.precomputed=s(r));else {let o=window;const a=e.split(".");for(let t=0;t<a.length-1;t++)if(o=o[a[t]],!n(o))throw new Error(`ModSDK: Function ${e} to be patched not found; ${a.slice(0,t+1).join(".")} is not object`);const d=o[a[a.length-1]];if("function"!=typeof d)throw new Error(`ModSDK: Function ${e} to be patched not found`);const c=function(e){let o=-1;for(const n of t.encode(e)){let e=255&(o^n);for(let o=0;o<8;o++)e=1&e?-306674912^e>>>1:e>>>1;o=o>>>8^e;}return ((-1^o)>>>0).toString(16).padStart(8,"0").toUpperCase()}(d.toString().replaceAll("\r\n","\n")),l={name:e,original:d,originalHash:c};r=Object.assign(Object.assign({},l),{precomputed:s(l),router:()=>{},context:o,contextProperty:a[a.length-1]}),r.router=function(e){return function(...o){return e.precomputed.enter.apply(this,[o])}}(r),i.set(e,r),o[r.contextProperty]=r.router;}return r}function l(){const e=new Set;for(const o of p.values())for(const t of o.patching.keys())e.add(t);for(const o of i.keys())e.add(o);for(const o of e)c(o,!0);}function f(){const e=new Map;for(const[o,t]of i)e.set(o,{name:o,original:t.original,originalHash:t.originalHash,sdkEntrypoint:t.router,currentEntrypoint:t.context[t.contextProperty],hookedByMods:r(t.precomputed.hooks.map((e=>e.mod))),patchedByMods:Array.from(t.precomputed.patchesSources)});return e}const p=new Map;function u(e){p.get(e.name)!==e&&o(`Failed to unload mod '${e.name}': Not registered`),p.delete(e.name),e.loaded=!1,l();}function g(e,t,r){"string"==typeof e&&"string"==typeof t&&(alert(`Mod SDK warning: Mod '${e}' is registering in a deprecated way.\nIt will work for now, but please inform author to update.`),e={name:e,fullName:e,version:t},t={allowReplace:!0===r}),e&&"object"==typeof e||o("Failed to register mod: Expected info object, got "+typeof e),"string"==typeof e.name&&e.name||o("Failed to register mod: Expected name to be non-empty string, got "+typeof e.name);let i=`'${e.name}'`;"string"==typeof e.fullName&&e.fullName||o(`Failed to register mod ${i}: Expected fullName to be non-empty string, got ${typeof e.fullName}`),i=`'${e.fullName} (${e.name})'`,"string"!=typeof e.version&&o(`Failed to register mod ${i}: Expected version to be string, got ${typeof e.version}`),e.repository||(e.repository=void 0),void 0!==e.repository&&"string"!=typeof e.repository&&o(`Failed to register mod ${i}: Expected repository to be undefined or string, got ${typeof e.version}`),null==t&&(t={}),t&&"object"==typeof t||o(`Failed to register mod ${i}: Expected options to be undefined or object, got ${typeof t}`);const a=!0===t.allowReplace,d=p.get(e.name);d&&(d.allowReplace&&a||o(`Refusing to load mod ${i}: it is already loaded and doesn't allow being replaced.\nWas the mod loaded multiple times?`),u(d));const s=e=>{"string"==typeof e&&e||o(`Mod ${i} failed to patch a function: Expected function name string, got ${typeof e}`);let t=g.patching.get(e);return t||(t={hooks:[],patches:new Map},g.patching.set(e,t)),t},f={unload:()=>u(g),hookFunction:(e,t,n)=>{g.loaded||o(`Mod ${i} attempted to call SDK function after being unloaded`);const r=s(e);"number"!=typeof t&&o(`Mod ${i} failed to hook function '${e}': Expected priority number, got ${typeof t}`),"function"!=typeof n&&o(`Mod ${i} failed to hook function '${e}': Expected hook function, got ${typeof n}`);const a={mod:g.name,priority:t,hook:n};return r.hooks.push(a),l(),()=>{const e=r.hooks.indexOf(a);e>=0&&(r.hooks.splice(e,1),l());}},patchFunction:(e,t)=>{g.loaded||o(`Mod ${i} attempted to call SDK function after being unloaded`);const r=s(e);n(t)||o(`Mod ${i} failed to patch function '${e}': Expected patches object, got ${typeof t}`);for(const[n,a]of Object.entries(t))"string"==typeof a?r.patches.set(n,a):null===a?r.patches.delete(n):o(`Mod ${i} failed to patch function '${e}': Invalid format of patch '${n}'`);l();},removePatches:e=>{g.loaded||o(`Mod ${i} attempted to call SDK function after being unloaded`);s(e).patches.clear(),l();},callOriginal:(e,t,n)=>(g.loaded||o(`Mod ${i} attempted to call SDK function after being unloaded`),"string"==typeof e&&e||o(`Mod ${i} failed to call a function: Expected function name string, got ${typeof e}`),Array.isArray(t)||o(`Mod ${i} failed to call a function: Expected args array, got ${typeof t}`),function(e,o,t=window){return c(e).original.apply(t,o)}(e,t,n)),getOriginalHash:e=>("string"==typeof e&&e||o(`Mod ${i} failed to get hash: Expected function name string, got ${typeof e}`),c(e).originalHash)},g={name:e.name,fullName:e.fullName,version:e.version,repository:e.repository,allowReplace:a,api:f,loaded:!0,patching:new Map};return p.set(e.name,g),Object.freeze(f)}function h(){const e=[];for(const o of p.values())e.push({name:o.name,fullName:o.fullName,version:o.version,repository:o.repository});return e}let m;const y=function(){if(void 0===window.bcModSdk)return window.bcModSdk=function(){const o={version:e,apiVersion:1,registerMod:g,getModsInfo:h,getPatchingInfo:f,errorReporterHooks:Object.seal({hookEnter:null,hookChainExit:null})};return m=o,Object.freeze(o)}();if(n(window.bcModSdk)||o("Failed to init Mod SDK: Name already in use"),1!==window.bcModSdk.apiVersion&&o(`Failed to init Mod SDK: Different version already loaded ('1.1.0' vs '${window.bcModSdk.version}')`),window.bcModSdk.version!==e&&(alert(`Mod SDK warning: Loading different but compatible versions ('1.1.0' vs '${window.bcModSdk.version}')\nOne of mods you are using is using an old version of SDK. It will work for now but please inform author to update`),window.bcModSdk.version.startsWith("1.0.")&&void 0===window.bcModSdk._shim10register)){const e=window.bcModSdk,o=Object.freeze(Object.assign(Object.assign({},e),{registerMod:(o,t,n)=>o&&"object"==typeof o&&"string"==typeof o.name&&"string"==typeof o.version?e.registerMod(o.name,o.version,"object"==typeof t&&!!t&&!0===t.allowReplace):e.registerMod(o,t,n),_shim10register:!0}));window.bcModSdk=o;}return window.bcModSdk}();return (Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=y),y})();
	} (bcmodsdk));
	var bcMod = getDefaultExportFromCjs(bcmodsdk);

	var DataManager = (function () {
	    function DataManager() {
	        this.initFromNoData = false;
	        this.modData = {};
	    }
	    DataManager.init = function () {
	        if (this._instance === undefined)
	            this._instance = new DataManager;
	    };
	    Object.defineProperty(DataManager, "instance", {
	        get: function () {
	            this.init();
	            return DataManager._instance;
	        },
	        enumerable: false,
	        configurable: true
	    });
	    DataManager.ValidateStringList = function (object, key) {
	        if (object === undefined || !Array.isArray(object[key]))
	            return [];
	        return object[key].filter(function (_) { return typeof _ === 'string'; });
	    };
	    DataManager.ValidatorItem = function (key) {
	        return [key, function (d) { return DataManager.ValidateStringList(d, key); }];
	    };
	    DataManager.prototype.EncodeDataStr = function () {
	        var data = {};
	        for (var k in this.modData) {
	            data[k] = this.modData[k];
	        }
	        return LZString.compressToBase64(JSON.stringify(data));
	    };
	    DataManager.prototype.DecodeDataStr = function (str) {
	        var _this = this;
	        if (str === undefined) {
	            Object.assign(this.modData, DataManager.DefaultValue);
	            return;
	        }
	        var d = LZString.decompressFromBase64(str);
	        var data = {};
	        try {
	            var decoded = JSON.parse(d);
	            data = decoded;
	        }
	        catch (_a) { }
	        DataManager.Validator.forEach(function (v, k) {
	            _this.modData[k] = v(data);
	        });
	    };
	    DataManager.prototype.ServerStoreData = function () {
	        if (Player && Player.OnlineSettings) {
	            Player.OnlineSettings.BCResponsive = this.EncodeDataStr();
	            if (ServerAccountUpdate) {
	                ServerAccountUpdate.QueueData({ OnlineSettings: Player.OnlineSettings });
	            }
	        }
	    };
	    DataManager.prototype.ServerTakeData = function () {
	        if (Player && Player.OnlineSettings) {
	            var rawData = Player.OnlineSettings.BCResponsive;
	            if (rawData === undefined) {
	                var oldData = Player.OnlineSettings;
	                rawData = oldData.BCMoanerReloaded;
	                if (rawData !== undefined)
	                    delete oldData.BCMoanerReloaded;
	            }
	            this.DecodeDataStr(rawData);
	        }
	        if (this.mergeData !== undefined) {
	            this.modData.settings = { enable: this.mergeData.settings.enable };
	            if (this.initFromNoData) {
	                var rkeys = ['low', 'light', 'medium', 'hot', 'orgasm', 'pain', 'tickle'];
	                for (var _i = 0, rkeys_1 = rkeys; _i < rkeys_1.length; _i++) {
	                    var t = rkeys_1[_i];
	                    this.modData[t] = this.mergeData[t];
	                }
	                this.initFromNoData = false;
	            }
	            this.ServerStoreData();
	        }
	    };
	    Object.defineProperty(DataManager.prototype, "data", {
	        get: function () {
	            return this.modData;
	        },
	        set: function (d) {
	            this.modData = d;
	        },
	        enumerable: false,
	        configurable: true
	    });
	    DataManager.prototype.PushMergeData = function (data) {
	        this.mergeData = data;
	        if (Player && Player.OnlineSettings)
	            this.ServerTakeData();
	    };
	    DataManager.DefaultValue = {
	        settings: { enable: true },
	        hot: ["n... Nyah♥", "Oooh", "mmmmmh!", "NYyaaA♥"],
	        medium: ["mm", "aaaah", "nyAh♥"],
	        light: ["nyah♥", "Aah!", "mh", "oh!♥", "mh♥"],
	        low: ["", "", "mh", "♥oh♥", "ah", "...♥"],
	        orgasm: ["Nya...Ny...NyaaAAaah!", "Mmmmh... MMmh... Hhhmmmm...", "Oooooh... Mmmmh... OooOOOOh!", "Mmmhnn... Nyhmm... Nyah!"],
	        pain: ["Aie!", "Aoouch!", "Aaaaie!", "Ouch", "Aow"],
	        tickle: ["Hahaha!", "Mmmmhahaha!", "Muhahah...", "Ha!Ha!"],
	    };
	    DataManager.Validator = new Map([
	        ["settings", function (d) {
	                if (d.settings === undefined || typeof d.settings.enable !== "boolean")
	                    return { enable: true };
	                return d.settings;
	            }],
	        DataManager.ValidatorItem('low'),
	        DataManager.ValidatorItem('light'),
	        DataManager.ValidatorItem('medium'),
	        DataManager.ValidatorItem('hot'),
	        DataManager.ValidatorItem('pain'),
	        DataManager.ValidatorItem('orgasm'),
	        DataManager.ValidatorItem('tickle'),
	    ]);
	    return DataManager;
	}());

	function ActivityDeconstruct(dict) {
	    var SourceCharacter, TargetCharacter, ActivityGroup, ActivityName;
	    for (var _i = 0, dict_1 = dict; _i < dict_1.length; _i++) {
	        var v = dict_1[_i];
	        if (v.TargetCharacter)
	            TargetCharacter = { MemberNumber: v.TargetCharacter };
	        else if (v.SourceCharacter)
	            SourceCharacter = { MemberNumber: v.SourceCharacter };
	        else if (v.FocusGroupName)
	            ActivityGroup = v.FocusGroupName;
	        else if (v.ActivityName)
	            ActivityName = v.ActivityName;
	    }
	    if (SourceCharacter === undefined || TargetCharacter === undefined
	        || ActivityGroup === undefined || ActivityName === undefined)
	        return undefined;
	    return { SourceCharacter: SourceCharacter, TargetCharacter: TargetCharacter, ActivityGroup: ActivityGroup, ActivityName: ActivityName };
	}
	function IsSimpleChat(msg) {
	    return msg.trim().length > 0 && !msg.startsWith("/") && !msg.startsWith("(") && !msg.startsWith("*") && !msg.startsWith("@");
	}
	function ChatRoomInterceptMessage(cur_msg, msg) {
	    if (!msg)
	        return;
	    ElementValue("InputChat", cur_msg + "... " + msg);
	    ChatRoomSendChat();
	}
	function ChatRoomNormalMessage(msg) {
	    if (!msg)
	        return;
	    var backupChatRoomTargetMemberNumber = ChatRoomTargetMemberNumber;
	    ChatRoomTargetMemberNumber = null;
	    var oldmsg = ElementValue("InputChat");
	    ElementValue("InputChat", msg);
	    ChatRoomSendChat();
	    ElementValue("InputChat", oldmsg);
	    ChatRoomTargetMemberNumber = backupChatRoomTargetMemberNumber;
	}
	function ChatRoomAutoInterceptMessage(cur_msg, msg) {
	    if (IsSimpleChat(cur_msg) && ChatRoomTargetMemberNumber == null) {
	        ChatRoomInterceptMessage(cur_msg, msg);
	    }
	    else {
	        ChatRoomNormalMessage(msg);
	    }
	}

	function buildVersion(v1, v2, v3) {
	    return "".concat(v1, ".").concat(v2, ".").concat(v3);
	}
	var MoanType;
	(function (MoanType) {
	    MoanType[MoanType["Orgasm"] = 0] = "Orgasm";
	    MoanType[MoanType["Pain"] = 1] = "Pain";
	    MoanType[MoanType["Tickle"] = 2] = "Tickle";
	})(MoanType || (MoanType = {}));
	var ModVersion = buildVersion(0, 4, 0);
	var ModName = 'BondageClub Responsive';

	function ShuffleStr(src) {
	    var temp = JSON.parse(JSON.stringify(src));
	    var ret = [];
	    while (temp.length > 0) {
	        var d = Math.floor(Math.random() * temp.length);
	        ret.push(temp[d]);
	        temp.splice(d, 1);
	    }
	    return ret;
	}

	var ShiftingMoans = {
	    hot: [],
	    medium: [],
	    light: [],
	    low: [],
	    orgasm: [],
	    pain: [],
	    tickle: [],
	};
	function NextMoanString(key) {
	    if (ShiftingMoans[key].length === 0) {
	        var r = DataManager.instance.data[key];
	        if (r.length > 0)
	            ShiftingMoans[key] = ShuffleStr(r);
	    }
	    if (ShiftingMoans[key].length > 0) {
	        return ShiftingMoans[key].shift();
	    }
	    return '';
	}
	function TypedMoan(t) {
	    var k;
	    if (t === MoanType.Orgasm)
	        k = 'orgasm';
	    else if (t === MoanType.Pain)
	        k = 'pain';
	    else if (t === MoanType.Tickle)
	        k = 'tickle';
	    if (!k)
	        return '';
	    return NextMoanString(k);
	}
	function BaseMoan(Arousal, shift) {
	    var factor = Math.floor(Arousal / 20);
	    if (shift)
	        factor -= shift;
	    if (factor < 0)
	        factor = 0;
	    else if (factor > 5)
	        factor = 5;
	    var Tkeys = ['low', 'low', 'light', 'medium', 'hot', 'hot'];
	    var k = Tkeys[factor];
	    return NextMoanString(k);
	}
	function MixMoan(player, t, act) {
	    var _a;
	    var actFactor = (_a = player.ArousalSettings.Activity.find(function (_) { return _.Name === act; })) === null || _a === void 0 ? void 0 : _a.Self;
	    if (!actFactor)
	        return '';
	    var threthold1 = Math.max(10, (4 - actFactor) * 25);
	    var threthold2 = threthold1 + 40;
	    var arousal = player.ArousalSettings.Progress;
	    if (arousal <= threthold1) {
	        return TypedMoan(t);
	    }
	    else {
	        var m = BaseMoan(arousal);
	        if (!m)
	            return TypedMoan(t);
	        else {
	            if (arousal <= threthold2) {
	                return TypedMoan(t) + "♥" + BaseMoan(arousal) + "♥";
	            }
	            else {
	                return "♥" + BaseMoan(arousal) + "♥";
	            }
	        }
	    }
	}
	function BaseMoanStepped(player, act) {
	    var _a;
	    var actFactor = (_a = player.ArousalSettings.Activity.find(function (_) { return _.Name === act; })) === null || _a === void 0 ? void 0 : _a.Self;
	    if (!actFactor)
	        return '';
	    var threthold1 = Math.max(10, (4 - actFactor) * 25);
	    var threthold2 = threthold1 + 40;
	    var arousal = player.ArousalSettings.Progress;
	    if (arousal <= threthold1) {
	        return BaseMoan(arousal, 1);
	    }
	    else if (arousal <= threthold2) {
	        return BaseMoan(arousal, 0);
	    }
	    else {
	        return BaseMoan(arousal, -1);
	    }
	}
	function MasturbateMoan(player, masturSrc) {
	    ChatRoomAutoInterceptMessage(ElementValue("InputChat"), BaseMoanStepped(player, masturSrc));
	}
	function PainMessage(player, painSrc) {
	    if (!DataManager.instance.data.pain)
	        return;
	    ChatRoomAutoInterceptMessage(ElementValue("InputChat"), MixMoan(player, MoanType.Pain, painSrc));
	}
	function OrgasmMessage(player) {
	    if (!DataManager.instance.data.orgasm)
	        return;
	    ChatRoomAutoInterceptMessage(ElementValue("InputChat"), TypedMoan(MoanType.Orgasm));
	}
	function TickleMessage(player, tickleSrc) {
	    if (!DataManager.instance.data.tickle)
	        return;
	    ChatRoomAutoInterceptMessage(ElementValue("InputChat"), MixMoan(player, MoanType.Tickle, tickleSrc));
	}

	var ActivityDict = new Map([
	    ['Slap', function (player) { return PainMessage(player, 'Slap'); }],
	    ['Bite', function (player) { return PainMessage(player, 'Bite'); }],
	    ['Spank', function (player) { return PainMessage(player, 'Spank'); }],
	    ['Kick', function (player) { return PainMessage(player, 'Kick'); }],
	    ['Pinch', function (player) { return PainMessage(player, 'Pinch'); }],
	    ['Tickle', function (player) { return TickleMessage(player, 'Tickle'); }],
	    ['SpankItem', function (player) { return PainMessage(player, 'SpankItem'); }],
	    ['TickleItem', function (player) { return TickleMessage(player, 'TickleItem'); }],
	    ['MasturbateItem', function (player) { return MasturbateMoan(player, 'MasturbateItem'); }],
	    ['ShockItem', function (player) { return PainMessage(player, 'ShockItem'); }],
	    ['MasturbateHand', function (player) { return MasturbateMoan(player, 'MasturbateHand'); }],
	    ['MasturbateFist', function (player) { return MasturbateMoan(player, 'MasturbateFist'); }],
	    ['MasturbateFoot', function (player) { return MasturbateMoan(player, 'MasturbateFoot'); }],
	    ['MasturbateTongue', function (player) { return MasturbateMoan(player, 'MasturbateTongue'); }],
	]);
	function ActivityHandle(player, sender, data) {
	    if (!DataManager.instance.data.settings.enable)
	        return;
	    if (!data.Dictionary)
	        return;
	    var activityInfo = ActivityDeconstruct(data.Dictionary);
	    if (activityInfo == undefined)
	        return;
	    if (activityInfo.TargetCharacter.MemberNumber !== player.MemberNumber)
	        return;
	    var f = ActivityDict.get(activityInfo.ActivityName);
	    if (f !== undefined)
	        f(player);
	}

	var ChatMessageHandler = (function () {
	    function ChatMessageHandler() {
	        this._handles = new Map();
	    }
	    ChatMessageHandler.prototype.Run = function (player, data) {
	        if (player === undefined || player.MemberNumber === undefined)
	            return;
	        if (player.GhostList && player.GhostList.indexOf(data.Sender) >= 0)
	            return;
	        var sender = ChatRoomCharacter.find(function (c) { return c.MemberNumber == data.Sender; });
	        if (sender === undefined)
	            return;
	        var f = this._handles.get(data.Type);
	        if (f)
	            f.forEach(function (_) { return player && sender && _(player, sender, data); });
	    };
	    ChatMessageHandler.prototype.Register = function (type, handle) {
	        var f = this._handles.get(type);
	        if (!f) {
	            this._handles.set(type, []);
	            f = this._handles.get(type);
	        }
	        f.push(handle);
	    };
	    return ChatMessageHandler;
	}());

	var extendStatics = function(d, b) {
	    extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
	    return extendStatics(d, b);
	};
	function __extends(d, b) {
	    if (typeof b !== "function" && b !== null)
	        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
	    extendStatics(d, b);
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	}

	var Localization = (function () {
	    function Localization() {
	    }
	    Localization.GetText = function (srcTag) {
	        if (TranslationLanguage === 'CN') {
	            return this.CNTextMap.get(srcTag) || "";
	        }
            else if (TranslationLanguage === 'RU') {
	            return this.RUTextMap.get(srcTag) || "";
	        }
	        return this.ENTextMap.get(srcTag) || "";
	    };
	    Localization.CNTextMap = new Map([
	        ["responsive_setting_title", "- BC Responsive 设置 -"],
            ["setting_button_popup", "BC Responsive 设置"],
            ["setting_enable", "启用 Responsive"],
            ["setting_title_low", "低性奋"],
            ["setting_title_light", "微弱性奋"],
            ["setting_title_medium", "中等性奋"],
            ["setting_title_hot", "热烈性奋"],
            ["setting_title_orgasm", "高潮"],
            ["setting_title_pain", "痛苦"],
            ["setting_title_tickle", "瘙痒"],
            ["setting_input_invalid", "格式错误"],
	    ]);
	    Localization.ENTextMap = new Map([
	        ["responsive_setting_title", "- BC Responsive Setting -"],
	        ["setting_button_popup", "BC Responsive Setting"],
	        ["setting_enable", "Enable Responsive"],
	        ["setting_title_low", "Low"],
	        ["setting_title_light", "Light"],
	        ["setting_title_medium", "Medium"],
	        ["setting_title_hot", "Hot"],
	        ["setting_title_orgasm", "Orgasm"],
	        ["setting_title_pain", "Pain"],
	        ["setting_title_tickle", "Tickle"],
	        ["setting_input_invalid", "Syntax Error"],
	    ]);
        Localization.RUTextMap = new Map([
	        ["responsive_setting_title", "- BC Responsive -"],
	        ["setting_button_popup", "Настройки Responsive"],
	        ["setting_enable", "Включить Responsive"],
	        ["setting_title_low", "Низк."],
	        ["setting_title_light", "Легк."],
	        ["setting_title_medium", "Средн."],
	        ["setting_title_hot", "Высок."],
	        ["setting_title_orgasm", "Оргазм"],
	        ["setting_title_pain", "Боль"],
	        ["setting_title_tickle", "Щекотка"],
	        ["setting_input_invalid", "Синтакс. ошибка"],
	    ]);
	    return Localization;
	}());

	var GUISettingScreen = (function () {
	    function GUISettingScreen() {
	    }
	    GUISettingScreen.prototype.Load = function () { };
	    GUISettingScreen.prototype.Run = function () { };
	    GUISettingScreen.prototype.Click = function () { };
	    GUISettingScreen.prototype.Exit = function () { setSubscreen(null); };
	    GUISettingScreen.prototype.Unload = function () { };
	    return GUISettingScreen;
	}());
	var GUIMainMenu = (function (_super) {
	    __extends(GUIMainMenu, _super);
	    function GUIMainMenu() {
	        return _super !== null && _super.apply(this, arguments) || this;
	    }
	    GUIMainMenu.prototype.Run = function () {
	        var data = DataManager.instance.data;
	        DrawButton(1815, 75, 90, 90, "", "White", "Icons/Exit.png");
	        var titleBaseX = 400;
	        var titleBaseY = 280;
	        DrawText(Localization.GetText("responsive_setting_title"), titleBaseX, 125, "Black", "Gray");
	        DrawText("v".concat(ModVersion), titleBaseX + 400, 125, "Black", "Gray");
	        DrawCheckbox(titleBaseX, 160, 64, 64, Localization.GetText("setting_enable"), data.settings.enable);
	        var inputBaseX = titleBaseX + 700;
	        for (var i = 0; i < GUIMainMenu.keys.length; i++) {
	            var k = GUIMainMenu.keys[i];
	            var tY = titleBaseY + 90 * i;
	            DrawText(Localization.GetText("setting_title_".concat(k)), titleBaseX, tY, "Black", "Gray");
	            var input = document.getElementById(GUIMainMenu.ElementID(k));
	            if (!input) {
	                input = ElementCreateInput(GUIMainMenu.ElementID(k), "text", GUIMainMenu.StringListShow(data[k]), "256");
	            }
	            if (input) {
	                ElementPosition(GUIMainMenu.ElementID(k), inputBaseX, tY, 1000, 64);
	                if (!GUIMainMenu.ValidateInput(input.value)) {
	                    DrawText(Localization.GetText("setting_input_invalid"), inputBaseX + 520, tY, "Red", "Gray");
	                }
	            }
	        }
	    };
	    GUIMainMenu.prototype.Click = function () {
	        var data = DataManager.instance.data;
	        if (MouseIn(1815, 75, 90, 90)) {
	            for (var i = 0; i < GUIMainMenu.keys.length; i++) {
	                var k = GUIMainMenu.keys[i];
	                var input = document.getElementById(GUIMainMenu.ElementID(k));
	                if (input) {
	                    var newL = GUIMainMenu.ValidateInput(input.value);
	                    if (newL)
	                        DataManager.instance.data[k] = newL;
	                }
	            }
	            DataManager.instance.ServerStoreData();
	            this.Exit();
	        }
	        else if (MouseIn(400, 160, 64, 64)) {
	            data.settings.enable = !data.settings.enable;
	        }
	    };
	    GUIMainMenu.prototype.Unload = function () {
	        GUIMainMenu.keys.forEach(function (_) { return ElementRemove(GUIMainMenu.ElementID(_)); });
	    };
	    GUIMainMenu.keys = ['low', 'light', 'medium', 'hot', 'orgasm', 'pain', 'tickle'];
	    GUIMainMenu.ElementID = function (k) { return "BCResponsive_Input".concat(k); };
	    GUIMainMenu.StringListShow = function (p) {
	        if (p.length === 0)
	            return "";
	        var result = JSON.stringify(p);
	        return result.substring(1, result.length - 1);
	    };
	    GUIMainMenu.ValidateInput = function (input) {
	        var raw = "[".concat(input, "]");
	        var ValidateStringList = function (input) {
	            if (!Array.isArray(input))
	                return undefined;
	            if (!input.every(function (_) { return typeof _ === 'string'; }))
	                return undefined;
	            return input;
	        };
	        try {
	            var d = JSON.parse(raw);
	            return ValidateStringList(d);
	        }
	        catch (_a) {
	            return undefined;
	        }
	    };
	    return GUIMainMenu;
	}(GUISettingScreen));
	function setSubscreen(subscreen) {
	    if (GUISetting.instance) {
	        GUISetting.instance.currentScreen = subscreen;
	    }
	}
	var GUISetting = (function () {
	    function GUISetting() {
	        this._currentScreen = null;
	        GUISetting.instance = this;
	    }
	    Object.defineProperty(GUISetting.prototype, "currentScreen", {
	        get: function () {
	            return this._currentScreen;
	        },
	        set: function (subscreen) {
	            if (this._currentScreen) {
	                this._currentScreen.Unload();
	            }
	            this._currentScreen = subscreen;
	            if (this._currentScreen) {
	                this._currentScreen.Load();
	            }
	        },
	        enumerable: false,
	        configurable: true
	    });
	    GUISetting.prototype.load = function (mod) {
	        var _this = this;
	        mod.hookFunction("PreferenceRun", 10, function (args, next) {
	            if (_this._currentScreen) {
	                MainCanvas.textAlign = "left";
	                _this._currentScreen.Run();
	                MainCanvas.textAlign = "center";
	                return;
	            }
	            next(args);
	            if (PreferenceSubscreen === "")
	                DrawButton(1815, 820, 90, 90, "", "White", "Icons/Arousal.png", Localization.GetText("setting_button_popup"));
	        });
	        mod.hookFunction("PreferenceClick", 10, function (args, next) {
	            if (_this._currentScreen) {
	                _this._currentScreen.Click();
	                return;
	            }
	            if (MouseIn(1815, 820, 90, 90)) {
	                _this.currentScreen = new GUIMainMenu();
	            }
	            else {
	                return next(args);
	            }
	        });
	        mod.hookFunction("InformationSheetExit", 10, function (args, next) {
	            if (_this._currentScreen) {
	                _this._currentScreen.Exit();
	                return;
	            }
	            return next(args);
	        });
	    };
	    GUISetting.instance = null;
	    return GUISetting;
	}());

	(function () {
	    if (window.BCResponsive_Loaded)
	        return;
	    var mod = bcMod.registerMod({ name: ModName, fullName: ModName, version: ModVersion, repository: 'https://gitlab.com/dynilath/BCResponsive' });
	    window.BCResponsive_Loaded = false;
	    var OrgasmHandle = function (C) {
	        if (!DataManager.instance.data.settings.enable)
	            return;
	        if (CurrentScreen !== 'ChatRoom' || !Player)
	            return;
	        if (Player.MemberNumber !== C.MemberNumber)
	            return;
	        OrgasmMessage(Player);
	    };
	    var chatMessageHandler = new ChatMessageHandler;
	    mod.hookFunction('ChatRoomMessage', 9, function (args, next) {
	        next(args);
	        chatMessageHandler.Run(Player, args[0]);
	    });
	    mod.hookFunction('ActivityOrgasmStart', 9, function (args, next) {
	        OrgasmHandle(args[0]);
	        next(args);
	    });
	    chatMessageHandler.Register('Activity', ActivityHandle);
	    var GUI = new GUISetting;
	    GUI.load(mod);
	    DataManager.init();
	    function LoadAndMessage() {
	        DataManager.instance.ServerTakeData();
	        console.log("".concat(ModName, " v").concat(ModVersion, " ready."));
	    }
	    mod.hookFunction('LoginResponse', 0, function (args, next) {
	        next(args);
	        LoadAndMessage();
	    });
	    if (Player && Player.MemberNumber) {
	        LoadAndMessage();
	    }
	    window.BCResponsive_Loaded = true;
	    console.log("".concat(ModName, " v").concat(ModVersion, " loaded."));
	})();
