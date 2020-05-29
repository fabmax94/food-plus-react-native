import { firebaseDatabase, firebaseStorage } from '../../firebase';
import RNFetchBlob from 'react-native-fetch-blob';

const fs = RNFetchBlob.fs;
const Blob = RNFetchBlob.polyfill.Blob;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;

export const PathRecipe = 'recipe';
export const PathImages = 'images';
export const PathGroup = 'notepluss/group';

export class FirebaseService {
    static listener;

    static offDataList = (nodePath) => {
        if (FirebaseService.listener) {
            firebaseDatabase.ref(nodePath).off('value', FirebaseService.listener);
        }
    };


    static getDataList = (nodePath, callback, keyFilter = null) => {

        let query = firebaseDatabase.ref(nodePath);
        if (keyFilter) {
            query = query.orderByChild('parent').equalTo(keyFilter);
        }

        FirebaseService.listener = query.on('value', dataSnapshot => {
            let items = [];
            dataSnapshot.forEach(childSnapshot => {
                let item = childSnapshot.val();
                item.key = childSnapshot.key;
                items.push(item);
            });
            callback(items);
        });

        return query;
    };

    static pushData = (node, objToSubmit) => {
        let ref = null;
        if (objToSubmit.key) {
            ref = firebaseDatabase.ref(node).child(objToSubmit.key);
        } else {
            ref = firebaseDatabase.ref(node).push();
        }
        const id = firebaseDatabase.ref(node).push().key;
        ref.set(objToSubmit);
        return id;
    };

    static pushFile = (uploadUri, callback) => {
        const sessionId = new Date().getTime();
        let uploadBlob = null;
        const imageRef = firebaseStorage.ref(PathImages).child(`${sessionId}`)
        fs.readFile(uploadUri, 'base64')
            .then((data) => {
                return Blob.build(data, { type: `image/jpeg;BASE64` });
            })
            .then((blob) => {
                uploadBlob = blob
                return imageRef.put(blob, { contentType: 'image/jpeg' });
            })
            .then(() => {
                uploadBlob.close()
                return imageRef.getDownloadURL();
            })
            .then((url) => {
                callback(url);
            });
    };

    static popData = (node, objToDelete) => {
        const ref = firebaseDatabase.ref(node).child(objToDelete.key);
        ref.remove();
    }

}
