/**
 * @description APIレスポンスでよく使われるオブジェクトの型
 */
export type PostDetailType = {
  id: number;
  message: string;
  userId: number;
};
export type PostItemType = {
  id: number;
  message: string;
  userId: number;
  detail: boolean;
};
export type PostTextType = {
  value: any;
  id: number;
  message: string;
  state: 'post' | 'reply';
};
