import { useState, useEffect } from 'react';
import { Range } from "react-range";
import './filter.css';

const Filter = ({ onFilterChange }) => {
  const [filterData, setFilterData] = useState({
    audience: '',
    brand: '',
    minprice: 200,
    maxprice: 10200,
    color: '',
  });

  useEffect(() => {
    onFilterChange(filterData);
  }, [filterData]);

  const handleCheckbox = (name, value) => {
    setFilterData(prev => ({
      ...prev,
      [name]: prev[name] === value ? '' : value,
    }));
  };

  const STEP = 100;
  const MIN = 200;
  const MAX = 10200;
  const [values, setValues] = useState([
    filterData.minprice,
    filterData.maxprice,
  ]);

  const handlePriceChange = vals => {
    setValues(vals);
    setFilterData(prev => ({
      ...prev,
      minprice: vals[0],
      maxprice: vals[1],
    }));
  };

  const clearAll = () => {
    setFilterData({
      audience: '',
      brand: '',
      minprice: 200,
      maxprice: 10200,
      color: '',
    });
  };

  return (
    <div className="filter">
      <div className="filter-heads">
        <p>FILTERS</p>
        <p className='clear-all' onClick={clearAll}>CLEAR ALL</p>
      </div>

      <div className="filter-gender">
        <p>GENDER</p>
        {['Men', 'Women', 'Kids'].map(g => (
          <div className="brands" key={g}>
            <input
              type="checkbox"
              checked={filterData.audience === g}
              onChange={() => handleCheckbox('audience', g)}
            />
            <label>{g}</label>
          </div>
        ))}
      </div>

      <div className="filter-brands">
        <p>BRAND</p>
        {[
          'Puma',
          'Adidas',
          'Nike',
          'US Polo',
          'Louis Philippe',
          'Jack & Jones',
          'John Players',
        ].map(b => (
          <div className="brands" key={b}>
            <input
              type="checkbox"
              checked={filterData.brand === b}
              onChange={() => handleCheckbox('brand', b)}
            />
            <label>{b}</label>
          </div>
        ))}
      </div>

      <div className="price-filter">
        <p className='price-head'>PRICE</p>
        <Range
          step={STEP}
          min={MIN}
          max={MAX}
          values={values}
          onChange={handlePriceChange}
          renderTrack={({ props, children }) => (
            <div
              {...props}
              style={{
                ...props.style,
                height: '5px',
                width: '100%',
                background: `linear-gradient(to right, #ccc ${
                  ((values[0] - MIN) / (MAX - MIN)) * 100
                }%, #ff3f63 ${
                  ((values[0] - MIN) / (MAX - MIN)) * 100
                }%, #ff3f63 ${((values[1] - MIN) / (MAX - MIN)) * 100}%, #ccc ${
                  ((values[1] - MIN) / (MAX - MIN)) * 100
                }%)`,
                borderRadius: '5px',
              }}
            >
              {children}
            </div>
          )}
          renderThumb={({ props }) => (
            <div
              {...props}
              style={{
                ...props.style,
                height: '18px',
                width: '18px',
                borderRadius: '50%',
                backgroundColor: '#ff3f63',
              }}
            />
          )}
        />
        <p className='price-value'>
          ₹{values[0]} - ₹{values[1]}+
        </p>
      </div>

      <div className="filter-colors">
        <p>COLORS</p>
        {[
          'Red',
          'Yellow',
          'Green',
          'Blue',
          'White',
          'Orange',
          'Pink',
          'Violet',
        ].map(c => (
          <div className="brands" key={c}>
            <input
              type="checkbox"
              checked={filterData.color === c}
              onChange={() => handleCheckbox('color', c)}
            />
            <label>{c}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Filter;
