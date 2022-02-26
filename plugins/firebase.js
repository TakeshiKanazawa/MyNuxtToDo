import firebase from "firebase";

// firebaseの初期化に必要なパラメータ
// projectidをオブジェクトで準備
const config = {
  projectId:process.env.FIREBASE_PROJECT_ID
}

// 二重で初期化されないようにする
if(!firebase.apps.length) {
  firebase.initializeApp(config)
}

// 他の場所から呼び出せるようにする
export default firebase