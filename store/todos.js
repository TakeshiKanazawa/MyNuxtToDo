 import firebase from '~/plugins/firebase';
 import { firestoreAction } from 'vuexfire';

//  firestore(db)の設定
const db = firebase.firestore();
// firestoreで使用する配列を指定？
const todosRef = db.collection('todos');

// stateを定義
export const state = () => ({
  // todo一覧を管理する配列
  todos:[]
})


export const actions = {
  // vuexfireが用意しているfirebaseAction呼び出し
  init:firestoreAction(({bindFirestoreRef}) => {
    //bind(関連付け)する
    bindFirestoreRef('todos',todosRef)
  }),
  // todoの追加
  add:firestoreAction((context,name) => {
    // 未入力チェック
    if (name.trim()) {
      todosRef.add({
        name:name,　//todo
        done:false,　//完了or未完了
        created:firebase.firestore.FieldValue.serverTimestamp()  //todoが追加された時間
      })
    }
  }),
  //todoの削除
  remove:firestoreAction((context,id)=> {
    // FireStoreから、documentIdを指定して削除
    todosRef.doc(id).delete()
  }),
  // todoの完了　未完了の削除
  toggle:firestoreAction((context,todo)=> {
    todosRef.doc(todo.id).update({
      done: !todo.done
    })
  }) 
}
