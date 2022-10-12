
export const useBinary = () => {


    const arrayBufferToBinaryString = (arrayBuffer: ArrayBuffer) => {
        let binaryString = "";
        const bytes = new Uint8Array(arrayBuffer);
        const len = bytes.byteLength;
        for (let i = 0; i < len; i++) {
            binaryString += String.fromCharCode(bytes[i]);
        }
        return binaryString
    }

    const convBase64 = (arrayBuffer: any) => {
        const binaryString = arrayBufferToBinaryString(arrayBuffer);
        const encodeData = btoa(binaryString);
        return encodeData;
    }

    

    return { convBase64 }

}