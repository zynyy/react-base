import React from 'react';
import classNames from 'classnames';

import './style/index.less';
import PropTypes from 'prop-types';

export const CompactBeforeAfterPropTypes = {
  addBefore: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  addAfter: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  className: PropTypes.string,
};

const CompactBeforeAfter = ({ addBefore, addAfter, children, className }) => {
  const addBeforeNode = addBefore ? (
    <span className="compact-group-add-before">{addBefore}</span>
  ) : null;
  const addAfterNode = addAfter ? (
    <span className="compact-group-add-after">{addAfter}</span>
  ) : null;

  return (
    <span className={classNames('compact-group-wrapper', className)}>
      <span className="compact-wrapper compact-group">
        {addBeforeNode}
        {React.cloneElement(children, { style: null })}
        {addAfterNode}
      </span>
    </span>
  );
};

CompactBeforeAfter.propTypes = {
  children: PropTypes.element.isRequired,
  ...CompactBeforeAfterPropTypes,
};

export default CompactBeforeAfter;
