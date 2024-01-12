const Filter = ({ setFilter, filteredTask }) => {
  const onChangeHandler = (events) => {
    setFilter(events.target.value);
  };

  return (
    <div className="flex justify-end m-4">
      <label>Filter:</label>
      <select
        className="rounded-md  "
        value={filteredTask}
        onChange={onChangeHandler}
      >
        <option value="all">All</option>
        <option value="completed">Completed</option>
        <option value="incomplete">Incomplete</option>
      </select>
    </div>
  );
};

export default Filter;
