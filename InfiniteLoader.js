import React from 'react';
import PropTypes from 'prop-types';

/**
 * Class that adds Infinite Loader
 * when user reaches the bottom of the page
 * scrollCallback event is fired
 * @param {bool} checkOnMount - check to fire event on mount
 * @param {bool} onMountCondition - additional check for on mount event call
 * @param {func} scrollCallback - event fired at the end of the page
 */
class InfiniteScroll extends React.Component {
  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
    if (this.props.checkOnMount) {
      const heightObj = this.getHeightObj();
      const { windowBottom, docHeight } = heightObj;
      // if page doesn't have scroll, but could have more results fetched
      if (windowBottom === docHeight && this.props.onMountCondition) {
        this.props.scrollCallback();
      }
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  /** @method getHeightObj
  * Gets the height of whole document, and of the window
  * Calculate bottom of the window
  * Return height object 
  */
  getHeightObj = () => {
    // eslint-disable-next-line max-len
    const windowHeight = 'innerHeight' in window ? window.innerHeight : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight,
    );
    const windowBottom = windowHeight + window.pageYOffset;
    return { docHeight, windowBottom };
  }

  /** @method handleScroll
  * When user hits page bottom, fire event
  */
  handleScroll = () => {
    const heightObj = this.getHeightObj();
    const { windowBottom, docHeight } = heightObj;
    if (windowBottom >= docHeight) {
      this.props.scrollCallback();
    }
  }

  render() {
    return (
      <div />
    );
  }
}

InfiniteScroll.propTypes = {
  checkOnMount: PropTypes.bool,
  onMountCondition: PropTypes.bool,
  scrollCallback: PropTypes.func,
};

export default InfiniteScroll;
