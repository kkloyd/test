import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime'
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { addCourse, fetchCourses, removeCourse } from "./store/courses.js";
dayjs.extend(relativeTime)

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCourses())
  }, [dispatch])

  const [titleInput, setTitleInput] = useState("");
  const { list } = useSelector((state) => state.courses);

  function handleSubmit(e) {
    e.preventDefault();
    if (titleInput.trim()) {
      dispatch(
        addCourse({
          title: titleInput.trim(),
          dateStart: dayjs().add(1, "hour").format(),
        })
      );
      setTitleInput("");
    }
  }

  function handleDeleteCourse(id) {
    dispatch(removeCourse(id))
  }

  function handleTitleChange(e) {
    const title = e.target.value;
    setTitleInput(title);
  }

  function clearForm() {
    setTitleInput("");
  }

  function formatDateTill(date) {
    return dayjs(date).format("DD.MM.YYYY HH:mm")
  }

  return (
    <div className="App">
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-item">
          <label>New course title</label>
          <input
            type="text"
            name="title"
            value={titleInput}
            onChange={handleTitleChange}
          />
        </div>
        <div
          style={{
            marginTop: 27,
            display: `grid`,
            gap: 10,
            gridTemplate: "auto 1fr / auto 1fr",
          }}
        >
          <button
            type="submit"
            disabled={!titleInput}
            className={`btn btn-primary`}
          >
            Add
          </button>
          {titleInput && (
            <button className={`btn btn-default`} onClick={clearForm}>
              Clear
            </button>
          )}
        </div>
      </form>

      <div>
        {list.map((course) => (
          <ul key={course.id} className="courses-list">
            <li className="courses-list__item">
              <span style={{marginRight: '10px'}}>{course.title} - {formatDateTill(course.dateStart)}</span>
              <button className="btn btn-danger" onClick={() => handleDeleteCourse(course.id)}>Delete</button>
            </li>
          </ul>
        ))}
      </div>
    </div>
  );
};

export default App;
