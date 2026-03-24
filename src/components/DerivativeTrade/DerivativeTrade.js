import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import clsx from 'classnames';
import { Link } from 'react-router-dom';
import Slider from '@material-ui/core/Slider';
import { Scrollbars } from 'react-custom-scrollbars-2';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import _ from "lodash";
import { Responsive, WidthProvider } from "react-grid-layout";
import GridLayout from 'react-grid-layout';

// import components
import OrderPlace from './OrderPlace';
import MarketPrice from "./MarketPrice";
import OrderBook from './OrderBook';
import UserOrderList from './UserOrderList';
import PairList from './PairList';
import Chart from './Chart'

import './styles.css';
import './example-styles.css';

const ResponsiveReactGridLayout = WidthProvider(Responsive);


const ShowcaseDerivativeLayout = (props) => {
  const orderBookRef = useRef();

  // state
  const [expandScreen, setExpandScreen] = useState('')

  const [checked, setChecked] = React.useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  const [currentBreakpoint, setCurrentBreakpoint] = useState('lg')
  const [compactType, setCompactType] = useState('vertical')
  const [mounted, setMounted] = useState(false)
  const [layouts, setLayouts] = useState({
    lg: props.initialLayout
  })

  // function

  const generateDOM = () => {
    return _.map(layouts.lg, function (l, i) {
      return (
        <div key={i} className={l.static ? "static" : ""}>
          {l.static ? (
            <span
              className="text"
              title="This item is static and cannot be removed or resized."
            >
              Static - {i}
            </span>
          ) : (
            <span className="text">{i}</span>
          )}
        </div>
      );
    });
  }

  const onBreakpointChange = (breakpoint) => {
    setCurrentBreakpoint(breakpoint)
  }
  const onLayoutChange = (layout, layouts) => {
    props.onLayoutChange(layout, layouts);
  }
  const handleLayoutResize = (layoutList, previousLayout, currentLayout) => {
    if (currentLayout && currentLayout.i == '1') {
      // orderBookRef.current.orderBookResize(currentLayout)
    }
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="derivativeTrade">
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
          <div className="tradeTableLeftSide darkBox recentTrades">
            <div className="tableHead MyDragHandleClassName">
              <h4>Recent Trades</h4>
              <div className="inputGroup">
                {
                  expandScreen == '' && <a href="#" className="zoomIcon" onClick={() => { setExpandScreen('recentTrade') }}><i class="bi bi-arrows-angle-expand"></i></a>
                }
                {
                  expandScreen == 'recentTrade' && <a href="#" className="zoomIcon" onClick={() => { setExpandScreen('') }}><i class="bi bi-arrows-angle-contract"></i></a>
                }
              </div>
            </div>
            <div className="tradeTableTitle row mx-auto">
              <span className="col-4">Price(USDT)</span>
              <span className="col-4">Amount</span>
              <span className="col-4">Time</span>
            </div>
            <div className="tradeTableBody customScroll">
              <Scrollbars style={{ width: "100%", height: 310 }}>
                <div className="tradeTableBodyRow odd row mx-auto">
                  <span className="col-4 pinkText">7455.50</span>
                  <span className="col-4">0.326598</span>
                  <span className="col-4">15:05:05</span>
                </div>
                <div className="tradeTableBodyRow odd row mx-auto">
                  <span className="col-4 pinkText">7455.50</span>
                  <span className="col-4">0.326598</span>
                  <span className="col-4">15:05:05</span>
                </div>
                <div className="tradeTableBodyRow odd row mx-auto">
                  <span className="col-4 greenText">7455.50</span>
                  <span className="col-4">1.235698</span>
                  <span className="col-4">15:05:05</span>
                </div>
                <div className="tradeTableBodyRow odd row mx-auto">
                  <span className="col-4 greenText">7455.50</span>
                  <span className="col-4">0.326598</span>
                  <span className="col-4">15:05:05</span>
                </div>
                <div className="tradeTableBodyRow odd row mx-auto">
                  <span className="col-4 greenText">7455.50</span>
                  <span className="col-4">1.235698</span>
                  <span className="col-4">15:05:05</span>
                </div>
                <div className="tradeTableBodyRow odd row mx-auto">
                  <span className="col-4 pinkText">7455.50</span>
                  <span className="col-4">0.326598</span>
                  <span className="col-4">15:05:05</span>
                </div>
                <div className="tradeTableBodyRow odd row mx-auto">
                  <span className="col-4 greenText">7455.50</span>
                  <span className="col-4">1.235698</span>
                  <span className="col-4">15:05:05</span>
                </div>
                <div className="tradeTableBodyRow odd row mx-auto">
                  <span className="col-4 greenText">7455.50</span>
                  <span className="col-4">0.326598</span>
                  <span className="col-4">15:05:05</span>
                </div>
                <div className="tradeTableBodyRow odd row mx-auto">
                  <span className="col-4 greenText">7455.50</span>
                  <span className="col-4">1.235698</span>
                  <span className="col-4">15:05:05</span>
                </div>
                <div className="tradeTableBodyRow odd row mx-auto">
                  <span className="col-4 greenText">7455.50</span>
                  <span className="col-4">0.326598</span>
                  <span className="col-4">15:05:05</span>
                </div>
                <div className="tradeTableBodyRow odd row mx-auto">
                  <span className="col-4 greenText">7455.50</span>
                  <span className="col-4">1.235698</span>
                  <span className="col-4">15:05:05</span>
                </div>
                <div className="tradeTableBodyRow odd row mx-auto">
                  <span className="col-4 greenText">7455.50</span>
                  <span className="col-4">0.326598</span>
                  <span className="col-4">15:05:05</span>
                </div>
              </Scrollbars>
            </div>
          </div>
        </div>
      </ResponsiveReactGridLayout>
    </div>
  );

}

ShowcaseDerivativeLayout.propTypes = {
  onLayoutChange: PropTypes.func.isRequired
};

ShowcaseDerivativeLayout.defaultProps = {
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


export default ShowcaseDerivativeLayout;