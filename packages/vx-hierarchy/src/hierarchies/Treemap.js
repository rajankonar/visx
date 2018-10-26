import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Group } from '@vx/group';
import { treemap as d3treemap } from 'd3-hierarchy';
import DefaultNode from '../HierarchyDefaultNode';

Treemap.propTypes = {
  root: PropTypes.object.isRequired,
  children: PropTypes.func,
  top: PropTypes.number,
  left: PropTypes.number,
  className: PropTypes.string,
  tile: PropTypes.func,
  size: PropTypes.arrayOf(PropTypes.number),
  round: PropTypes.bool,
  padding: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
  paddingInner: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
  paddingOuter: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
  paddingTop: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
  paddingRight: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
  paddingBottom: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
  paddingLeft: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
  nodeComponent: PropTypes.any
};

export default function Treemap({
  top,
  left,
  className,
  root,
  tile,
  size,
  round,
  padding,
  paddingInner,
  paddingOuter,
  paddingTop,
  paddingRight,
  paddingBottom,
  paddingLeft,
  children,
  nodeComponent = DefaultNode,
  ...restProps
}) {
  const treemap = d3treemap();

  if (tile) treemap.tile(tile);
  if (size) treemap.size(size);
  if (round) treemap.round(round);
  if (padding) treemap.padding(padding);
  if (paddingInner) treemap.paddingInner(paddingInner);
  if (paddingOuter) treemap.paddingOuter(paddingOuter);
  if (paddingTop) treemap.paddingTop(paddingTop);
  if (paddingRight) treemap.paddingRight(paddingRight);
  if (paddingBottom) treemap.paddingBottom(paddingBottom);
  if (paddingLeft) treemap.paddingLeft(paddingLeft);

  const data = treemap(root);

  if (children) return children(data);

  return (
    <Group top={top} left={left} className={cx('vx-treemap', className)}>
      {nodeComponent &&
        data.descendants().map((node, i) => {
          return (
            <Group key={`treemap-node-${i}`}>{React.createElement(nodeComponent, { node })}</Group>
          );
        })}
    </Group>
  );
}
