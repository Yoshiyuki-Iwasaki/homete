import firebase from 'firebase';

/**
 * @description APIレスポンスでよく使われるオブジェクトの型
 */

export type LikeItemType = {
  id: number;
  message: string;
  userId: number;
  createdAt: firebase.firestore.Timestamp;
};
