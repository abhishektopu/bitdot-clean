import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import clsx from 'classnames';


import _ from "lodash";
import { Responsive, WidthProvider } from "react-grid-layout";
import GridLayout from 'react-grid-layout';
import './styles.css';
import './example-styles.css';

// import component
import OrderPlace from './OrderPlace';
import PairList from './PairList';
import MarketPrice from './MarketPrice';
import OrderBook from './OrderBook';
import UserOrderList from './UserOrderList';
import Chart from './Chart'
import RecentTrade from './RecentTrade';

const ResponsiveReactGridLayout = WidthProvider(Responsive);


const ShowcaseLayout = (props) => {
  const orderBookRef = useRef();

  // state
  const [expandScreen, setExpandScreen] = useState('')

  const [currentBreakpoint, setCurrentBreakpoint] = useState('lg')
  const [compactType, setCompactType] = useState('vertical')
  const [mounted, setMounted] = useState(false)
  const [layouts, setLayouts] = useState({
    lg: props.initialLayout,
  })

  // function

  const onBreakpointChange = (breakpoint) => {
    setCurrentBreakpoint(breakpoint)
  }
  const onLayoutChange = (layout, layouts) => {
    props.onLayoutChange(layout, layouts);
  }
  useEffect(() => {
    setMounted(true)
  }, [])

  const handleLayoutResize = (layoutList, previousLayout, currentLayout) => {
    if (currentLayout && currentLayout.i == '1') {
      orderBookRef.current.orderBookResize(currentLayout)
    }
  }


  return (
    <div>
      <ResponsiveReactGridLayout
        {...props}
        layouts={layouts}
        onBreakpointChange={onBreakpointChange}
        onLayoutChange={onLayoutChange}
        onResize={handleLayoutResize}
        // isDraggable={false}
        draggableHandle=".MyDragHandleClassName"

        // WidthProvider option
        measureBeforeMount={false}
        // I like to have it animate on mount. If you don't, delete `useCSSTransforms` (it's default `true`)
        // and set `measureBeforeMount={true}`.
        useCSSTransforms={mounted}
        compactType={compactType}
        preventCollision={!compactType}
      >
        <div key={0} className="static topOverview">
        <div className="header-overview">
            <PairList />
            <MarketPrice />
          </div>
        </div>
        <div key={1} className={clsx("orderBookMain", { 'fullScreen': expandScreen == 'orderBook' })}>
          <OrderBook
            ref={orderBookRef}
            layout={props.initialLayout && props.initialLayout.find((el => el.i == "1"))}
            setExpandScreen={setExpandScreen}
            expandScreen={expandScreen}
          />
        </div>
        <div key={2} className={clsx("orderPlaceMain", { 'fullScreen': expandScreen == 'orderPlace' })}>
          <OrderPlace
            setExpandScreen={setExpandScreen}
            expandScreen={expandScreen}
          />
        </div>
        <div key={3} className="tradeChartMain">
          <div className="tradeChart">
            <Chart />
          </div>
        </div>
        <div key={4} className="userOrderListMain">
          <UserOrderList />
        </div>
        <div key={5} className={clsx("recentTradeMain", { 'fullScreen': expandScreen == 'recentTrade' })}>
          <RecentTrade
            setExpandScreen={setExpandScreen}
            expandScreen={expandScreen}
          />
        </div>
      </ResponsiveReactGridLayout>
    </div>
  );

}

ShowcaseLayout.propTypes = {
  onLayoutChange: PropTypes.func.isRequired
};

ShowcaseLayout.defaultProps = {
  className: "layout",
  rowHeight: 30,
  onLayoutChange: function () { },
  cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
  initialLayout: [{
    x: 0,
    y: 0,
    w: 9,
    h: 2,
    i: "0",
    name: 'marketPrice',
    static: true,
  },
  {
    x: 6,
    y: 3,
    w: 3,
    h: 12,
    i: "1",
    name: 'orderBook',
    static: false,
  },
  {
    x: 10,
    y: 0,
    w: 3,
    h: 22,
    i: "2",
    name: 'orderPlace',
    static: false,
  },
  {
    x: 0,
    y: 1,
    w: 6,
    h: 12,
    i: "3",
    name: 'chart',
    static: false,
  },
  {
    x: 0,
    y: 12,
    w: 6,
    h: 8,
    i: "4",
    name: 'tradeHistory',
    static: false,
  },
  {
    x: 6,
    y: 12,
    w: 3,
    h: 8,
    i: "5",
    name: 'recentTrade',
    static: false,
  }
  ]
};


export default ShowcaseLayout;