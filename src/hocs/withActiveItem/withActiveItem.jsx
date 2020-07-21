import React, {PureComponent} from "react";

const withActiveItem = (Component) => {
  class WithActiveItem extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        activeCard: null
      };

      this.setActiveItem = this.setActiveItem.bind(this);
      this.removeActiveItem = this.removeActiveItem.bind(this);
    }

    setActiveItem(item) {
      this.setState({
        activeCard: item
      });
    }

    removeActiveItem() {
      this.setState({
        activeCard: null
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

        />
      );
    }
  }

  return WithActiveItem;
};

export default withActiveItem;
