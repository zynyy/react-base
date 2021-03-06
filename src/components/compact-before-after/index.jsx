import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import './style/index.less';

export const CompactBeforeAfterPropTypes = {
  addBefore: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  addAfter: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  className: PropTypes.string,
};

const CompactBeforeAfter = React.forwardRef(({ addBefore, addAfter, children, className }, ref) => {
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
        {React.cloneElement(children, { style: null, ref })}
        {addAfterNode}
      </span>
    </span>
  );
});

CompactBeforeAfter.propTypes = {
  children: PropTypes.element.isRequired,
  ...CompactBeforeAfterPropTypes,
};

export default CompactBeforeAfter;
