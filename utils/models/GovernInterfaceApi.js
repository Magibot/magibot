class GovernInterfaceApi {
    constructor (urlDefault, segment, requirements, data=null) {
        this._urlDefault = urlDefault;
        this._segment = segment;
        this._requirements = requirements;
        this._data = data;
    }

    get url() {
        var url = this._urlDefault + this._segment + "?";
        for (let i = 0; i < this._requirements.length; i++) {
            let currentReq = this._requirements[i];
            let str = currentReq + "=" + this._data[currentReq];
            if (i < this._requirements.length - 1) {
                str += "&";
            }
            url += str;
        }
        return url;
    }

    get requirements() {
        return this._requirements;
    }

    get data() {
        return this._data;
    }

    set data(data) {
        this._data = data;
    }
}

module.exports = GovernInterfaceApi;