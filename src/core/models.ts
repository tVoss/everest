export interface Data {
    readonly dataType: DataType
    toString: () => string
}

export enum DataType {
    String,
    Number,
    Map,
    List
}

export class StringData implements Data {

    readonly value: string
    readonly dataType = DataType.String;

    constructor(value: string) {
        this.value = value;
    }

    toString = (): string => {
        return this.value;
    }
}

export class NumberData implements Data {
    readonly value: number
    readonly dataType = DataType.Number;

    constructor(value: number) {
        this.value = value
    }

    toString = (): string => {
        return String(this.value)
    }
}

export class MapData implements Data {
    readonly keys: StringData[]
    readonly values: Data[]
    readonly dataType = DataType.Map;

    constructor(keys: StringData[], values: Data[]) {
        this.keys = keys;
        this.values = values;
    }

    toString = (): string => {
        if (this.keys.length === 0) {
            return "{ }";
        }

        let str = "{ ";
        for (let i = 0; i < this.keys.length; i++) {
            str += this.keys[i].toString();
            str += ": ";
            str += this.values[i].toString();
            str += ", ";
        }
        return str.slice(0, -2) + " }";
    }
}

export class ListData implements Data {
    readonly values: Data[]
    readonly dataType = DataType.List;

    constructor(values: Data[]) {
        this.values = values;
    }

    toString = (): string => {
        if (this.values.length === 0) {
            return "[ ]";
        }

        let str = "[ ";
        for (let i = 0; i < this.values.length; i++) {
            str += this.values[i].toString();
            str += ", ";
        }
        return str.slice(0, -2) + " ]";
    }

}
