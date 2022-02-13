import firebase from 'firebase';
/**
 * @description APIレスポンスでよく使われるオブジェクトの型
 */
export type PostItemType = {
  uid: number;
  id: number;
  message: string;
  userId: number;
  createdAt: firebase.firestore.Timestamp;
  detail: boolean;
  reply: boolean;
};
