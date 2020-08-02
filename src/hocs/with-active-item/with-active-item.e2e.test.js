import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import withActiveItem from "./with-active-item.jsx";

Enzyme.configure({
  adapter: new Adapter(),
});

describe(`Тестируем компонент withActiveItem`, () => {
  const MockComponent = () => <div />;
  const MockComponentWrapped = withActiveItem(MockComponent);

  it(`Тест смены activeCard`, () => {
    const wrapper = shallow(
        <MockComponentWrapped
        />
    );

    wrapper.props().setActiveItem(`Item`);
    expect(wrapper.state().activeElement).toEqual(`Item`);
  });
});
