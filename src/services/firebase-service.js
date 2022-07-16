import { firebaseDatabase, firebaseStorage } from "../../firebase";
import RNFetchBlob from "react-native-fetch-blob";

const fs = RNFetchBlob.fs;
const Blob = RNFetchBlob.polyfill.Blob;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;

export const PathRecipe = "recipe";
export const PathImages = "images";

export class FirebaseService {
  static listener;

  static getDataList = (nodePath, callback, keyFilter = null) => {
    let query = firebaseDatabase.ref(nodePath);
    if (keyFilter) {
      query = query.orderByChild("parent").equalTo(keyFilter);
    }

    FirebaseService.listener = query.on("value", dataSnapshot => {
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
    let ref;
    if (objToSubmit.key) {
      ref = firebaseDatabase.ref(node).child(objToSubmit.key);
    } else {
      ref = firebaseDatabase.ref(node).push();
    }
    const id = firebaseDatabase.ref(node).push().key;
    ref.set(objToSubmit);
    return id;
  };

  static popData = (node, objToDelete) => {
    const ref = firebaseDatabase.ref(node).child(objToDelete.key);
    ref.remove();
  };

  static pushFile = async (uploadUri) => {
    const sessionId = new Date().getTime();
    const imageRef = firebaseStorage.ref(PathImages).child(`${sessionId}`);
    const data = await fs.readFile(uploadUri, "base64");
    const blob = await Blob.build(data, { type: "image/jpeg;BASE64" });
    await imageRef.put(blob, { contentType: "image/jpeg" });
    await blob.close();
    return await imageRef.getDownloadURL();
  };
}
