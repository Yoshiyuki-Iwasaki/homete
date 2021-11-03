import firebase from "firebase";
/**
 * @description APIレスポンスでよく使われるオブジェクトの型
 */
export type PostDetailType = {
  uid: number;
  id: number;
  message: string;
  userId: number;
  createdAt: firebase.firestore.Timestamp;
};
export type PostItemType = {
  uid: number;
  id: number;
  message: string;
  userId: number;
  createdAt: firebase.firestore.Timestamp;
  detail: boolean;
};
export type PostTextType = {
  value: any;
  uid: number;
  id: number;
  message: string;
  createdAt: firebase.firestore.Timestamp;
  state: 'post' | 'reply';
};
