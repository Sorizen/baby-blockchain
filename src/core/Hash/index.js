import CryptoJS from 'crypto-js';


export class Hash {
    static toSHA1(data) {
        return CryptoJS.SHA1(data).toString();
    }
}
