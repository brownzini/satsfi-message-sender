export function hexEncode(text:string) {
    const buffer = Buffer.from(text, 'utf8');
    const hex = buffer.toString('hex');
    return hex;
}

export function hexDecode(hex:string) {
    const buffer = Buffer.from(hex, 'hex');
    const originalText = buffer.toString('utf8');
    console.log(originalText);
}

export function nEncode(text:string) {
    function wordToIndex(word:any) {
        const alphabet = 'abcdefghijklmnopqrstuvwxyz';
        if (word === '_') return '0';
        const index = alphabet.indexOf(word.toLowerCase());
        return index !== -1 ? (index + 1).toString() : '';
    }
    
    function stringToIndex(str:any) {
        return str.split('').map(wordToIndex).join('');
    }

    return stringToIndex(text);
}

