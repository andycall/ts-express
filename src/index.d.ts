declare module 'encodeurl' {
    var encodeurl: encodeURI.Encode;
    export = encodeurl;

    namespace encodeURI {
        export interface Encode {
            (url: string): string;
        }
    }
}