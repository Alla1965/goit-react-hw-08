import { useDispatch, useSelector } from "react-redux";
import { setNameFilter } from "../../redux/filters/slice";
import css from './SearchBox.module.css';

export const SearchBox  = () => {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.filters.name);
console.log(filter);

  const handleChange = (e) => {
    dispatch(setNameFilter(e.target.value));
  };
console.log(setNameFilter);

  return (
    <div className={css.searchContainer}>
      <label>Find contacts by name:</label>
      <input className={css.searchInput}
        id="search"
        type="text"
        value={filter}
        onChange={handleChange}
        placeholder="Enter name..."
      />
    </div>
  );
};