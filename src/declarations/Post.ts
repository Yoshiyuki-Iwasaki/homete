/**
 * @description APIレスポンスでよく使われるオブジェクトの型
 */
export type PostDetailType = {
  uid: number;
  id: number;
  message: string;
  userId: number;
  createdAt: number;
};
export type PostItemType = {
  uid: number;
  id: number;
  message: string;
  userId: number;
  createdAt: number;
  detail: boolean;
};
export type PostTextType = {
  value: any;
  uid: number;
  id: number;
  message: string;
  createdAt: number;
  state: 'post' | 'reply';
};
