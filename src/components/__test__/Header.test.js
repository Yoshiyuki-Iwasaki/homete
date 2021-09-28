import { render } from "@testing-library/react";
import React from "react";
import Sample from "../Header";

jest.mock("next/router", () => ({
  useRouter() {
    return {
      asPath: "/",
    };
  },
}));

describe("Navコンポーネント 初期表示の確認", () => {
  test("サンプルページ", () => {
    const { asFragment } = render(<Sample />);
    expect(asFragment()).toMatchSnapshot();
  });


  // test("check nav link", () => {
  //   const doc = render(<Sample />);
  //   const inputElement = doc.getByTestId('LinkToMypage');

  //   expect(inputElement.getAttribute('href')).toBe('/mypage');
  // });
});