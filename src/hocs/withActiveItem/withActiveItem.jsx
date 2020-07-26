import React, {PureComponent} from "react";

const withActiveItem = (Component) => {
  class WithActiveItem extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        activeElement: null
      };

      this.setActiveItem = this.setActiveItem.bind(this);
      this.removeActiveItem = this.removeActiveItem.bind(this);
    }

    setActiveItem(item) {
      this.setState({
        activeElement: item
      });
    }

    removeActiveItem() {
      this.setState({
        activeElement: null
      });
    }

    render() {

      return (
        <Component
          {...this.props}
          setActiveItem={(item) => {
            this.setActiveItem(item);
          }}
          removeActiveItem={() => {
            this.removeActiveItem();
          }}
          activeElement = {this.state.activeElement}
        />
      );
    }
  }

  return WithActiveItem;
};

export default withActiveItem;
