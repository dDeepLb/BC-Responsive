export class String {
    static Encode(string: string | object) {
        return LZString.compressToBase64(JSON.stringify(string));
    }

    static Decode(string: string | undefined) {
        let d = LZString.decompressFromBase64(string);
        let data = {};

        try {
            let decoded = JSON.parse(d);
            data = decoded
        } catch { }
        if (data)
            return data;
    }

    static Shuffle(string: string[]) {
        let temp: string[] = JSON.parse(JSON.stringify(string));
        let ret: string[] = [];
        while (temp.length > 0) {
            let d = Math.floor(Math.random() * temp.length);
            ret.push(temp[d]);
            temp.splice(d, 1);
        }
        return ret;
    }
}

